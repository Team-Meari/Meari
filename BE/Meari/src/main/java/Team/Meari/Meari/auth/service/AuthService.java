package Team.Meari.Meari.auth.service;

import Team.Meari.Meari.auth.entity.RefreshToken;
import Team.Meari.Meari.auth.repository.RefreshTokenRepository;
import Team.Meari.Meari.global.security.dto.TokenDto;
import Team.Meari.Meari.global.security.dto.TokenReqDto;
import Team.Meari.Meari.global.security.jwt.JwtTokenizer;
import Team.Meari.Meari.global.security.utils.SecurityUtils;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.repository.MemberRepository;
import Team.Meari.Meari.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;

    /**
     * 로그인
     * @param email
     * @param password
     * @return
     */
    @Transactional
    public TokenDto login(String email, String password) {
        // 1. Login ID/PW 를 기반으로 Authentication 객체를 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰을 생성
        TokenDto tokenDto = jwtTokenizer.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        return tokenDto;
    }

    @Transactional
    public TokenDto reissue(TokenReqDto tokenReqDto) {
        // 1. Refresh Token 검증
        if (!jwtTokenizer.validateToken(tokenReqDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member Id 가져오기
        Authentication authentication = jwtTokenizer.getAuthentication(tokenReqDto.getAccessToken());

        // 3. 저장소에서 Member ID를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() ->new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검증
        if (!refreshToken.getValue().equals(tokenReqDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = jwtTokenizer.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

//    @Transactional
//    public void logout(TokenReqDto tokenReqDto) {
//        refreshTokenRepository.findByValue(tokenReqDto.getRefreshToken())
//                        .orElseThrow(() -> new RuntimeException("일치하지 않은 토큰 정보이거나 이미 로그아웃된 사용자입니다."));
//        refreshTokenRepository.deleteByValue(tokenReqDto.getRefreshToken());
//    }
    @Transactional
    public void logout() {
        refreshTokenRepository.findByKey(SecurityUtils.getCurrentEmail())
                        .orElseThrow(() -> new RuntimeException("일치하지 않은 토큰 정보이거나 이미 로그아웃된 사용자입니다."));
        refreshTokenRepository.deleteByKey(SecurityUtils.getCurrentEmail());
    }
}
