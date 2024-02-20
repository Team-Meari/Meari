package Team.Meari.Meari.chat.repository;

import Team.Meari.Meari.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ChatRepository extends JpaRepository<Chat, Long> {
}
