package com.example.loyaltypointprojects.service.impl;

import com.example.loyaltypointprojects.model.Customer;
import com.example.loyaltypointprojects.repository.CustomerRepository;
import com.example.loyaltypointprojects.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer getCustomerById(String id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public void updateCustomer(String id, Customer updatedCustomer) {
        customerRepository.save(updatedCustomer);
    }

    @Override
    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    @Override
    public void addPoints(String id, Integer points) {
        Customer customer = getCustomerById(id);
        if (customer != null) {
            customer.setPoints(customer.getPoints() + points);
            updateCustomer(id, customer);
        }
    }

    @Override
    public void redeemPoints(String id, Integer points) {
        Customer customer = getCustomerById(id);
        if (customer != null && customer.getPoints() >= points) {
            customer.setPoints(customer.getPoints() - points);
            updateCustomer(id, customer);
        }
    }
}
