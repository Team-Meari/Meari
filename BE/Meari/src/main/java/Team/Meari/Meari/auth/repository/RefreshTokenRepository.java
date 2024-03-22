package Team.Meari.Meari.auth.repository;

import Team.Meari.Meari.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByKey(String key);
    Optional<RefreshToken> findByValue(String value);
    Optional<RefreshToken> deleteByValue(String value);
    Optional<String> deleteByKey(String key);
}
