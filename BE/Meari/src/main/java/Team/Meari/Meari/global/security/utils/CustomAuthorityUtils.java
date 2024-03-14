package Team.Meari.Meari.global.security.utils;

import Team.Meari.Meari.global.exception.dto.BusinessLogicException;
import Team.Meari.Meari.global.exception.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Component
public class CustomAuthorityUtils {

    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");
    public List<GrantedAuthority> createAuthorities (String email) {

        return USER_ROLES;
    }

    public List<String> createRoles (String email) {
        // 우선은 전부 USER ROLE 부여
        return USER_ROLES_STRING;
    }
    /**
     * 입력된 role 값을 기반으로 권한 정보를 생성
     * @param roles
     * @return List<GrantedAuthority> 타입으로 변환
     */
    public static List<GrantedAuthority> createAuthorities(List<String> roles){
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
