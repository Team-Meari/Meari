package Team.Meari.Meari.global.security.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TokenDto {
    private final String grantType;
    private final String accessToken;
    private final String refreshToken;
    private final Long accessTokenExpiresIn;
}
