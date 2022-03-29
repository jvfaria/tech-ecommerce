package com.techecommerce.api.transformers;

import com.techecommerce.api.dtos.UserCreateDTO;
import com.techecommerce.api.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserTransformer extends AbstractTransformer<User, UserCreateDTO> {
    protected UserTransformer() { super(User.class, UserCreateDTO.class); }
}
