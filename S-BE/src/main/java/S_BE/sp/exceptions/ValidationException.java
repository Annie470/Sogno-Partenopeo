package S_BE.sp.exceptions;
import lombok.Getter;

import java.util.List;

@Getter
public class ValidationException extends RuntimeException {
    private List<String> errors;

    public ValidationException(List<String> errors) {
        super("Errori nella validazione del payload");
        this.errors = errors;
    }
}