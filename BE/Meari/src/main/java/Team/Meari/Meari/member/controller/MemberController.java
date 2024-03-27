package Team.Meari.Meari.member.controller;

import Team.Meari.Meari.chat.service.ChatService;
import Team.Meari.Meari.global.dto.MultiResDto;
import Team.Meari.Meari.global.dto.SingleResDto;
import Team.Meari.Meari.member.dto.*;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;


    /**
     * Post 요청
     * @param memberPostReqDto
     * @return
     */
    @PostMapping
    public ResponseEntity<SingleResDto<String>> postMember(@Valid @RequestBody MemberPostReqDto memberPostReqDto) {
        Member savedMember = memberService.createMember(memberPostReqDto.toEntity());

        return new ResponseEntity<>(new SingleResDto<>("회원가입이 완료되었습니다."), HttpStatus.CREATED);
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

    /**
     * 이메일 중복 확인
     * @param email
     * @return
     */
    @GetMapping("/verify-email/{email}")
    public ResponseEntity<SingleResDto<String>> checkEmailDuplicate(@PathVariable String email) {
        memberService.checkEmailDuplicate(email);
        return new ResponseEntity<>(new SingleResDto<>("사용 가능한 이메일입니다."), HttpStatus.OK);
    }

    /**
     * 닉네임 중복 확인
     * @param nickname
     * @return
     */
    @GetMapping("/verify-nickname/{nickname}")
    public ResponseEntity<SingleResDto<String>> checkNicknameDuplicate(@PathVariable String nickname) {
        memberService.checkNicknameDuplicate(nickname);

        return new ResponseEntity<>(new SingleResDto<>("사용 가능한 닉네임입니다."), HttpStatus.OK);
    }

    @GetMapping("/findId")
    public ResponseEntity<SingleResDto<String>> findEmail(@RequestBody FindEmailDto findEmailDto){
        Member member = memberService.findEmail(findEmailDto.getPhone());

        return new ResponseEntity<>(new SingleResDto<>(member.getEmail()), HttpStatus.OK);
    }
    @GetMapping("/findPassword")
    public ResponseEntity<SingleResDto<String>> findPassword(@RequestBody FindPasswordDto findPasswordDto){
        Member member = memberService.findPassword(findPasswordDto.getEmail());

        return new ResponseEntity<>(new SingleResDto<>(member.getPassword()), HttpStatus.OK);
    }
}
