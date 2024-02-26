package Team.Meari.Meari.global.security.jwt;

import Team.Meari.Meari.global.exception.dto.BusinessLogicException;
import Team.Meari.Meari.global.exception.exception.ExceptionCode;
import Team.Meari.Meari.global.security.dto.JwtTokenDto;
import Team.Meari.Meari.global.security.userDetails.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Slf4j
@Component
public class JwtTokenizer {

    private Key key;
    /**
     * yml 파일로부터 시스템 변수를 받아옵니다.
      */
    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.key.access-token-expiration-minutes}")
    private long accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.key.refresh-token-expiration-minutes}")
    private long refreshTokenExpirationMinutes;


    /**
     * Bean 등록 후 Key SecretKey HS256 디코딩
     */
    @PostConstruct
    public void init() {
        String base64EncodedSecretKey = encodeBase64SecretKey(this.secretKey);
        this.key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
    }

    /**
     * Base64로 SecretKey를 인코딩하는 메서드
     * @param secretKey
     * @return String으로 인코딩된 값
     */
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * JWT 서명에 사용할 SecretKey를 생성.
     * hmacShaKeyFor() 메서드로 HMAC 알고리즘을 적용한 Key 객체를 생성
     * @param base64EncodedSecretKey
     * @return Key
     */
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * CustomUserDetails 유저 정보로 AccessToken과 RefreshToken을 생성하는 메서드
     * @param customUserDetails
     * @return
     */
    public JwtTokenDto generateTokenDto(CustomUserDetails customUserDetails) {
        Date accessTokenExpiresIn = getTokenExpiration(accessTokenExpirationMinutes);
        Date refreshTokenExpiresIn = getTokenExpiration(refreshTokenExpirationMinutes);
        Map<String, String> claims = new HashMap<>();
        claims.put("role", customUserDetails.getRole());

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(String.valueOf(customUserDetails.getEmail()))
                .setExpiration(accessTokenExpiresIn)
                .setIssuedAt(Calendar.getInstance().getTime())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(String.valueOf(customUserDetails.getEmail()))
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key)
                .compact();

        return JwtTokenDto.builder()
                .grantType("Bearer")
                .authorizationType("Authorization")
                .accessToken(accessToken)
                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }

    /**
     * JWT 토큰을 복호화한 후 토큰 정보를 반환
     * @param accessToken
     * @return
     */
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get("role") == null) {
            throw new BusinessLogicException(ExceptionCode.NO_ACCESS_TOKEN);
        }

        String authority = claims.get("role").toString();

        CustomUserDetails customUserDetails = CustomUserDetails.of(claims.getSubject(), authority);

        log.info("# AuthMember.getRoles 권한 체크 = {}", customUserDetails.getAuthorities().toString());

        return new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
    }

    /**
     * 토큰 정보를 검증하는 메서드
     * @param token
     * @param response
     * @return
     */
    public boolean validateToken(String token, HttpServletResponse response) {
        try {
            parseClaims(token);
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT Token");
            log.trace("Invalid JWT Token Trace = {}", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token");
            log.trace("Expired JWT Token Trace = {}", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token");
            log.trace("Unsupported JWT Token trace = {}", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty");
            log.trace("JWT claims string is empty trace = {}", e);
        }
        return true;
    }

    private Date getTokenExpiration(long expirationMinutes) {
        Date date = new Date();

        return new Date(date.getTime() + expirationMinutes);
    }

    /**
     * Token 복호화 및 예외 발생시 Claims 객체가 안 만들어짐(토큰 만료, 시그니처 오류)
     * @param token
     * @return
     */
    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public void accessTokenSetHeader(String accessToken, HttpServletResponse response) {
        String headerValue = "Bearer " + accessToken;
        response.setHeader("Authorization", headerValue);
    }

    public void refreshTokenSetHeader(String refreshToken, HttpServletResponse response) {
        response.setHeader("Refresh", refreshToken);
    }

    public String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Refresh");
        if (StringUtils.hasText(bearerToken)) {
            return bearerToken;
        }
        return null;
    }
}
