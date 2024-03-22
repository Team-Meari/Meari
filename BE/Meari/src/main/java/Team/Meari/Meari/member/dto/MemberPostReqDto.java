package Team.Meari.Meari.member.dto;

import Team.Meari.Meari.global.auditing.BaseTimeEntity;
import Team.Meari.Meari.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class MemberPostReqDto extends BaseTimeEntity {
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
        member.setCreatedAt(LocalDateTime.now());
        return member;
    }
}
