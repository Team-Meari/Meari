package Team.Meari.Meari.chat.dto;

import Team.Meari.Meari.chat.entity.Chat;
import Team.Meari.Meari.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChatPostReqDto {
    private String content;
    private double latitude;
    private double longitude;

    public Chat toChat(Member member) {
        Chat chat = Chat.builder()
                .content(this.content)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .member(member)
                .build();
        return chat;
    }
}
