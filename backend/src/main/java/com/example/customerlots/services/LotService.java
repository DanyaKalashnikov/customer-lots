package com.example.customerlots.services;

import com.example.customerlots.data.dto.LotDto;
import com.example.customerlots.data.forms.LotForm;
import com.example.customerlots.data.mappers.LotMapper;
import com.example.customerlots.exception.NotFoundException;
import com.example.customerlots.models.Lot;
import com.example.customerlots.repos.LotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LotService {
    private final LotRepository lotRepository;
    private final CustomerService customerService;

    public LotDto createLot(LotForm form){
        return LotMapper.INSTANCE.toDto(
                lotRepository.save(Lot.builder()
                        .lotDescription(form.getLotDescription())
                        .lotName(form.getLotName())
                        .currencyCode(form.getCurrencyCode().name())
                        .ndsRate(form.getNdsRate())
                        .price(form.getPrice())
                        .placeDelivery(form.getPlaceDelivery())
                        .dateDelivery(form.getDateDelivery())
                        .customer(customerService.getCustomerModel(form.getCustomerCode()))
                        .build())
        );
    }

    public LotDto getLot(UUID id){
        return LotMapper.INSTANCE.toDto(lotRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Lot not found")));
    }

    public List<LotDto> getAllLots(){
        return LotMapper.INSTANCE.toDto(lotRepository.findAll());
    }

    public List<LotDto> getAllLotsByCustomer(UUID customerId){
        return LotMapper.INSTANCE.toDto(lotRepository.findByOrderByDateDelivery(customerId));
    }

    public LotDto updateLot(UUID id, LotForm form){
        Lot lot = lotRepository.findById(id).orElseThrow(() -> new NotFoundException("Lot not found"));
        lot.setLotName(form.getLotName());
        lot.setPrice(form.getPrice());
        lot.setLotDescription(form.getLotDescription());
        lot.setNdsRate(form.getNdsRate());
        lot.setCurrencyCode(form.getCurrencyCode().name());
        lot.setPlaceDelivery(form.getPlaceDelivery());
        lot.setDateDelivery(form.getDateDelivery());
        lot.setCustomer(customerService.getCustomerModel(form.getCustomerCode()));
        return LotMapper.INSTANCE.toDto(lotRepository.save(lot));
    }

    public void deleteLot(UUID id){
        lotRepository.deleteById(id);
    }
}
