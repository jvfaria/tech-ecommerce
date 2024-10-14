package com.techecommerce.main.transformers;

import com.techecommerce.main.dto.UserDTO;
import com.techecommerce.main.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserTransformer extends AbstractTransformer<User, UserDTO> {
    protected UserTransformer() { super(User.class, UserDTO.class); }
}
