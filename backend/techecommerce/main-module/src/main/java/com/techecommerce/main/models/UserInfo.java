package com.techecommerce.main.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo extends GenericEntity {
    @Column
    private String avatar;

    @Column
    private String name;

    @Column
    private String cpf;

    @OneToOne(mappedBy = "userInfo")
    @JsonBackReference
    User user;
}
