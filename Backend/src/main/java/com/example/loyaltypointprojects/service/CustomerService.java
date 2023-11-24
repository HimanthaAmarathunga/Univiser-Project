package com.example.loyaltypointprojects.service;

import com.example.loyaltypointprojects.model.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CustomerService {

    List<Customer> getAllCustomers();

    Customer createCustomer(Customer customer);

    Customer getCustomerById(String id);

    void updateCustomer(String id, Customer updatedCustomer);

    void deleteCustomer(String id);

    void addPoints(String id, Integer points);

    void redeemPoints(String id, Integer points);
}
