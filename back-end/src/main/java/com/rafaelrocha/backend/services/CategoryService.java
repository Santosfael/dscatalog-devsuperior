package com.rafaelrocha.backend.services;

import com.rafaelrocha.backend.dto.CategoryDTO;
import com.rafaelrocha.backend.entities.Category;
import com.rafaelrocha.backend.repositories.CategoryRepository;
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
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAllPaged(PageRequest pageRequest) {
        Page<Category> categoryList = categoryRepository.findAll(pageRequest);

        return categoryList.map(CategoryDTO::new);
    }

    @Transactional(readOnly = true)
    public CategoryDTO findById(Long id) {
        Optional<Category> categoryObj = categoryRepository.findById(id);
        Category category = categoryObj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        return new CategoryDTO(category);
    }

    @Transactional
    public CategoryDTO insert(CategoryDTO categoryDTO) {
        Category categoryEntity = new Category();
        categoryEntity.setName(categoryDTO.getName());
        categoryEntity = categoryRepository.save(categoryEntity);
        return new CategoryDTO(categoryEntity);
    }

    @Transactional
    public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
        try {
            Category categoryEntity = categoryRepository.getById(id);
            categoryEntity.setName(categoryDTO.getName());
            categoryEntity = categoryRepository.save(categoryEntity);

            return new CategoryDTO(categoryEntity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found" + id);
        }
    }

    public void delete(Long id) {
        try {
            categoryRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw  new ResourceNotFoundException("Id not found "+id);
        }catch (DataIntegrityViolationException e) {
            throw new DataBaseException("Integrity violation");
        }

    }
}
