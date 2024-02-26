package Team.Meari.Meari.global.security.utils;

import Team.Meari.Meari.global.exception.dto.BusinessLogicException;
import Team.Meari.Meari.global.exception.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

import static Team.Meari.Meari.member.entity.Member.MemberRole.ADMIN;
import static Team.Meari.Meari.member.entity.Member.MemberRole.USER;

@Slf4j
public class CustomAuthorityUtils {
    /**
     * 입력된 role 값을 기반으로 권한 정보를 생성
     * @param role
     * @return List<GrantedAuthority> 타입으로 변환
     */
    public static List<GrantedAuthority> createAuthorities(String role){
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    /**
     * 입력된 role 값이 유효한 권한인지 검증
     * @param role
     */
    public static void verifiedRole(String role) {
        if (role == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ROLE_DOES_NOT_FOUND);
        }else if(!role.equals(USER.toString()) && !role.equals(ADMIN.toString())){
        }
    }
}
