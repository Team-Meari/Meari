package Team.Meari.Meari.member.dto;

import Team.Meari.Meari.global.auditing.BaseTimeEntity;
import Team.Meari.Meari.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class MemberResDto extends BaseTimeEntity {
    private Long memberId;
    private String email;
    private String nickname;
    private String memberStatus;
    private String phone;

    public MemberResDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.phone = member.getPhone();
        this.memberStatus = member.getMemberStatus().getStatus();
        setCreatedAt(member.getCreatedAt());
        setModifiedAt(member.getModifiedAt());
    }
}
