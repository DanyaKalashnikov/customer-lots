package com.example.customerlots.data.forms;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerForm {
    private String customerName;
    private String customerInn;
    private String customerKpp;
    private String customerPostalAddress;
    private String customerLegalAddress;
    private String customerEmail;
    private boolean isOrganization;
    private boolean isPerson;
}
