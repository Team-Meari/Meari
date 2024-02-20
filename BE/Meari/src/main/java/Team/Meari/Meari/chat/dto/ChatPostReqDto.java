package Team.Meari.Meari.chat.dto;

import Team.Meari.Meari.chat.entity.Chat;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChatPostReqDto {
    private String content;
    private double latitude;
    private double longitude;

    public Chat toEntity() {
        Chat chat = new Chat().builder()
                .content(this.content)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .build();
        return chat;
    }
}
