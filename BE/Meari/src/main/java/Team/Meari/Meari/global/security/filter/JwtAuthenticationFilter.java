package Team.Meari.Meari.global.security.filter;

import Team.Meari.Meari.global.security.dto.JwtTokenDto;
import Team.Meari.Meari.global.security.dto.LoginDto;
import Team.Meari.Meari.global.security.jwt.JwtTokenizer;
import Team.Meari.Meari.global.security.userDetails.CustomUserDetails;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                               HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain filterChain,
                                            Authentication authResult) throws IOException, ServletException {
        CustomUserDetails customUserDetails = (CustomUserDetails) authResult.getPrincipal();
        JwtTokenDto jwtTokenDto = jwtTokenizer.generateTokenDto(customUserDetails);
        String accessToken = jwtTokenDto.getAccessToken();
        String refreshToken = jwtTokenDto.getRefreshToken();

        jwtTokenizer.accessTokenSetHeader(accessToken, response);
        jwtTokenizer.refreshTokenSetHeader(refreshToken, response);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.setHeader("Set_Cookie", cookie.toString());

        Member findMember = memberService.findMember(customUserDetails.getMemberId());

        long refreshTokenExpirationMinutes = jwtTokenizer.getRefreshTokenExpirationMinutes();
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }
}
