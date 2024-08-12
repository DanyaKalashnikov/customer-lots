package com.example.customerlots.data.forms;

import com.example.customerlots.data.enums.CurrencyCodeEnum;
import com.example.customerlots.data.enums.NdsRateEnum;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LotForm {
    private String lotName;
    private String lotDescription;
    private int price;
    private CurrencyCodeEnum currencyCode;
    private String ndsRate;
    private String placeDelivery;
    private LocalDate dateDelivery;
    private UUID customerCode;
}
