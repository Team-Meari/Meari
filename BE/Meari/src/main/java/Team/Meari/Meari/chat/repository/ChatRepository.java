package Team.Meari.Meari.chat.repository;

import Team.Meari.Meari.chat.entity.Chat;
import Team.Meari.Meari.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Page<Chat> findAllByMemberOrderByCreatedAtDesc(Pageable pageable, Member member);
    Page<Chat>findAllByOrderByCreatedAtDesc(Pageable pageable);
}
