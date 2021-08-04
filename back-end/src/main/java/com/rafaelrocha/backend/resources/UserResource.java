package com.rafaelrocha.backend.resources;

import com.rafaelrocha.backend.dto.UserDTO;
import com.rafaelrocha.backend.dto.UserInsertDTO;
import com.rafaelrocha.backend.dto.UserUpdateDTO;
import com.rafaelrocha.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction,
            @RequestParam(value = "orderBy", defaultValue = "firstName") String orderBy
    ) {

        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);

        Page<UserDTO> clientList = userService.findAllPaged(pageRequest);
        return ResponseEntity.ok().body(clientList);
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        UserDTO userDto = userService.findById(id);
        return ResponseEntity.ok().body(userDto);
    }

    @PostMapping
    public ResponseEntity<UserDTO> insert(@Valid @RequestBody UserInsertDTO userDTO) {
        UserDTO userNewDTO = userService.insert(userDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(userNewDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(userNewDTO);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO userDTO) {
        UserDTO userNewDTO = userService.update(id, userDTO);
        return ResponseEntity.ok().body(userNewDTO);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
