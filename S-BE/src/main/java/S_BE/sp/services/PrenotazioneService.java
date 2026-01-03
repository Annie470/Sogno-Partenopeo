package S_BE.sp.services;
import S_BE.sp.entities.Prenotazione;
import S_BE.sp.exceptions.CapacitaEsauritaException;
import S_BE.sp.exceptions.NotFoundException;
import S_BE.sp.payloads.NewPrenotazioneDTO;
import S_BE.sp.payloads.PrenotazioneResponseDTO;
import S_BE.sp.repositories.PrenotazioneRepository;
import S_BE.sp.tools.EmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
@Slf4j
public class PrenotazioneService {
    @Autowired
    private PrenotazioneRepository prenotazioneRepository;
    @Autowired
    private EmailSender emailSender;

    private static final int CAPACITA_MASSIMA_GIORNALIERA = 45;


    //CREA PRENOTAZIONE
    @Transactional
    public PrenotazioneResponseDTO creaPrenotazione(NewPrenotazioneDTO payload) {
        LocalDate dataPrenotazione = payload.dataPrenotazione().toLocalDate();

       int postiOccupati = prenotazioneRepository.countPersoneByData(dataPrenotazione);
       int postiDisponibili = CAPACITA_MASSIMA_GIORNALIERA - postiOccupati;

        if (payload.numeroPersone() > postiDisponibili) {
            throw new CapacitaEsauritaException(
                    String.format("Ristorante al completo. Posti disponibili: %d, richiesti: %d",
                             postiDisponibili,payload.numeroPersone())
            );
        }
        Prenotazione prenotazione = new Prenotazione();
        prenotazione.setNumeroPersone(payload.numeroPersone());
        prenotazione.setDataPrenotazione(payload.dataPrenotazione());
        prenotazione.setEmail(payload.email());
        prenotazione.setTelefono(payload.telefono());
        prenotazione.setNomeCompleto(payload.nomeCompleto());

        Prenotazione salvata = prenotazioneRepository.save(prenotazione);
        log.info("Prenotazione salvata in db");

        emailSender.sendReservationEmail(prenotazione);
        return new PrenotazioneResponseDTO(
                salvata.getId(),
                salvata.getNumeroPersone(),
                salvata.getDataPrenotazione(),
                salvata.getEmail(),
                salvata.getTelefono(),
                salvata.getNomeCompleto()
        );
    }

    //CHIUDI PRENOTAZIONI
    @Transactional
    public PrenotazioneResponseDTO chiudiPrenotazioni(LocalDateTime day) {
        int postiOccupati = prenotazioneRepository.countPersoneByData(day.toLocalDate());
        int nPaxDaOccupare = CAPACITA_MASSIMA_GIORNALIERA - postiOccupati;
        if (nPaxDaOccupare <= 0) {
            throw new CapacitaEsauritaException(
                    "Impossibile chiudere le prenotazioni: la capacità massima è già stata raggiunta o superata"
            );
        }
        Prenotazione prenotazione = new Prenotazione(
                nPaxDaOccupare,
                day,
                "prenotazionichiuse@ristorante.it",
                "0000000000",
                "PRENOTAZIONI CHIUSE",
                LocalDateTime.now()
        );

        Prenotazione salvata = prenotazioneRepository.save(prenotazione);
        log.info("Prenotazioni chiuse");
        return new PrenotazioneResponseDTO(
                salvata.getId(),
                salvata.getNumeroPersone(),
                salvata.getDataPrenotazione(),
                salvata.getEmail(),
                salvata.getTelefono(),
                salvata.getNomeCompleto()
        );
    }

    //GET BY ID
    public Prenotazione findById(UUID id) {
        Prenotazione prenotazione = prenotazioneRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Prenotazione non trovata"));
        return prenotazione;
    }

    //GET PRENOTAZIONI PER DATA
    public List<Prenotazione> findByDate(LocalDate data) {
        return prenotazioneRepository.findByDataPrenotazione(data);
    }

    //ELIMINA PRENOTAZIONE
    public void delete(UUID id) {
        Prenotazione prenotazione = prenotazioneRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Prenotazione non trovata"));

        emailSender.sendEmailAfterDelete(prenotazione);
        prenotazioneRepository.deleteById(prenotazione.getId());
        log.info("Prenotazione eliminata");
    }

    //ELIMINA PRENOTAZIONI PASSATE
    @Transactional
    public void deleteAll() {
        LocalDateTime oggi = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        List<Prenotazione> prenotazioniDaEliminare = prenotazioneRepository.findAll().stream()
                .filter(p -> p.getDataPrenotazione().isBefore(oggi))
                .collect(Collectors.toList());
        if(!prenotazioniDaEliminare.isEmpty()) {
            prenotazioneRepository.deleteAll(prenotazioniDaEliminare);
            log.info("Eliminate prenotazioni passate");
        }
        log.info("Nessuna prenotazione da eliminare");
    }
}
