package Team.Meari.Meari.member.dto;

import Team.Meari.Meari.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberPatchReqDto {
    private String password;
    private String nickname;
    private Member.MemberStatus memberStatus;

    public Member toEntity(){
        Member member = new Member().builder()
                .password(this.password)
                .nickname(this.nickname)
                .build();
        return member;
    }
}
