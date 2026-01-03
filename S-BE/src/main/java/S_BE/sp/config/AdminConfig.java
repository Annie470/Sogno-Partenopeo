package S_BE.sp.config;

import S_BE.sp.entities.Logable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminConfig {

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.email}")
    private String adminEmail;

    @Autowired
    private PasswordEncoder bcrypt;

    @Bean
    public Logable admin() {
        return new Logable(adminEmail, bcrypt.encode(adminPassword));
    }
}
