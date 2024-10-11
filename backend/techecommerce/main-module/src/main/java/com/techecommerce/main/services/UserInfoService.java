package com.techecommerce.main.services;

import com.techecommerce.main.exceptions.ResourceNotFoundException;
import com.techecommerce.main.models.UserInfo;
import com.techecommerce.main.repositories.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
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

    public UserInfo findByCpf(String cpf) {
        return userInfoRepository
                .findByCpf(cpf).orElseThrow(() -> new EntityNotFoundException("User info not found by CPF"));
    }
}
