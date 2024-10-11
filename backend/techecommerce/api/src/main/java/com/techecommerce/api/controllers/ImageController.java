package com.techecommerce.api.controllers;

import com.techecommerce.main.exceptions.FileStorageException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.UploadFileResponse;
import com.techecommerce.main.services.FileStorageService;
import com.techecommerce.main.services.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/images")
@Api(tags = "Images")
@Slf4j
public class ImageController {
    private final ImageService imageService;

    @Autowired
    FileStorageService fileStorageService;

    @ApiOperation("Upload product image")
    @PostMapping("/product/upload/{productId}")
    public ResponseEntity<UploadFileResponse> uploadUserAvatar(@PathVariable String productId, @RequestParam("file") MultipartFile imageFile) throws FileStorageException, ResourceNotFoundException {
        String fileName = fileStorageService.storeFile(imageFile);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/images/products/downloadFile/")
                .path(fileName)
                .toUriString();

        imageService.addProductImage(productId, fileDownloadUri, fileName);
        return new ResponseEntity<>(new UploadFileResponse(fileName, fileDownloadUri,
                imageFile.getContentType(), imageFile.getSize()), HttpStatus.CREATED);
    }

    @ApiOperation("Get file user avatar")
    @GetMapping("products/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadProductImage(@PathVariable String fileName, HttpServletRequest request) throws FileStorageException {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
