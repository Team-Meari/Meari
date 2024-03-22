package Team.Meari.Meari.global.exception.exception;

import lombok.Getter;

public enum ExceptionCode {
    CHAT_NOT_FOUND(400,"존재하지 않는 메아리입니다."),
    NO_ACCESS_TOKEN(403, "토큰에 권한 정보가 존재하지 않습니다."),
    MEMBER_NOT_FOUND(400, "존재하지 않는 계정입니다."),
    MEMBER_ROLE_DOES_NOT_FOUND(400, "존재하지 않는 역할입니다."),
    MEMBER_ROLE_INVALID(401,"잘못된 역할입니다."),
    EMAIL_EXIST(401, "중복된 이메일 입니다."),
    NICKNAME_EXIST(401, "중복된 닉네임 입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
