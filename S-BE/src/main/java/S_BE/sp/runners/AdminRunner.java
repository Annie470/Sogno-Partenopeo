package S_BE.sp.runners;
import S_BE.sp.entities.Logable;
import S_BE.sp.repositories.LogableRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AdminRunner implements CommandLineRunner {
    @Autowired
    private LogableRepository logableRepository;

    @Autowired
    private Logable admin;

    @Override
    public void run(String... args) throws Exception {
        if (!logableRepository.existsByEmail(admin.getEmail())) {
            logableRepository.save(admin);
            log.info("Admin aggiunto al database!");
        } else {
            log.warn("Benvenuto Admin!");
        }
    }
}
