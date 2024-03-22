package Team.Meari.Meari.member.controller;

import Team.Meari.Meari.chat.dto.ChatResDto;
import Team.Meari.Meari.chat.entity.Chat;
import Team.Meari.Meari.chat.service.ChatService;
import Team.Meari.Meari.global.security.dto.CustomMultiResDto;
import Team.Meari.Meari.global.dto.MultiResDto;
import Team.Meari.Meari.global.dto.SingleResDto;
import Team.Meari.Meari.global.security.dto.LoginDto;
import Team.Meari.Meari.global.security.dto.TokenDto;
import Team.Meari.Meari.global.security.utils.SecurityUtils;
import Team.Meari.Meari.member.dto.MemberPatchReqDto;
import Team.Meari.Meari.member.dto.MemberPostReqDto;
import Team.Meari.Meari.member.dto.MemberResDto;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.service.MemberService;
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
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final ChatService chatService;

//    @PostMapping("/login")
//    public TokenDto login(@RequestBody LoginDto loginDto) {
//        String email = loginDto.getEmail();
//        String password = loginDto.getPassword();
//        TokenDto tokenDto = memberService.login(email, password);
//        return tokenDto;
//    }

    /**
     * Post 요청
     * @param memberPostReqDto
     * @return
     */
    @PostMapping
    public ResponseEntity<SingleResDto<Long>> postMember(@RequestBody MemberPostReqDto memberPostReqDto) {
        Member savedMember = memberService.createMember(memberPostReqDto.toEntity());

        return new ResponseEntity<>(new SingleResDto<>(savedMember.getMemberId()), HttpStatus.CREATED);
    }

    /**
     * Patch 요청
     * @param memberId
     * @param memberPatchReqDto
     * @return
     */
    @PatchMapping("/{member-id}")
    public ResponseEntity<SingleResDto<String>> patchMember(@PathVariable(value = "member-id") Long memberId,
                                                            @RequestBody MemberPatchReqDto memberPatchReqDto) {
        memberService.modifyMember(memberPatchReqDto.toEntity(), memberId);

        return new ResponseEntity<>(new SingleResDto<>("정상적으로 수정되었습니다."), HttpStatus.OK);
    }

    /**
     * 회원 탈퇴 요청
     * @param memberId
     * @return
     */
    @DeleteMapping("/{member-id}")
    public ResponseEntity<SingleResDto<String>> deleteMember(@PathVariable(value = "member-id") Long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(new SingleResDto<>("정상적으로 탈퇴되었습니다."), HttpStatus.OK);
    }

    /**
     * 단일 회원 조회
     * @param email
     * @return
     */
    @GetMapping("/{email}")
    public ResponseEntity<SingleResDto<MemberResDto>> getMember(@PathVariable(value = "email") String email) {
        Member member = memberService.findMember(email);
        MemberResDto response = new MemberResDto(member);

        return new ResponseEntity<>(new SingleResDto<>(response), HttpStatus.OK);
    }

    /**
     * 전체 회원 조회
     * @param pageable
     * @return
     */
    @GetMapping("/find-all")
    public ResponseEntity<MultiResDto<MemberResDto>> getMembers(Pageable pageable) {
        Page<Member> page = memberService.findMembers(pageable);
        Page<MemberResDto> response = page.map(MemberResDto::new);
        List<MemberResDto> list = response.stream().collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResDto<>(list, page), HttpStatus.OK);
    }
}
