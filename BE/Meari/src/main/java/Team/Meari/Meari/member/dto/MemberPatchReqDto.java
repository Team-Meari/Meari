package Team.Meari.Meari.member.dto;

import Team.Meari.Meari.global.auditing.BaseTimeEntity;
import Team.Meari.Meari.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class MemberPatchReqDto extends BaseTimeEntity {
    private String password;
    private String nickname;
    private Member.MemberStatus memberStatus;

    public Member toEntity(){
        Member member = new Member().builder()
                .password(this.password)
                .nickname(this.nickname)
                .build();
        member.setModifiedAt(LocalDateTime.now());
        return member;
    }
}
