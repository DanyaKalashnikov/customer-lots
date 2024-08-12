package com.example.customerlots.data.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NdsRateEnum {
    PERCENT_NO ("Без НДС"),
    PERCENT_18 ("18%"),
    PERCENT_20 ("20%");

    private final String rate;
}
