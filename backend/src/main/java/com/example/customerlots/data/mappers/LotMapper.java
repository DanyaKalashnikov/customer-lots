package com.example.customerlots.data.mappers;

import com.example.customerlots.data.dto.LotDto;
import com.example.customerlots.models.Lot;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface LotMapper {
    LotMapper INSTANCE = Mappers.getMapper(LotMapper.class);

    LotDto toDto(Lot item);

    List<LotDto> toDto(List<Lot> items);
}
