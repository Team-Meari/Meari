package Team.Meari.Meari.member.service;

import Team.Meari.Meari.global.exception.dto.BusinessLogicException;
import Team.Meari.Meari.global.exception.exception.ExceptionCode;
import Team.Meari.Meari.member.entity.Member;
import Team.Meari.Meari.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원 생성
     * @param member
     * @return
     */
    @Transactional
    public Member createMember(Member member){
        verifyNotExistEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        return memberRepository.save(member);
    }

    /**
     * 회원 정보 수정
     * @param member
     * @param memberId
     * @return
     */
    @Transactional
    public Member modifyMember(Member member, Long memberId) {
        Member existMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional.ofNullable(member.getNickname()).ifPresent(existMember::setNickname);

        return memberRepository.save(existMember);
    }

    /**
     * 회원 탈퇴
     * @param memberId
     * @return
     */
    @Transactional
    public Member deleteMember(Long memberId){
        Member verifyMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        verifyMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        return memberRepository.save(verifyMember);
    }

    /**
     * 회원 조회
     * @param memberId
     * @return
     */
    @Transactional
    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    /**
     * 전체 회원 조회
     * @param pageable
     * @return
     */
    @Transactional
    public Page<Member> findMembers(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    /**
     * Email 중복 확인 메서드
     * @param email
     */
    private void verifyNotExistEmail(String email) {
        Optional<Member> optionalEmail = memberRepository.findByEmail(email);
        if(optionalEmail.isPresent()) throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
    }

}
