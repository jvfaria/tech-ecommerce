package com.techecommerce.api.services;

import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.models.Image;
import com.techecommerce.api.repositories.ImageRepository;
import com.techecommerce.api.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;

    public void addProductImage(String productId, String fileDownloadUri, String fileName) throws ResourceNotFoundException {
        var product = productRepository.findById(UUID.fromString(productId))
               .orElseThrow(() -> new ResourceNotFoundException("Product ID not found: " + productId));
        var image = Image.builder().product(product).name(fileName).filepath(fileDownloadUri).build();
        product.setImage(image);
        productRepository.save(product);
    }

}
