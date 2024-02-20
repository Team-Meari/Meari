package Team.Meari.Meari.member.dto;

import Team.Meari.Meari.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class MemberResDto {
    private Long memberId;
    private String email;
    private String nickname;
    private String memberStatus;

    public MemberResDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.memberStatus = member.getMemberStatus().getStatus();
    }
}
