package com.example.customerlots.controller;

import com.example.customerlots.data.dto.CustomerDto;
import com.example.customerlots.data.forms.CustomerForm;
import com.example.customerlots.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customer")
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping()
    public CustomerDto createCustomer(@RequestBody CustomerForm form) {
        return customerService.createCustomer(form);
    }

    @GetMapping("/{code}")
    public CustomerDto getCustomer(@PathVariable UUID code) {
        return customerService.getCustomer(code);
    }

    @GetMapping()
    public List<CustomerDto> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PutMapping("/{id}")
    public CustomerDto updateCustomer(@PathVariable UUID id,
                                      @RequestBody CustomerForm form) {
        return customerService.updateCustomer(id, form);
    }

    @DeleteMapping("/{code}")
    public void deleteCustomer(@PathVariable UUID code) {
        customerService.deleteCustomer(code);
    }
}
