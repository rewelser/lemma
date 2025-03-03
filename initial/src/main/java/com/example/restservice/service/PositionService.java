package com.example.restservice.service;

import com.example.restservice.model.Position;
import com.example.restservice.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PositionService {

    private final PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    public Optional<Position> getPositionById(Long id) {
        return positionRepository.findById(id);
    }

    public Position createPosition(Position position) {
        return positionRepository.save(position);
    }

    public Optional<Position> updatePosition(Long id, Position positionDetails) {
        return positionRepository.findById(id).map(position -> {
            position.setTitle(positionDetails.getTitle());
            position.setDescription(positionDetails.getDescription());
            return positionRepository.save(position);
        });
    }

    public boolean deletePosition(Long id) {
        return positionRepository.findById(id).map(position -> {
            positionRepository.delete(position);
            return true;
        }).orElse(false);
    }
}
