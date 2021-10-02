package com.rafaelrocha.backend.services;

import com.rafaelrocha.backend.dto.CategoryDTO;
import com.rafaelrocha.backend.dto.ProductDTO;
import com.rafaelrocha.backend.dto.UriDTO;
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
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private S3Service s3Service;

    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllPaged(Long categoryId, String name, PageRequest pageRequest) {
        List<Category> categories = (categoryId == 0) ? null : Arrays.asList(categoryRepository.getOne(categoryId));
        Page<Product> productList = productRepository.find(categories, name, pageRequest);
        productRepository.findProductWithCategories(productList.getContent());
        return productList.map(x -> new ProductDTO(x, x.getCategories()));
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
        /*if(productEntity.getCategories().size() == 0) {
            Category category = categoryRepository.getOne(1L);
            productEntity.getCategories().add(category);
        }*/
        productEntity = productRepository.save(productEntity);
        return new ProductDTO(productEntity);
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO productDTO) {
        try {
            Product productEntity = productRepository.getOne(id);
            copyDtoToEntity(productDTO, productEntity);
            /*if(productEntity.getCategories().size() == 0) {
                Category category = categoryRepository.getOne(1L);
                productEntity.getCategories().add(category);
            }*/
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

    public UriDTO uploadFile(MultipartFile file) {
        URL url = s3Service.uploadFile(file);
        return new UriDTO(url.toString());
    }
}
