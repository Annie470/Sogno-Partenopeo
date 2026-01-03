package S_BE.sp.repositories;

import S_BE.sp.entities.Logable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LogableRepository extends JpaRepository<Logable, UUID> {

    Optional<Logable> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Logable> findById(UUID id);
}
