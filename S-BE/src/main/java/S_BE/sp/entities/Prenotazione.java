package S_BE.sp.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(name = "prenotazioni", indexes = {
        @Index(name = "idx_data_prenotazione", columnList = "dataPrenotazione")
})
@Data
@NoArgsConstructor
public class Prenotazione {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;

    @NotNull
    @Min(value = 1)
    @Max(value=45)
    @Column(nullable = false)
    private int numeroPersone;

    @NotNull(message = "La data è obbligatoria")
    @FutureOrPresent
    @Column(nullable = false)
    private LocalDateTime dataPrenotazione;

    @NotBlank(message = "L'email è obbligatoria")
    @Email(message = "Email non valida")
    @Column(nullable = false)
    private String email;

    @NotBlank(message = "Il numero di telefono è obbligatorio")
    @Pattern(regexp = "^\\+?[0-9]{9,15}$", message = "Numero di telefono non valido")
    @Column(nullable = false)
    private String telefono;

    @NotBlank(message = "Nome e cognome sono obbligatori")
    @Size(min = 2, max = 40, message = "Nome e cognome devono essere tra 2 e 40 caratteri")
    @Column(nullable = false)
    private String nomeCompleto;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime creatoIl;

    public Prenotazione(int numeroPersone, LocalDateTime dataPrenotazione, String email, String telefono, String nomeCompleto, LocalDateTime creatoIl) {
        this.numeroPersone = numeroPersone;
        this.dataPrenotazione = dataPrenotazione;
        this.email = email;
        this.telefono = telefono;
        this.nomeCompleto = nomeCompleto;
        this.creatoIl = creatoIl;
    }
}
