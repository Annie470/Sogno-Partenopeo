package S_BE.sp.controllers;
import S_BE.sp.entities.Logable;
import S_BE.sp.exceptions.ValidationException;
import S_BE.sp.payloads.LogableDTO;
import S_BE.sp.payloads.LogableResponseDTO;
import S_BE.sp.services.AuthService;
import S_BE.sp.services.LogableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LogableController {
    @Autowired
    private AuthService authService;
    @Autowired
    private LogableService logableService;


    // REGISTER
    @PostMapping("/register")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Logable register(@RequestBody @Validated LogableDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.logableService.save(body);
    }

    //LOGIN
    @PostMapping("/login")
    public LogableResponseDTO login(@RequestBody @Validated LogableDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        String token =authService.checkUserAndGenerateToken(body);
        return new LogableResponseDTO(token);
    }

}
