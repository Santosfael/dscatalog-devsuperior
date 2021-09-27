package com.rafaelrocha.backend.tests.factory;

import com.rafaelrocha.backend.dto.ProductDTO;
import com.rafaelrocha.backend.entities.Category;
import com.rafaelrocha.backend.entities.Product;

import java.time.Instant;

public class ProductFactory {

    public static Product createProduct() {
        Product product = new Product(1L, "Phone", "good Phone",  800.0, "http://img.com/img;png", Instant.parse("2021-08-20T03:00:00Z"));
        product.getCategories().add(new Category(1L, null));

        return product;
    }

    public static ProductDTO createProductDTO() {
        Product product = createProduct();
        return new ProductDTO(product, product.getCategories());
    }

    public static ProductDTO createProductDTO(Long id) {
        ProductDTO product = createProductDTO();
        product.setId(id);
        return product;
    }
}
