package Team.Meari.Meari.chat.service;

import Team.Meari.Meari.chat.entity.Chat;
import Team.Meari.Meari.chat.repository.ChatRepository;
import Team.Meari.Meari.global.exception.dto.BusinessLogicException;
import Team.Meari.Meari.global.exception.exception.ExceptionCode;
import Team.Meari.Meari.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    @Transactional
    public Chat createChat(Chat chat){
        return chatRepository.save(chat);
    }

    @Transactional
    public void deleteChat(Long chatId){
        Chat verifyChat = chatRepository.findById(chatId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_NOT_FOUND));
        chatRepository.delete(verifyChat);
    }

    @Transactional
    public Chat findChat(Long chatId){
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_NOT_FOUND));
    }
    @Transactional
    public Page<Chat> findChats(Pageable pageable){
        return chatRepository.findAll(pageable);
    }

    @Transactional
    public Page<Chat> findMyChats(Pageable pageable, Member member) {
        return chatRepository.findAllByMember(pageable, member);
    }

}
