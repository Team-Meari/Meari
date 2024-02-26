package Team.Meari.Meari.member.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter @Builder
@AllArgsConstructor @NoArgsConstructor
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String password;
    private String nickname;
    private MemberStatus memberStatus;
    private String role;


    @NoArgsConstructor
    public enum MemberRole{
        USER("사용자"),
        ADMIN("관리자");

        @Getter
        private String role;
        MemberRole(String role){
            this.role = role;
        }
    }
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
