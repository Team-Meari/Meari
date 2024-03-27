package Team.Meari.Meari.member.entity;

import Team.Meari.Meari.global.auditing.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter @Builder
@AllArgsConstructor @NoArgsConstructor
public class Member extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String password;
    private String nickname;
    private String phone;
    private MemberStatus memberStatus;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    public List<String> roles = new ArrayList<>();


    @NoArgsConstructor
    public enum MemberStatus{
        MEMBER_ACTIVE("활성 계정"),
        MEMBER_QUIT("탈퇴한 계정");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
