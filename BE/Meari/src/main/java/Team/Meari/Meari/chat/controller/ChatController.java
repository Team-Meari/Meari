package Team.Meari.Meari.chat.controller;

import Team.Meari.Meari.chat.dto.ChatPostReqDto;
import Team.Meari.Meari.chat.dto.ChatResDto;
import Team.Meari.Meari.chat.entity.Chat;
import Team.Meari.Meari.chat.service.ChatService;
import Team.Meari.Meari.global.dto.MultiResDto;
import Team.Meari.Meari.global.dto.SingleResDto;
import Team.Meari.Meari.global.security.userDetails.CustomUserDetails;
import Team.Meari.Meari.global.security.utils.SecurityUtils;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chats")
public class ChatController {
    private final ChatService chatService;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<SingleResDto<ChatResDto>> postChat(@RequestBody ChatPostReqDto chatPostReqDto) {
        Member member = memberService.findMember(SecurityUtils.getCurrentEmail());
        Chat savedChat = chatService.createChat(chatPostReqDto.toChat(member));
        ChatResDto response = new ChatResDto(savedChat);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.CREATED);
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

    /**
     * 내가 쓴 게시글 조회
     * @param pageable
     * @return
     */
    @GetMapping("/myPage")
    public ResponseEntity<MultiResDto<ChatResDto>> getMyChats(Pageable pageable) {
        Member member = memberService.findMember(SecurityUtils.getCurrentEmail());
        Page<Chat> page = chatService.findMyChats(pageable, member);
        Page<ChatResDto> response = page.map(ChatResDto::new);
        List<ChatResDto> list = response.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto<>(list, page), HttpStatus.OK);
    }
}
