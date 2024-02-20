package Team.Meari.Meari.chat.dto;

import Team.Meari.Meari.chat.entity.Chat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class ChatResDto {
    private Long chatId;
    private String content;
    private double latitude;
    private double longitude;

    public ChatResDto(Chat chat){
        this.chatId = chat.getChatId();
        this.content = chat.getContent();
        this.latitude = chat.getLatitude();
        this.longitude = chat.getLongitude();
    }
}
