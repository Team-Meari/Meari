package Team.Meari.Meari.global.security.dto;

import lombok.Data;

@Data
public class TokenReqDto {
    private final String accessToken;
    private final String refreshToken;
}
