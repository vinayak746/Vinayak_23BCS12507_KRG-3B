package com.example.exp_7.service;

import com.example.exp_7.entity.Appointment;
import com.example.exp_7.entity.Doctor;
import com.example.exp_7.entity.Patient;
import com.example.exp_7.repository.AppointmentRepository;
import com.example.exp_7.repository.DoctorRepository;
import com.example.exp_7.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment saveAppointment(Appointment appointment) {
        if (appointment.getPatient() != null && appointment.getPatient().getId() != null) {
            Patient patient = patientRepository.findById(appointment.getPatient().getId())
                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + appointment.getPatient().getId()));
            appointment.setPatient(patient);
        }

        if (appointment.getDoctor() != null && appointment.getDoctor().getId() != null) {
            Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + appointment.getDoctor().getId()));
            appointment.setDoctor(doctor);
        }

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        return appointmentRepository.findById(id).map(appointment -> {
            appointment.setAppointmentDateTime(updatedAppointment.getAppointmentDateTime());
            appointment.setStatus(updatedAppointment.getStatus());

            if (updatedAppointment.getPatient() != null && updatedAppointment.getPatient().getId() != null) {
                Patient patient = patientRepository.findById(updatedAppointment.getPatient().getId())
                        .orElseThrow(() -> new RuntimeException("Patient not found with id: " + updatedAppointment.getPatient().getId()));
                appointment.setPatient(patient);
            }

            if (updatedAppointment.getDoctor() != null && updatedAppointment.getDoctor().getId() != null) {
                Doctor doctor = doctorRepository.findById(updatedAppointment.getDoctor().getId())
                        .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + updatedAppointment.getDoctor().getId()));
                appointment.setDoctor(doctor);
            }

            return appointmentRepository.save(appointment);
        }).orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}