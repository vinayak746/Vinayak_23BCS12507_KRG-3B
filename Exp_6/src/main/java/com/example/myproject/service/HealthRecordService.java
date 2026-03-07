package com.example.myproject.service;

import com.example.myproject.dto.HealthRecordDTO;
import com.example.myproject.entity.HealthRecord;
import com.example.myproject.exception.HealthRecordNotFoundException;
import com.example.myproject.exception.InvalidHealthRecordException;
import com.example.myproject.repository.HealthRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * HealthRecord Service Layer
 * Demonstrates IoC/DI and business logic implementation
 * Uses @Service annotation and @Transactional for transaction management
 */
@Service
@RequiredArgsConstructor
@Transactional
public class HealthRecordService {

    // Dependency Injection - Spring manages the instantiation
    private final HealthRecordRepository healthRecordRepository;

    /**
     * Create a new health record
     * @param dto Health record DTO
     * @return Saved health record as DTO
     */
    public HealthRecordDTO createHealthRecord(HealthRecordDTO dto) {
        validateHealthRecordData(dto);
        
        HealthRecord record = new HealthRecord();
        record.setPatientName(dto.getPatientName());
        record.setAge(dto.getAge());
        record.setGender(dto.getGender());
        record.setBloodType(dto.getBloodType());
        record.setHeight(dto.getHeight());
        record.setWeight(dto.getWeight());
        record.setSystolicBP(dto.getSystolicBP());
        record.setDiastolicBP(dto.getDiastolicBP());
        record.setHeartRate(dto.getHeartRate());
        record.setMedicalCondition(dto.getMedicalCondition());
        record.setCurrentMedication(dto.getCurrentMedication());
        record.setRecordDate(dto.getRecordDate());
        record.setNotes(dto.getNotes());
        record.setDoctorName(dto.getDoctorName());

        HealthRecord saved = healthRecordRepository.save(record);
        return HealthRecordDTO.fromEntity(saved);
    }

    /**
     * Get all health records
     * @return List of all health records
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getAllHealthRecords() {
        return healthRecordRepository.findAll()
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get a health record by ID
     * @param id Health record ID
     * @return Health record DTO
     */
    @Transactional(readOnly = true)
    public HealthRecordDTO getHealthRecordById(Long id) {
        HealthRecord record = healthRecordRepository.findById(id)
                .orElseThrow(() -> new HealthRecordNotFoundException(id));
        return HealthRecordDTO.fromEntity(record);
    }

    /**
     * Update an existing health record
     * @param id Health record ID
     * @param dto Updated health record DTO
     * @return Updated health record DTO
     */
    public HealthRecordDTO updateHealthRecord(Long id, HealthRecordDTO dto) {
        validateHealthRecordData(dto);
        
        HealthRecord record = healthRecordRepository.findById(id)
                .orElseThrow(() -> new HealthRecordNotFoundException(id));

        record.setPatientName(dto.getPatientName());
        record.setAge(dto.getAge());
        record.setGender(dto.getGender());
        record.setBloodType(dto.getBloodType());
        record.setHeight(dto.getHeight());
        record.setWeight(dto.getWeight());
        record.setSystolicBP(dto.getSystolicBP());
        record.setDiastolicBP(dto.getDiastolicBP());
        record.setHeartRate(dto.getHeartRate());
        record.setMedicalCondition(dto.getMedicalCondition());
        record.setCurrentMedication(dto.getCurrentMedication());
        record.setRecordDate(dto.getRecordDate());
        record.setNotes(dto.getNotes());
        record.setDoctorName(dto.getDoctorName());

        HealthRecord updated = healthRecordRepository.save(record);
        return HealthRecordDTO.fromEntity(updated);
    }

    /**
     * Delete a health record
     * @param id Health record ID
     */
    public void deleteHealthRecord(Long id) {
        HealthRecord record = healthRecordRepository.findById(id)
                .orElseThrow(() -> new HealthRecordNotFoundException(id));
        healthRecordRepository.delete(record);
    }

    /**
     * Get health records by patient name
     * @param patientName Patient name
     * @return List of health records
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getHealthRecordsByPatientName(String patientName) {
        return healthRecordRepository.findByPatientNameIgnoreCase(patientName)
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get health records by blood type
     * @param bloodType Blood type
     * @return List of health records
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getHealthRecordsByBloodType(String bloodType) {
        return healthRecordRepository.findByBloodType(bloodType)
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get health records by medical condition
     * @param condition Medical condition
     * @return List of health records
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getHealthRecordsByMedicalCondition(String condition) {
        return healthRecordRepository.findByMedicalCondition(condition)
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get health records between two dates
     * @param startDate Start date
     * @param endDate End date
     * @return List of health records
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getHealthRecordsByDateRange(LocalDate startDate, LocalDate endDate) {
        return healthRecordRepository.findByRecordDateBetween(startDate, endDate)
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get high blood pressure records
     * @return List of health records with high BP
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getHighBloodPressureRecords() {
        return healthRecordRepository.findHighBloodPressureRecords()
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get elevated heart rate records
     * @return List of health records with elevated heart rate
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getElevatedHeartRateRecords() {
        return healthRecordRepository.findElevatedHeartRateRecords()
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get records by patient name and date range
     * @param patientName Patient name
     * @param startDate Start date
     * @param endDate End date
     * @return List of health records
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getRecordsByPatientAndDateRange(String patientName, LocalDate startDate, LocalDate endDate) {
        return healthRecordRepository.findByPatientNameAndDateRange(patientName, startDate, endDate)
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get records by doctor and condition
     * @param doctorName Doctor name
     * @param condition Medical condition
     * @return List of health records
     */
    @Transactional(readOnly = true)
    public List<HealthRecordDTO> getRecordsByDoctorAndCondition(String doctorName, String condition) {
        return healthRecordRepository.findByDoctorNameAndMedicalCondition(doctorName, condition)
                .stream()
                .map(HealthRecordDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Validate health record data
     * @param dto Health record DTO to validate
     * @throws InvalidHealthRecordException if data is invalid
     */
    private void validateHealthRecordData(HealthRecordDTO dto) {
        if (dto.getHeight() != null && dto.getWeight() != null && dto.getHeight() > 0) {
            double bmi = dto.getWeight() / Math.pow(dto.getHeight() / 100.0, 2);
            if (bmi < 10 || bmi > 80) {
                throw new InvalidHealthRecordException("BMI is out of reasonable range: " + String.format("%.2f", bmi));
            }
        }
    }

    /**
     * Get total number of health records
     * @return Count of health records
     */
    @Transactional(readOnly = true)
    public long getTotalRecordsCount() {
        return healthRecordRepository.count();
    }
}
