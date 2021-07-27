package com.rafaelrocha.backend.services;

import com.rafaelrocha.backend.dto.CategoryDTO;
import com.rafaelrocha.backend.dto.ProductDTO;
import com.rafaelrocha.backend.entities.Category;
import com.rafaelrocha.backend.entities.Product;
import com.rafaelrocha.backend.repositories.CategoryRepository;
import com.rafaelrocha.backend.repositories.ProductRepository;
import com.rafaelrocha.backend.services.exceptions.DataBaseException;
import com.rafaelrocha.backend.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
        Page<Product> productList = productRepository.findAll(pageRequest);

        return productList.map(ProductDTO::new);
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(Long id) {
        Optional<Product> productObj = productRepository.findById(id);
        Product product = productObj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        return new ProductDTO(product, product.getCategories());
    }

    @Transactional
    public ProductDTO insert(ProductDTO productDTO) {
        Product productEntity = new Product();
        copyDtoToEntity(productDTO, productEntity);
        productEntity = productRepository.save(productEntity);
        return new ProductDTO(productEntity);
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO productDTO) {
        try {
            Product productEntity = productRepository.getOne(id);
            copyDtoToEntity(productDTO, productEntity);
            productEntity = productRepository.save(productEntity);

            return new ProductDTO(productEntity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found" + id);
        }
    }

    public void delete(Long id) {
        try {
            productRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw  new ResourceNotFoundException("Id not found "+id);
        }catch (DataIntegrityViolationException e) {
            throw new DataBaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(ProductDTO productDTO, Product productEntity) {

        productEntity.setName(productDTO.getName());
        productEntity.setDescription(productDTO.getDescription());
        productEntity.setDate(productDTO.getDate());
        productEntity.setImgUrl(productDTO.getImgUrl());
        productEntity.setPrice(productDTO.getPrice());

        productEntity.getCategories().clear();
        for(CategoryDTO categoryDTO : productDTO.getCategories()) {
            Category category = categoryRepository.getOne(categoryDTO.getId());
            productEntity.getCategories().add(category);
        }
    }
}
