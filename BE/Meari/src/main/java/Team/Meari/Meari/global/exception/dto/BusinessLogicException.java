package Team.Meari.Meari.global.exception.dto;

import Team.Meari.Meari.global.exception.exception.ExceptionCode;
import lombok.Getter;

public class BusinessLogicException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
