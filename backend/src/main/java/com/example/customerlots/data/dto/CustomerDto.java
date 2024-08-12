package com.example.customerlots.data.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
    private UUID customerCode;
    private String customerName;
    private String customerInn;
    private String customerKpp;
    private String customerPostalAddress;
    private String customerLegalAddress;
    private String customerEmail;
    private boolean organization;
    private boolean person;
}
