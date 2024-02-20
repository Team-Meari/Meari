package Team.Meari.Meari.chat.controller;

import Team.Meari.Meari.chat.dto.ChatPostReqDto;
import Team.Meari.Meari.chat.dto.ChatResDto;
import Team.Meari.Meari.chat.entity.Chat;
import Team.Meari.Meari.chat.service.ChatService;
import Team.Meari.Meari.global.dto.MultiResDto;
import Team.Meari.Meari.global.dto.SingleResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chats")
public class ChatController {
    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<SingleResDto<Long>> postChat(@RequestBody ChatPostReqDto chatPostReqDto) {
        Chat savedChat = chatService.createChat(chatPostReqDto.toEntity());

        return new ResponseEntity<>(new SingleResDto<>(savedChat.getChatId()), HttpStatus.CREATED);
    }

    @DeleteMapping("/{chat-id}")
    public ResponseEntity<SingleResDto<String>> deleteChat(@PathVariable(value = "chat-id") Long chatId) {
        chatService.deleteChat(chatId);

        return new ResponseEntity<>(new SingleResDto<>("정상적으로 삭제되었습니다."), HttpStatus.OK);
    }

    @GetMapping("/{chat-id}")
    public ResponseEntity<SingleResDto<ChatResDto>> getChat(@PathVariable(value = "chat-id") Long chatId) {
        Chat chat = chatService.findChat(chatId);
        ChatResDto response = new ChatResDto(chat);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/find-all")
    public ResponseEntity<MultiResDto<ChatResDto>> getChats(Pageable pageable) {
        Page<Chat> page = chatService.findChats(pageable);
        Page<ChatResDto> response = page.map(ChatResDto::new);
        List<ChatResDto> list = response.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto<>(list, page), HttpStatus.OK);
    }
}
