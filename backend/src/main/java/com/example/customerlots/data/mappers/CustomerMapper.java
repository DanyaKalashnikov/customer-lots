package com.example.customerlots.data.mappers;

import com.example.customerlots.data.dto.CustomerDto;
import com.example.customerlots.models.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CustomerMapper {
    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    CustomerDto toDto(Customer item);

    List<CustomerDto> toDto(List<Customer> items);
}
