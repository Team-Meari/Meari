package Team.Meari.Meari.global.security.dto;

import Team.Meari.Meari.global.security.dto.TokenDto;
import Team.Meari.Meari.member.dto.MemberResDto;
import lombok.Getter;

@Getter
public class CustomMultiResDto {
    private TokenDto tokenDto;
    private MemberResDto memberResDto;

    public CustomMultiResDto(TokenDto tokenDto, MemberResDto memberResDto) {
        this.tokenDto = tokenDto;
        this.memberResDto = memberResDto;
    }
}
