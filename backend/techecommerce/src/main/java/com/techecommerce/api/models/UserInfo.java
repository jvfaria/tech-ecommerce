package com.techecommerce.api.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
    User user;
}
