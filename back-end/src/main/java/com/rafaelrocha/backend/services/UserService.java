package com.rafaelrocha.backend.services;

import com.rafaelrocha.backend.dto.RoleDTO;
import com.rafaelrocha.backend.dto.UserDTO;
import com.rafaelrocha.backend.dto.UserInsertDTO;
import com.rafaelrocha.backend.entities.Role;
import com.rafaelrocha.backend.entities.User;
import com.rafaelrocha.backend.repositories.RoleRepository;
import com.rafaelrocha.backend.repositories.UserRepository;
import com.rafaelrocha.backend.services.exceptions.DataBaseException;
import com.rafaelrocha.backend.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAllPaged(PageRequest pageRequest) {
        Page<User> clientList = userRepository.findAll(pageRequest);

        return clientList.map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        Optional<User> clientObj = userRepository.findById(id);
        User user = clientObj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO insert(UserInsertDTO userDTO) {
        User userEntity = new User();
        copyDtoToEntity(userDTO, userEntity);
        userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userEntity = userRepository.save(userEntity);
        return new UserDTO(userEntity);
    }

    @Transactional
    public UserDTO update(Long id, UserDTO userDTO) {
        try {
            User userEntity = userRepository.getOne(id);
            copyDtoToEntity(userDTO, userEntity);
            userEntity = userRepository.save(userEntity);

            return new UserDTO(userEntity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found" + id);
        }
    }

    public void delete(Long id) {
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw  new ResourceNotFoundException("Id not found "+id);
        }catch (DataIntegrityViolationException e) {
            throw new DataBaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(UserDTO userDTO, User userEntity) {

        userEntity.setFirstName(userDTO.getFirstName());
        userEntity.setLastName(userDTO.getLastName());
        userEntity.setEmail(userDTO.getEmail());

        userEntity.getRoles().clear();
        for(RoleDTO roleDTO :userDTO.getRoles()) {
            Role role = roleRepository.getOne(roleDTO.getId());
            userEntity.getRoles().add(role);
        }

    }
}
