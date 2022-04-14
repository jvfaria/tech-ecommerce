package com.techecommerce.api.controllers;

import com.techecommerce.api.exceptions.FileStorageException;
import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.models.UploadFileResponse;
import com.techecommerce.api.services.FileStorageService;
import com.techecommerce.api.services.UserInfoService;
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
import java.net.URI;

@Api(tags = "User info")
@RestController
@RequestMapping("v1/api/user-info")
@RequiredArgsConstructor
@Slf4j
public class UserInfoController {
    private final UserInfoService userInfoService;
    @Autowired
    FileStorageService fileStorageService;

    @ApiOperation("Upload user avatar")
    @PostMapping("/avatar/upload")
    public ResponseEntity<UploadFileResponse> uploadUserAvatar(@RequestParam("file") MultipartFile imageFile) throws FileStorageException {
        String fileName = fileStorageService.storeFile(imageFile);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/v1/api/user-info/downloadFile/")
                .path(fileName)
                .toUriString();

        return new ResponseEntity<>(new UploadFileResponse(fileName, fileDownloadUri,
                imageFile.getContentType(), imageFile.getSize()), HttpStatus.CREATED);
    }

    @ApiOperation("Get file user avatar")
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

    @ApiOperation("Get user avatar filename")
    @GetMapping("/avatar/{userId}")
    public ResponseEntity<String> getAvatarFilename(@PathVariable String userId) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(userInfoService.getUserAvatarFilenameByUserId(userId));
    }
}
