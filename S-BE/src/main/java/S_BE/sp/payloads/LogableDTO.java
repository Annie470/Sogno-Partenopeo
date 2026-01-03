package S_BE.sp.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LogableDTO(
        @Email(message = "Email invalida")
        @NotBlank
        String email,
        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Z])(?=(?:.*\\d.*){2}).{8,}$", message = "La password deve contenere almeno 8 caratteri, una lettera maiuscola e due numeri")
        String password
) {
}