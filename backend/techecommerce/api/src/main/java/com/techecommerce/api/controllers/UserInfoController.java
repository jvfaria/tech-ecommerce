package com.techecommerce.api.controllers;

import com.techecommerce.main.exceptions.FileStorageException;
import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.UploadFileResponse;
import com.techecommerce.main.services.FileStorageService;
import com.techecommerce.main.services.UserInfoService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
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

import java.io.IOException;

@RestController
@RequestMapping("v1/user-info")
@RequiredArgsConstructor
@Slf4j
public class UserInfoController {
    private final UserInfoService userInfoService;
    @Autowired
    FileStorageService fileStorageService;

    @Operation(summary = "Upload user avatar")
    @PostMapping("/avatar/upload")
    public ResponseEntity<UploadFileResponse> uploadUserAvatar(@RequestParam("file") MultipartFile imageFile) throws FileStorageException {
        String fileName = fileStorageService.storeFile(imageFile);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/v1/user-info/downloadFile/")
                .path(fileName)
                .toUriString();

        return new ResponseEntity<>(new UploadFileResponse(fileName, fileDownloadUri,
                imageFile.getContentType(), imageFile.getSize()), HttpStatus.CREATED);
    }

    @Operation(summary = "Get file user avatar")
    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadAvatar(@PathVariable String fileName, HttpServletRequest request) throws FileStorageException {
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

    @Operation(summary = "Get user avatar filename")
    @GetMapping("/avatar/{userId}")
    public ResponseEntity<String> getAvatarFilename(@PathVariable String userId) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(userInfoService.getUserAvatarFilenameByUserId(userId));
    }
}
