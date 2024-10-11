package com.techecommerce.main.services;

import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.Image;
import com.techecommerce.main.repositories.ImageRepository;
import com.techecommerce.main.repositories.ProductRepository;
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
