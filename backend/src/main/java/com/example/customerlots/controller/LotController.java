package com.example.customerlots.controller;

import com.example.customerlots.data.dto.LotDto;
import com.example.customerlots.data.forms.LotForm;
import com.example.customerlots.services.LotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lot")
public class LotController {
    private final LotService lotService;

    @PostMapping()
    public LotDto createLot(@RequestBody LotForm form) {
        return lotService.createLot(form);
    }

    @GetMapping("/{id}")
    public LotDto getLot(@PathVariable UUID id) {
        return lotService.getLot(id);
    }

    @GetMapping()
    public List<LotDto> getAllLots() {
        return lotService.getAllLots();
    }

    @GetMapping("/byCustomer/{id}")
    public List<LotDto> getLotsByCustomer(@PathVariable UUID id) {
        return lotService.getAllLotsByCustomer(id);
    }

    @PutMapping("/{id}")
    public LotDto updateLot(@PathVariable UUID id,
                            @RequestBody LotForm form) {
        return lotService.updateLot(id, form);
    }

    @DeleteMapping("/{id}")
    public void deleteLot(@PathVariable UUID id) {
        lotService.deleteLot(id);
    }
}
