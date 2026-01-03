package S_BE.sp.controllers;


import S_BE.sp.entities.Prenotazione;
import S_BE.sp.payloads.ChiusuraPrenotazioniDTO;
import S_BE.sp.payloads.NewPrenotazioneDTO;
import S_BE.sp.payloads.PrenotazioneResponseDTO;
import S_BE.sp.services.PrenotazioneService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/prenotazioni")
public class PrenotazioneController {
    @Autowired
    private PrenotazioneService prenotazioneService;


    //CREA PRENOTAZIONE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PrenotazioneResponseDTO creaPrenotazione(@RequestBody @Valid NewPrenotazioneDTO body) {
        return prenotazioneService.creaPrenotazione(body);
    }

    //CHIUDI PRENOTAZIONI
    @PostMapping("/close")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ADMIN')")
    public PrenotazioneResponseDTO chiudiPrenotazioni(
            @RequestBody @Valid ChiusuraPrenotazioniDTO body) {
        LocalDateTime dataConOra = body.data().atTime(LocalTime.of(22, 45));
        return prenotazioneService.chiudiPrenotazioni(dataConOra);
    }

    //GET BY ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Prenotazione getById(@PathVariable UUID id) {
        return prenotazioneService.findById(id);
            }

    // GET PER DATA
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Prenotazione> getByDate(  @RequestParam LocalDate data) {
        return prenotazioneService.findByDate(data);
    }

    //ELIMINA PER ID
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        prenotazioneService.delete(id);
    }

    //ELIMINA PRENOTAZIONI PASSATE
    @DeleteMapping("/cleanup")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminaPassate() {
        prenotazioneService.deleteAll();
    }

}
