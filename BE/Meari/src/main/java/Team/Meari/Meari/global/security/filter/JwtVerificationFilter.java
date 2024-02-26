package Team.Meari.Meari.global.security.filter;

import Team.Meari.Meari.global.exception.dto.BusinessLogicException;
import Team.Meari.Meari.global.security.jwt.JwtTokenizer;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;

@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String accessToken = jwtTokenizer.resolveAccessToken(request);
            if (StringUtils.hasText(accessToken) && jwtTokenizer.validateToken(accessToken, response)) {
                setAuthenticationToContext(accessToken);
            }
        } catch (RuntimeException re) {
            request.setAttribute("Exception", re);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    @SneakyThrows
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        return authorization == null || authorization.startsWith("Bearer");
    }

    private void setAuthenticationToContext(String accessToken) {
        Authentication authentication = jwtTokenizer.getAuthentication(accessToken);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("# Token verification success!");
    }

}
