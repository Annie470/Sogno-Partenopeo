package S_BE.sp.payloads;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.UUID;

public record PrenotazioneResponseDTO(

        UUID id,
        int numeroPersone,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dataPrenotazione,

        String email,
        String telefono,
        String nomeCompleto
) {
}
