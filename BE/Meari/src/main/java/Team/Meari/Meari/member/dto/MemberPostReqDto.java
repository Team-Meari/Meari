package Team.Meari.Meari.member.dto;

import Team.Meari.Meari.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberPostReqDto {
    private String email;
    private String password;
    private String nickname;


    public Member toEntity() {
        Member member = new Member().builder()
                .email(this.email)
                .password(this.password)
                .nickname(this.nickname)
                .memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
                .build();
        return member;
    }
}
