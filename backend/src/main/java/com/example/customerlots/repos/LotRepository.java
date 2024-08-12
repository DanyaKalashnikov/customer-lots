package com.example.customerlots.repos;

import com.example.customerlots.models.Lot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

@Repository
public interface LotRepository extends JpaRepository<Lot, UUID> {
    @Query("SELECT lot FROM Lot lot WHERE lot.customer.customerCode = :customerCode")
    List<Lot> findByOrderByDateDelivery(@Param("customerCode") UUID customerCode);
}
