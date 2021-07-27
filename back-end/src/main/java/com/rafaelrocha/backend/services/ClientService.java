package com.rafaelrocha.backend.services;

import com.rafaelrocha.backend.dto.CategoryDTO;
import com.rafaelrocha.backend.dto.ClientDTO;
import com.rafaelrocha.backend.dto.ProductDTO;
import com.rafaelrocha.backend.entities.Category;
import com.rafaelrocha.backend.entities.Client;
import com.rafaelrocha.backend.entities.Product;
import com.rafaelrocha.backend.repositories.ClientRepository;
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
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Transactional(readOnly = true)
    public Page<ClientDTO> findAllPaged(PageRequest pageRequest) {
        Page<Client> clientList = clientRepository.findAll(pageRequest);

        return clientList.map(ClientDTO::new);
    }

    @Transactional(readOnly = true)
    public ClientDTO findById(Long id) {
        Optional<Client> clientObj = clientRepository.findById(id);
        Client client = clientObj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        return new ClientDTO(client);
    }

    @Transactional
    public ClientDTO insert(ClientDTO clientDTO) {
        Client clientEntity = new Client();
        copyDtoToEntity(clientDTO, clientEntity);
        clientEntity = clientRepository.save(clientEntity);
        return new ClientDTO(clientEntity);
    }

    @Transactional
    public ClientDTO update(Long id, ClientDTO clientDTO) {
        try {
            Client clientEntity = clientRepository.getOne(id);
            copyDtoToEntity(clientDTO, clientEntity);
            clientEntity = clientRepository.save(clientEntity);

            return new ClientDTO(clientEntity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found" + id);
        }
    }

    public void delete(Long id) {
        try {
            clientRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw  new ResourceNotFoundException("Id not found "+id);
        }catch (DataIntegrityViolationException e) {
            throw new DataBaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(ClientDTO clientDTO, Client clientEntity) {

        clientEntity.setName(clientDTO.getName());
        clientEntity.setCpf(clientDTO.getCpf());
        clientEntity.setIncome(clientDTO.getIncome());
        clientEntity.setBirthDate(clientDTO.getBirthDate());
        clientEntity.setChildren(clientDTO.getChildren());
    }
}
