package S_BE.sp.repositories;

import S_BE.sp.entities.Prenotazione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface PrenotazioneRepository  extends JpaRepository<Prenotazione, UUID>  {

    //PER GIORNO
    @Query("SELECT p FROM Prenotazione p WHERE DATE(p.dataPrenotazione) = :data ORDER BY p.dataPrenotazione")
    List<Prenotazione> findByDataPrenotazione(@Param("data") LocalDate data);

    //TOTALE PAX PRENOTATI PER DATO GIORNO
    @Query("SELECT COALESCE(SUM(p.numeroPersone), 0) FROM Prenotazione p WHERE DATE(p.dataPrenotazione) = :data")
    int countPersoneByData(@Param("data") LocalDate data);

    //ELIMINA PRENOTAZIONI PASSATE
    @Query("DELETE FROM Prenotazione p WHERE p.dataPrenotazione < :data")
    void deleteByDataPrenotazioneBefore(@Param("data") LocalDateTime data);


}
