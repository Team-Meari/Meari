package Team.Meari.Meari.member.repository;

import Team.Meari.Meari.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
    Optional<Member> findByPhone(String phone);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
