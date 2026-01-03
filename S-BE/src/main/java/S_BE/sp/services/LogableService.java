package S_BE.sp.services;
import S_BE.sp.entities.Logable;
import S_BE.sp.exceptions.NotFoundException;
import S_BE.sp.exceptions.ValidationException;
import S_BE.sp.payloads.LogableDTO;
import S_BE.sp.repositories.LogableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LogableService {
    @Autowired
    private LogableRepository logableRepository;

    @Autowired
    private PasswordEncoder bcrypt;


    //GET SINGLE
    public Logable findByEmail(String email) { return this.logableRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Admin inesistente o email incorretta"));}
    public Logable findById(UUID id) { return this.logableRepository.findById(id).orElseThrow(() -> new NotFoundException("Nessun admin corrispondente a questo ID!"));}

    //SAVE ONE
    public  Logable save(LogableDTO payload){
        List<String> errors = new ArrayList<>();
        if(logableRepository.existsByEmail(payload.email())) {
            errors.add("Email gia in uso!");
        }
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }

        Logable newAdmin = new Logable((payload.email()), bcrypt.encode(payload.password()));
        this.logableRepository.save(newAdmin);
        return newAdmin;
    }
}

