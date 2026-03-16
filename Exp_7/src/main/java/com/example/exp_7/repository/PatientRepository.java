package com.example.exp_7.repository;

import com.example.exp_7.entity.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Slice<Patient> findByIdGreaterThanOrderByIdAsc(Long id, Pageable pageable);
}