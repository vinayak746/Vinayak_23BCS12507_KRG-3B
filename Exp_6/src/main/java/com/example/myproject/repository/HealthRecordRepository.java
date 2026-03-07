package com.example.myproject.repository;

import com.example.myproject.entity.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * HealthRecord Repository - Data Access Layer
 * Demonstrates Spring Data JPA with custom queries
 * This interface provides CRUD operations and custom query methods
 */
@Repository
public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {

    /**
     * Find health records by patient name (case-insensitive)
     */
    List<HealthRecord> findByPatientNameIgnoreCase(String patientName);

    /**
     * Find health records by blood type
     */
    List<HealthRecord> findByBloodType(String bloodType);

    /**
     * Find health records by medical condition
     */
    List<HealthRecord> findByMedicalCondition(String medicalCondition);

    /**
     * Find health records recorded after a specific date
     */
    List<HealthRecord> findByRecordDateAfter(LocalDate date);

    /**
     * Find health records recorded before a specific date
     */
    List<HealthRecord> findByRecordDateBefore(LocalDate date);

    /**
     * Find health records between two dates
     */
    List<HealthRecord> findByRecordDateBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Find health records by doctor's name
     */
    List<HealthRecord> findByDoctorName(String doctorName);

    /**
     * Custom query to find high blood pressure records
     * Systolic BP >= 140 or Diastolic BP >= 90
     */
    @Query("SELECT h FROM HealthRecord h WHERE h.systolicBP >= 140 OR h.diastolicBP >= 90")
    List<HealthRecord> findHighBloodPressureRecords();

    /**
     * Custom query to find records with elevated heart rate
     * Heart rate > 100 bpm
     */
    @Query("SELECT h FROM HealthRecord h WHERE h.heartRate > 100")
    List<HealthRecord> findElevatedHeartRateRecords();

    /**
     * Custom query to find records by patient name and date range
     */
    @Query("SELECT h FROM HealthRecord h WHERE LOWER(h.patientName) LIKE LOWER(CONCAT('%', :patientName, '%')) " +
           "AND h.recordDate BETWEEN :startDate AND :endDate")
    List<HealthRecord> findByPatientNameAndDateRange(
        @Param("patientName") String patientName,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );

    /**
     * Find records by doctor name and medical condition
     */
    List<HealthRecord> findByDoctorNameAndMedicalCondition(String doctorName, String medicalCondition);

    /**
     * Check if a record exists for a patient on a specific date
     */
    boolean existsByPatientNameAndRecordDate(String patientName, LocalDate recordDate);
}
