package com.techecommerce.main.transformers;

import com.techecommerce.main.dtos.UserCreateDTO;
import com.techecommerce.main.dtos.UserDTO;
import com.techecommerce.main.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserTransformer extends AbstractTransformer<User, UserDTO> {
    protected UserTransformer() { super(User.class, UserDTO.class); }
}
