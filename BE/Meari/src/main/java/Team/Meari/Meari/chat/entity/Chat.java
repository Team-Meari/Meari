package Team.Meari.Meari.chat.entity;

import Team.Meari.Meari.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity @Getter @Setter @Builder
@AllArgsConstructor @NoArgsConstructor
public class Chat {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
    private String content;
    private double latitude;
    private double longitude;
}
