package Team.Meari.Meari.member.dto;

import Team.Meari.Meari.global.auditing.BaseTimeEntity;
import Team.Meari.Meari.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter @Setter
public class MemberPostReqDto extends BaseTimeEntity {
    @NotBlank(message = "이메일 주소를 입력해주세요.")
    @Email(message = "올바른 이메일 주소를 입력해주세요.")
    private String email;
    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 8, max = 16, message = "비밀번호는 8자 이상 16자 이하로 입력해주세요.")
    private String password;
    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 8, max = 16, message = "닉네임은 8자 이상 16자 이하로 입력해주세요.")
    private String nickname;

    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    @Pattern(regexp = "(01[016789])(\\d{3,4})(\\d{4})", message = "올바른 휴대폰 번호를 입력해주세요.")
    private String phone;


    public Member toEntity() {
        Member member = new Member().builder()
                .email(this.email)
                .password(this.password)
                .nickname(this.nickname)
                .phone((this.phone))
                .memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
                .build();
        member.setCreatedAt(LocalDateTime.now());
        return member;
    }
}
