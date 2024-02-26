package Team.Meari.Meari.global.security.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JwtTokenDto {
    private final String grantType;
    private final String authorizationType;
    private final String accessToken;
    private final String refreshToken;
    private final Long accessTokenExpiresIn;
}
