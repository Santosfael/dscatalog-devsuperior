package com.rafaelrocha.backend.tests.repositories;

import com.rafaelrocha.backend.entities.Category;
import com.rafaelrocha.backend.entities.Product;
import com.rafaelrocha.backend.repositories.ProductRepository;
import com.rafaelrocha.backend.tests.factory.ProductFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@DataJpaTest
public class ProductRespositoryTests {

    @Autowired
    private ProductRepository productRepository;

    private long existingId;
    private long nonExistingId;
    private long countTotalProducts;
    private long countPcGamerProducts;
    private long countCategory3Products;
    private PageRequest pageRequest;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countTotalProducts = 25L;
        countPcGamerProducts = 21L;
        pageRequest =  PageRequest.of(0, 10);
        countCategory3Products = 23L;
    }

    @Test
    public void findShouldReturnOnlySelectedCategoryWhenCategoryInformed() {
        List<Category> categories = new ArrayList<>();
        categories.add(new Category(3L,null));

        Page<Product> products = productRepository.find(categories, "", pageRequest);

        Assertions.assertFalse(products.isEmpty());
        Assertions.assertEquals(countCategory3Products, products.getTotalElements());
    }

    @Test
    public void findShouldReturnAllProductsWhenCategoryNotInformed() {
        List<Category> categories = null;

        Page<Product> products = productRepository.find(categories, "", pageRequest);

        Assertions.assertFalse(products.isEmpty());
        Assertions.assertEquals(countTotalProducts, products.getTotalElements());
    }

    @Test
    public void findShouldReturnAllProductsWhenExistsNameIsEmpty() {
        String name = "";

        Page<Product> products = productRepository.find(null, name, pageRequest);

        Assertions.assertFalse(products.isEmpty());
        Assertions.assertEquals(countTotalProducts, products.getTotalElements());
    }

    @Test
    public void findShouldReturnProductsWhenExistsIgnoringCase() {
        String name = "pc gAMeR";

        Page<Product> products = productRepository.find(null, name, pageRequest);

        Assertions.assertFalse(products.isEmpty());
        Assertions.assertEquals(countPcGamerProducts, products.getTotalElements());
    }

    @Test
    public void findShouldReturnProductsWhenExists() {
        String name = "PC Gamer";
        Page<Product> products = productRepository.find(null, name, pageRequest);

        Assertions.assertFalse(products.isEmpty());
        Assertions.assertEquals(countPcGamerProducts, products.getTotalElements());
    }

    @Test
    public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
        Product product = ProductFactory.createProduct();
        product.setId(null);

        product = productRepository.save(product);
        Optional<Product> result = productRepository.findById(product.getId());

        Assertions.assertNotNull(product.getId());
        Assertions.assertEquals(countTotalProducts + 1L, product.getId());
        Assertions.assertTrue(result.isPresent());
        Assertions.assertSame(result.get(), product);

    }

    @Test
    public void deleteShouldDeleteObjectWhenIdExists() {
        productRepository.deleteById(existingId);

        Optional<Product> result = productRepository.findById(existingId);
        Assertions.assertFalse(result.isPresent());
    }

    @Test
    public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {
        Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
            productRepository.deleteById(nonExistingId);
        });
    }
}
