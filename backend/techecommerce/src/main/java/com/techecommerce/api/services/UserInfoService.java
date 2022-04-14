package com.techecommerce.api.services;

import com.techecommerce.api.exceptions.ResourceNotFoundException;
import com.techecommerce.api.repositories.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;
    public String getUserAvatarFilenameByUserId(String userId) throws ResourceNotFoundException {
        var existentUserInfo = userInfoRepository.findById(UUID.fromString(userId));
        if(!existentUserInfo.isPresent()) {
            throw new ResourceNotFoundException("Inexistent user info");
        }
        return existentUserInfo.get().getAvatar();
    }
}
