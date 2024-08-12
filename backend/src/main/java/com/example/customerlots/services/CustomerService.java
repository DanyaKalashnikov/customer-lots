package com.example.customerlots.services;

import com.example.customerlots.data.dto.CustomerDto;
import com.example.customerlots.data.forms.CustomerForm;
import com.example.customerlots.data.mappers.CustomerMapper;
import com.example.customerlots.exception.NotFoundException;
import com.example.customerlots.models.Customer;
import com.example.customerlots.repos.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerDto createCustomer(CustomerForm form){
        return CustomerMapper.INSTANCE.toDto(
                customerRepository.save(Customer.builder()
                        .customerName(form.getCustomerName())
                        .customerInn(form.getCustomerInn())
                        .customerKpp(form.getCustomerKpp())
                        .customerPostalAddress(form.getCustomerPostalAddress())
                        .customerLegalAddress(form.getCustomerLegalAddress())
                        .customerEmail(form.getCustomerEmail())
                        .isOrganization(form.isOrganization())
                        .isPerson(form.isPerson())
                        .build())
        );
    }

    public CustomerDto getCustomer(UUID code){
        return CustomerMapper.INSTANCE.toDto(customerRepository.findById(code)
                .orElseThrow(() -> new NotFoundException("Customer not found")));
    }

    public Customer getCustomerModel(UUID code){
        return customerRepository.findById(code)
                .orElseThrow(() -> new NotFoundException("Customer not found"));
    }

    public List<CustomerDto> getAllCustomers(){
        return CustomerMapper.INSTANCE.toDto(customerRepository.findAll());
    }

    public CustomerDto updateCustomer(UUID id, CustomerForm form){
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new NotFoundException("Customer not found"));
        customer.setCustomerInn(form.getCustomerInn());
        customer.setCustomerKpp(form.getCustomerKpp());
        customer.setCustomerEmail(form.getCustomerEmail());
        customer.setCustomerName(form.getCustomerName());
        customer.setCustomerPostalAddress(form.getCustomerPostalAddress());
        customer.setCustomerLegalAddress(form.getCustomerLegalAddress());
        customer.setOrganization(form.isOrganization());
        customer.setPerson(form.isPerson());
        return CustomerMapper.INSTANCE.toDto(customerRepository.save(customer));
    }

    public void deleteCustomer(UUID code){
        customerRepository.deleteById(code);
    }
}
