package S_BE.sp.payloads;

import jakarta.validation.constraints.FutureOrPresent;

import java.time.LocalDate;

public record ChiusuraPrenotazioniDTO(
        @FutureOrPresent(message = "La data di chiusura non può essere nel passato")
        LocalDate data
) {}