package Team.Meari.Meari.global.security.userDetails;

import Team.Meari.Meari.global.exception.dto.BusinessLogicException;
import Team.Meari.Meari.global.exception.exception.ExceptionCode;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberRepository.findByEmail(email)
                .map(this::createUserDetails)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private UserDetails createUserDetails(Member member) {
        return CustomUserDetails.of(member);
    }
}
