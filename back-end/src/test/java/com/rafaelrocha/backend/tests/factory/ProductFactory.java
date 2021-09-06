package com.rafaelrocha.backend.tests.factory;

import com.rafaelrocha.backend.dto.ProductDTO;
import com.rafaelrocha.backend.entities.Product;

import java.time.Instant;

public class ProductFactory {

    public static Product createProduct() {
        return new Product(1L, "Phone", "good Phone",  800.0, "http://img.com/img;png", Instant.parse("2021-10-20T03:00:00Z"));
    }

    public static ProductDTO createProductDTO() {
        return new ProductDTO(createProduct());
    }
}
