package com.example.loyaltypointprojects;


import com.example.loyaltypointprojects.model.Customer;
import com.example.loyaltypointprojects.repository.CustomerRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataMongoTest
class CustomerTests {

    @Autowired
    CustomerRepository customerRepository;

    @Test
    public void createCustomerTest() {
        Customer customer = Customer.builder()
                .name("TestName1")
                .email("testname1@example.com")
                .points(100)
                .build();

        customerRepository.save(customer);

        Assertions.assertThat(customer.getPoints()).isGreaterThan(0);
    }

    @Test
    public void getCustomerTest() {
        Customer customer = customerRepository.findById("655f2249d286b50c9136b17a").get();

        Assertions.assertThat(customer.getId()).isEqualTo("655f2249d286b50c9136b17a");
    }

    @Test
    public void getAllCustomersTest() {
        List<Customer> customers = customerRepository.findAll();

        Assertions.assertThat(customers.size()).isGreaterThan(0);
    }

    @Test
    public void updateCustomer() {
        Customer customer = customerRepository.findById("655f2249d286b50c9136b17a").get();
        customer.setName("Himantha Test");
        Customer customerUpdated = customerRepository.save(customer);
        Assertions.assertThat(customerUpdated.getName()).isEqualTo("Himantha Test");
    }
}