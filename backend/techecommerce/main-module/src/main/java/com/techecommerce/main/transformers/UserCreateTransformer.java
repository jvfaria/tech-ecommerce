package com.techecommerce.main.transformers;

import com.techecommerce.main.dtos.UserCreateDTO;
import com.techecommerce.main.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserCreateTransformer extends AbstractTransformer<User, UserCreateDTO> {
    protected UserCreateTransformer() { super(User.class, UserCreateDTO.class); }
}
