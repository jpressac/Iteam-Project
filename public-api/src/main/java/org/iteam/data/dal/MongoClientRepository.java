package org.iteam.data.dal;

import java.io.Serializable;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoClientRepository extends MongoRepository<String, Serializable> {

}
