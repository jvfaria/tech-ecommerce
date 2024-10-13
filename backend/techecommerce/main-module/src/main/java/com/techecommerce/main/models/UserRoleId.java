package com.techecommerce.main.models;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserRoleId implements Serializable {
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "role_id")
    private Long roleId;
}
