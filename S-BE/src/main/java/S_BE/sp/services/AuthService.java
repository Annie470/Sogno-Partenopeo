package S_BE.sp.services;
import S_BE.sp.entities.Logable;
import S_BE.sp.exceptions.UnauthorizedException;
import S_BE.sp.payloads.LogableDTO;
import S_BE.sp.security.JwtTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthService {
    @Autowired
    private JwtTools jwtTools;
    @Autowired
    private PasswordEncoder bcrypt;
    @Autowired
    private LogableService logableService;

    public String checkUserAndGenerateToken(LogableDTO body) {
        Logable found =logableService.findByEmail(body.email());
        if(bcrypt.matches(body.password(), found.getPassword())){
            return  jwtTools.createToken(found);
        } else {
            throw  new UnauthorizedException("Credenziali errate!");
        }
    }
}
