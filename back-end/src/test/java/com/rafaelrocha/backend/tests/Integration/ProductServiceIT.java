package com.rafaelrocha.backend.tests.Integration;

import com.rafaelrocha.backend.dto.ProductDTO;
import com.rafaelrocha.backend.services.ProductService;
import com.rafaelrocha.backend.services.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class ProductServiceIT {

    @Autowired
    private ProductService productService;

    private long existingId;
    private long nonExistingId;
    private long countTotalProducts;
    private long countPcGamerProducts;
    private PageRequest pageRequest;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countTotalProducts = 25L;
        countPcGamerProducts = 21L;
        pageRequest = PageRequest.of(0, 10);
    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionDoesNotExists() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            productService.delete(nonExistingId);
        });

    }

    @Test
    public void deleteShouldDoNothingWhenIdExists() {
        Assertions.assertDoesNotThrow(() -> {
            productService.delete(existingId);
        });
    }

    @Test
    public void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {
        String name = "camera";
        Page<ProductDTO> products = productService.findAllPaged(0L, name, pageRequest);
        Assertions.assertTrue(products.isEmpty());
    }

    @Test
    public void findAllPagedShouldReturnAllProductsWhenExistsNameIsEmpty() {
        String name = "";

        Page<ProductDTO> products = productService.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(products.isEmpty());
        Assertions.assertEquals(countTotalProducts, products.getTotalElements());
    }

    @Test
    public void findAllPagedShouldReturnProductsWhenExistsIgnoringCase() {
        String name = "pc gAMeR";

        Page<ProductDTO> products = productService.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(products.isEmpty());
        Assertions.assertEquals(countPcGamerProducts, products.getTotalElements());
    }
}