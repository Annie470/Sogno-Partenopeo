package S_BE.sp.tools;


import S_BE.sp.entities.Prenotazione;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import java.time.format.DateTimeFormatter;

@Component
@Slf4j
public class EmailSender {

    @Autowired
    private JavaMailSender mailSender;
    @Value("${admin.email}")
    private String adminEmail;

    public void sendReservationEmail(Prenotazione prenotazione) {
        sendEmailToClient(prenotazione);
        sendEmailToAdmin(prenotazione);
    }

    public void sendEmailToClient(Prenotazione prenotazione) {
        String dataFormattata = prenotazione.getDataPrenotazione().format(
                DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
        );

        String text = "RIEPILOGO:\n\n\nID prenotazione: " + prenotazione.getId() +
                "\n\nPax: " + prenotazione.getNumeroPersone() +
                "\n\nPer il: " + dataFormattata +
                "\n\nEffettuata da: " + prenotazione.getNomeCompleto() +
                ", " + prenotazione.getEmail() +
                ", " + prenotazione.getTelefono();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(prenotazione.getEmail());
            message.setSubject( "✅ Conferma Prenotazione - " + prenotazione.getNomeCompleto());
            message.setText(text);
            mailSender.send(message);
            log.info("Email sent successfully to client");
        } catch (MailAuthenticationException e) {
            log.error("Errore autenticazione. Controlla username/password SMTP", e);
        } catch (MailException e) {
            log.error("Failed to send email to client", e);
        }
    }
    public void sendEmailToAdmin(Prenotazione prenotazione) {
        String dataFormattata = prenotazione.getDataPrenotazione().format(
                DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
        );

        String text = "RIEPILOGO:\n\n\nID prenotazione: " + prenotazione.getId() +
                "\n\nPax: " + prenotazione.getNumeroPersone() +
                "\n\nPer il: " + dataFormattata +
                "\n\nEffettuata da: " + prenotazione.getNomeCompleto() +
                ", " + prenotazione.getEmail() +
                ", " + prenotazione.getTelefono();
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(adminEmail);
            message.setSubject( "\uD83D\uDCD6 Nuova Prenotazione Ricevuta - " + prenotazione.getNomeCompleto());
            message.setText(text);
            mailSender.send(message);
            log.info("Email sent successfully to admin");
        } catch (MailAuthenticationException e) {
            log.error("Errore autenticazione. Controlla username/password SMTP", e);
        } catch (MailException e) {
            log.error("Failed to send email to admin", e);
        }
    }

    public void sendEmailAfterDelete(Prenotazione prenotazione) {
        String text = "La tua prenotazione è stata cancellata:\n\n\nID prenotazione: "+prenotazione.getId()+"\n\nPax: "+prenotazione.getNumeroPersone()+"\n\nPer il: " +prenotazione.getDataPrenotazione()+"\n\nEffettuata da: "+prenotazione.getNomeCompleto()+", "+prenotazione.getEmail()+", "+prenotazione.getTelefono();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(prenotazione.getEmail());
            message.setSubject( "❌ Prenotazione Cancellata - " + prenotazione.getNomeCompleto());
            message.setText(text);
            mailSender.send(message);
            log.info("Email sent successfully to client");
        } catch (MailAuthenticationException e) {
            log.error("Errore autenticazione. Controlla username/password SMTP", e);
        } catch (MailException e) {
            log.error("Failed to send email to client", e);
        }
    }

}
