package Team.Meari.Meari.global.security.dto;

import lombok.Getter;

@Getter
public class CustomTokenDto {
    private TokenDto tokenDto;

    public CustomTokenDto(TokenDto tokenDto) {
        this.tokenDto = tokenDto;
    }
}
