package Team.Meari.Meari.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor @Data
public class SingleResDto<T> {
    T data;
}
