package S_BE.sp.payloads;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public record NewPrenotazioneDTO(
        @NotNull
        @Min(value = 1)
        @Max(value=45)
        int numeroPersone,

        @NotNull(message = "La data è obbligatoria")
        @Future(message = "La data deve essere futura")
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dataPrenotazione,

        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Email non valida")
        String email,

        @NotBlank(message = "Il numero di telefono è obbligatorio")
        @Pattern(regexp = "^\\+?[0-9]{9,15}$", message = "Numero di telefono non valido")
        String telefono,

        @NotBlank(message = "Nome e cognome sono obbligatori")
        @Size(min = 2, max = 40, message = "Nome e cognome devono essere tra 2 e 100 caratteri")
        String nomeCompleto
) {
}
