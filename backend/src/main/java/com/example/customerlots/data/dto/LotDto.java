package com.example.customerlots.data.dto;

import com.example.customerlots.models.Customer;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LotDto {
    private UUID lotId;
    private String lotName;
    private String lotDescription;
    private int price;
    private String currencyCode;
    private String ndsRate;
    private String placeDelivery;
    private LocalDate dateDelivery;
    private Customer customer;
}
