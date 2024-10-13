package com.techecommerce.main.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "user_roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRole {
    @EmbeddedId
    private UserRoleId id;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user;

    @MapsId("roleId")
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false, referencedColumnName = "id")
    private Role role;

}
