package Team.Meari.Meari.auth.controller;

import Team.Meari.Meari.auth.service.AuthService;
import Team.Meari.Meari.global.dto.SingleResDto;
import Team.Meari.Meari.global.security.dto.*;
import Team.Meari.Meari.global.security.utils.SecurityUtils;
import Team.Meari.Meari.member.dto.MemberResDto;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;
    private final AuthService authService;

    /**
     * 로그인
     * @param loginDto
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<CustomMultiResDto> login(@RequestBody LoginDto loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        TokenDto tokenDto = authService.login(email, password);
        Member member = memberService.findMember(loginDto.getEmail());
        MemberResDto memberResDto = new MemberResDto(member);
        return new ResponseEntity<>(new CustomMultiResDto(tokenDto, memberResDto), HttpStatus.OK);
    }

    @PostMapping("/reissue")
    public ResponseEntity<CustomTokenDto> reissue(@RequestBody TokenReqDto tokenReqDto) {
        TokenDto tokenDto = authService.reissue(tokenReqDto);
        return new ResponseEntity<>(new CustomTokenDto(tokenDto), HttpStatus.OK);
    }

//    @PostMapping("/logout")
//    public ResponseEntity<SingleResDto<String>> logout(@RequestBody TokenReqDto tokenReqDto){
//        authService.logout(tokenReqDto);
//        return new ResponseEntity<>(new SingleResDto<>("정상적으로 로그아웃되었습니다."), HttpStatus.OK);
//    }
    @DeleteMapping("/logout")
    public ResponseEntity<SingleResDto<String>> logout(HttpServletRequest httpServletRequest){
        authService.logout();
        return new ResponseEntity<>(new SingleResDto<>("정상적으로 로그아웃되었습니다."), HttpStatus.OK);
    }

}
