package Team.Meari.Meari.chat.dto;

import Team.Meari.Meari.chat.entity.Chat;
import Team.Meari.Meari.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class ChatResDto {
    private String nickName;
    private String email;
    private Long chatId;
    private String content;
    private double latitude;
    private double longitude;

    public ChatResDto(Chat chat){
        this.nickName = chat.getMember().getNickname();
        this.email = chat.getMember().getEmail();
        this.chatId = chat.getChatId();
        this.content = chat.getContent();
        this.latitude = chat.getLatitude();
        this.longitude = chat.getLongitude();
    }
}
