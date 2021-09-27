package com.rafaelrocha.backend.tests.web;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rafaelrocha.backend.dto.ProductDTO;
import com.rafaelrocha.backend.services.ProductService;
import com.rafaelrocha.backend.services.exceptions.DataBaseException;
import com.rafaelrocha.backend.services.exceptions.ResourceNotFoundException;
import com.rafaelrocha.backend.tests.factory.ProductFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${security.oauth2.client.client-id}")
    private String clientId;

    @Value("${security.oauth2.client.client-secret}")
    private String clientSecret;

    private Long existingId;
    private Long nonExistingId;
    private ProductDTO newProductDTO;
    private ProductDTO existingProductDTO;
    private Long dependentId;
    private PageImpl<ProductDTO> page;

    private String operationUsername;
    private String operationPassword;

    @BeforeEach
    void setUp() throws Exception {
        operationUsername="alex@gmail.com";
        operationPassword="123456";

        existingId = 1L;
        nonExistingId = 2L;
        dependentId = 3L;

        newProductDTO = ProductFactory.createProductDTO(null);
        existingProductDTO = ProductFactory.createProductDTO(existingId);

        page = new PageImpl<>(List.of(existingProductDTO));

        when(productService.findById(existingId)).thenReturn(existingProductDTO);
        when(productService.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        when(productService.findAllPaged(any(), anyString(), any())).thenReturn(page);

        when(productService.insert(any())).thenReturn(existingProductDTO);

        when(productService.update(eq(existingId), any())).thenReturn(existingProductDTO);
        when(productService.update(eq(nonExistingId), any())).thenThrow(ResourceNotFoundException.class);

        doNothing().when(productService).delete(existingId);
        doThrow(ResourceNotFoundException.class).when(productService).delete(nonExistingId);
        doThrow(DataBaseException.class).when(productService).delete(dependentId);
    }

    @Test
    public void deleteShouldReturnNotFoundWhenIdDoesNotExistis() throws Exception {
        String accessToken = obtainAccessToken(operationUsername, operationPassword);

        ResultActions resultActions =
                mockMvc.perform(delete("/products/{id}", nonExistingId)
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isNotFound());

    }

    @Test
    public void deleteShouldReturnNoContentWhenExistis() throws Exception {
        String accessToken = obtainAccessToken(operationUsername, operationPassword);

        ResultActions resultActions =
                mockMvc.perform(delete("/products/{id}", existingId)
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isNoContent());

    }

    @Test
    public void insertShouldReturnUnprocessableEntityWhenNegativePrice() throws Exception {
        String accessToken = obtainAccessToken(operationUsername, operationPassword);

        newProductDTO.setPrice(-10.0);
        String jsonBody = objectMapper.writeValueAsString(newProductDTO);

        ResultActions resultActions =
                mockMvc.perform(post("/products")
                        .header("Authorization", "Bearer " + accessToken)
                        .content(jsonBody)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isUnprocessableEntity());
    }

    @Test
    public void insertShouldReturnCreatedProductDTOWhenValidData() throws Exception {
        String accessToken = obtainAccessToken(operationUsername, operationPassword);

        String jsonBody = objectMapper.writeValueAsString(newProductDTO);

        ResultActions resultActions =
                mockMvc.perform(post("/products")
                        .header("Authorization", "Bearer " + accessToken)
                        .content(jsonBody)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isCreated());
        resultActions.andExpect(jsonPath("$.id").exists());
    }

    @Test
    public void updateShouldReturnProductDTOWhenIdtExist() throws Exception {
        String accessToken = obtainAccessToken(operationUsername, operationPassword);

        String jsonBody = objectMapper.writeValueAsString(newProductDTO);

        String expectedName = newProductDTO.getName();
        Double expectedPrice = newProductDTO.getPrice();

        ResultActions resultActions =
                mockMvc.perform(put("/products/{id}", existingId)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(jsonBody)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.id").exists());
        resultActions.andExpect(jsonPath("$.id").value(existingId));
        resultActions.andExpect(jsonPath("$.name").value(expectedName));
        resultActions.andExpect(jsonPath("$.price").value(expectedPrice));

    }

    @Test
    public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
        String accessToken = obtainAccessToken(operationUsername, operationPassword);

        String jsonBody = objectMapper.writeValueAsString(newProductDTO);
        ResultActions resultActions =
                mockMvc.perform(put("/products/{id}", nonExistingId)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(jsonBody)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    public void findAllShouldReturnPage() throws Exception {
        ResultActions resultActions =
                mockMvc.perform(get("/products", existingId)
                        .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.content").exists());
    }

    @Test
    public void findByIdShouldReturnProductWhenIdExists() throws Exception {
        ResultActions resultActions =
            mockMvc.perform(get("/products/{id}", existingId)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.id").exists());
        resultActions.andExpect(jsonPath("$.id").value(existingId));
    }

    @Test
    public void findByIdShouldReturnProductWhenIdDoesNotExist() throws Exception {
        ResultActions resultActions =
                mockMvc.perform(get("/products/{id}", nonExistingId)
                        .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isNotFound());
    }

    private String obtainAccessToken(String username, String password) throws Exception {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("client_id", clientId);
        params.add("username", username);
        params.add("password", password);

        ResultActions result
                = mockMvc.perform(post("/oauth/token")
                        .params(params)
                        .with(httpBasic(clientId, clientSecret))
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultString = result.andReturn().getResponse().getContentAsString();

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resultString).get("access_token").toString();
    }
}
