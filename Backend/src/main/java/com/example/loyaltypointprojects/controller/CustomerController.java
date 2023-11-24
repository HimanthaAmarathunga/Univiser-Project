package com.example.loyaltypointprojects.controller;

import com.example.loyaltypointprojects.model.Customer;
import com.example.loyaltypointprojects.model.Points;
import com.example.loyaltypointprojects.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping()
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable String id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable String id, @RequestBody Customer updatedCustomer) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        customerService.updateCustomer(id, updatedCustomer);
        return ResponseEntity.ok(updatedCustomer);
    }

    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        customerService.deleteCustomer(id);
        return ResponseEntity.ok(customer.getId() + " customer deleted successfully!");
    }

    @PutMapping("/addPoints/{id}")
    public ResponseEntity<Customer> addPoints(@PathVariable String id, @RequestBody Points request) {
        Integer points = request.getPoints();

        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }

        customerService.addPoints(id, points);
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    @PutMapping("/redeemPoints/{id}")
    public ResponseEntity<Customer> redeemPoints(@PathVariable String id, @RequestBody Points request) {
        Integer points = request.getPoints();

        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }

        customerService.redeemPoints(id, points);
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }
}
