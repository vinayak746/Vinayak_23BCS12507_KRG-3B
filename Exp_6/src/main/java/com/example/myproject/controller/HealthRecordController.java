package com.example.myproject.controller;

import com.example.myproject.dto.HealthRecordDTO;
import com.example.myproject.service.HealthRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * HealthRecord REST Controller
 * Demonstrates RESTful API design with proper HTTP methods
 * Shows dependency injection and API documentation
 */
@RestController
@RequestMapping("/api/health-records")
@RequiredArgsConstructor
public class HealthRecordController {

    // Dependency Injection - Service layer dependency
    private final HealthRecordService healthRecordService;

    /**
     * CREATE: Create a new health record
     * @param dto Health record DTO with validation
     * @return Created health record
     */
    @PostMapping
    public ResponseEntity<HealthRecordDTO> createHealthRecord(@Valid @RequestBody HealthRecordDTO dto) {
        HealthRecordDTO created = healthRecordService.createHealthRecord(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * READ: Get all health records
     * @return List of all health records
     */
    @GetMapping
    public ResponseEntity<List<HealthRecordDTO>> getAllHealthRecords() {
        List<HealthRecordDTO> records = healthRecordService.getAllHealthRecords();
        return ResponseEntity.ok(records);
    }

    /**
     * READ: Get a health record by ID
     * @param id Health record ID
     * @return Health record details
     */
    @GetMapping("/{id}")
    public ResponseEntity<HealthRecordDTO> getHealthRecordById(@PathVariable Long id) {
        HealthRecordDTO record = healthRecordService.getHealthRecordById(id);
        return ResponseEntity.ok(record);
    }

    /**
     * UPDATE: Update an existing health record
     * @param id Health record ID
     * @param dto Updated health record DTO
     * @return Updated health record
     */
    @PutMapping("/{id}")
    public ResponseEntity<HealthRecordDTO> updateHealthRecord(
            @PathVariable Long id,
            @Valid @RequestBody HealthRecordDTO dto) {
        HealthRecordDTO updated = healthRecordService.updateHealthRecord(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE: Delete a health record
     * @param id Health record ID
     * @return Success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteHealthRecord(@PathVariable Long id) {
        healthRecordService.deleteHealthRecord(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Health record with ID " + id + " deleted successfully");
        return ResponseEntity.ok(response);
    }

    // ============= SEARCH ENDPOINTS =============

    /**
     * Search by patient name
     * @param patientName Patient name
     * @return List of matching records
     */
    @GetMapping("/search/patient")
    public ResponseEntity<List<HealthRecordDTO>> searchByPatientName(
            @RequestParam String patientName) {
        List<HealthRecordDTO> records = healthRecordService.getHealthRecordsByPatientName(patientName);
        return ResponseEntity.ok(records);
    }

    /**
     * Search by blood type
     * @param bloodType Blood type (O+, O-, A+, A-, B+, B-, AB+, AB-)
     * @return List of matching records
     */
    @GetMapping("/search/blood-type")
    public ResponseEntity<List<HealthRecordDTO>> searchByBloodType(
            @RequestParam String bloodType) {
        List<HealthRecordDTO> records = healthRecordService.getHealthRecordsByBloodType(bloodType);
        return ResponseEntity.ok(records);
    }

    /**
     * Search by medical condition
     * @param condition Medical condition
     * @return List of matching records
     */
    @GetMapping("/search/condition")
    public ResponseEntity<List<HealthRecordDTO>> searchByMedicalCondition(
            @RequestParam String condition) {
        List<HealthRecordDTO> records = healthRecordService.getHealthRecordsByMedicalCondition(condition);
        return ResponseEntity.ok(records);
    }

    /**
     * Search by date range
     * @param startDate Start date (yyyy-MM-dd)
     * @param endDate End date (yyyy-MM-dd)
     * @return List of records in date range
     */
    @GetMapping("/search/date-range")
    public ResponseEntity<List<HealthRecordDTO>> searchByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<HealthRecordDTO> records = healthRecordService.getHealthRecordsByDateRange(startDate, endDate);
        return ResponseEntity.ok(records);
    }

    /**
     * Get high blood pressure records
     * @return List of records with high BP (>= 140/90)
     */
    @GetMapping("/search/high-blood-pressure")
    public ResponseEntity<List<HealthRecordDTO>> getHighBloodPressureRecords() {
        List<HealthRecordDTO> records = healthRecordService.getHighBloodPressureRecords();
        return ResponseEntity.ok(records);
    }

    /**
     * Get elevated heart rate records
     * @return List of records with heart rate > 100 bpm
     */
    @GetMapping("/search/elevated-heart-rate")
    public ResponseEntity<List<HealthRecordDTO>> getElevatedHeartRateRecords() {
        List<HealthRecordDTO> records = healthRecordService.getElevatedHeartRateRecords();
        return ResponseEntity.ok(records);
    }

    /**
     * Search by patient name and date range
     * @param patientName Patient name
     * @param startDate Start date
     * @param endDate End date
     * @return List of matching records
     */
    @GetMapping("/search/patient-and-date")
    public ResponseEntity<List<HealthRecordDTO>> searchByPatientAndDateRange(
            @RequestParam String patientName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<HealthRecordDTO> records = healthRecordService.getRecordsByPatientAndDateRange(patientName, startDate, endDate);
        return ResponseEntity.ok(records);
    }

    /**
     * Search by doctor and medical condition
     * @param doctorName Doctor name
     * @param condition Medical condition
     * @return List of matching records
     */
    @GetMapping("/search/doctor-and-condition")
    public ResponseEntity<List<HealthRecordDTO>> searchByDoctorAndCondition(
            @RequestParam String doctorName,
            @RequestParam String condition) {
        List<HealthRecordDTO> records = healthRecordService.getRecordsByDoctorAndCondition(doctorName, condition);
        return ResponseEntity.ok(records);
    }

    /**
     * Get statistics
     * @return Health records statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRecords", healthRecordService.getTotalRecordsCount());
        stats.put("highBloodPressureCount", healthRecordService.getHighBloodPressureRecords().size());
        stats.put("elevatedHeartRateCount", healthRecordService.getElevatedHeartRateRecords().size());
        return ResponseEntity.ok(stats);
    }
}
