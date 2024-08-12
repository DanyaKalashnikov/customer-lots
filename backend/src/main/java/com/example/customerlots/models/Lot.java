package com.example.customerlots.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lot")
public class Lot {
    @Id
    @GeneratedValue
    private UUID lotId;
    private String lotName;
    private String lotDescription;
    private int price;
    private String currencyCode;
    private String ndsRate;
    private String placeDelivery;
    private LocalDate dateDelivery;

    @ManyToOne
    @JoinColumn(name = "customer_code")
    private Customer customer;
}
