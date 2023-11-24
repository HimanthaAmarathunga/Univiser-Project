package com.example.loyaltypointprojects.repository;

import com.example.loyaltypointprojects.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer, String> {
}
