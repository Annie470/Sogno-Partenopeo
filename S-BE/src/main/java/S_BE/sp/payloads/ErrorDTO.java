package S_BE.sp.payloads;


import java.time.LocalDateTime;

public record ErrorDTO(
        String message,
        LocalDateTime date) {}
