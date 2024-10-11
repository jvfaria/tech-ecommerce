package com.techecommerce.main.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Order extends GenericEntity {
    @Column(nullable = false)
    private Long orderNumber;

    @ManyToOne // Each order is associated with one customer
    @JoinColumn(name = "user_info", referencedColumnName = "id", nullable = false)
    private UserInfo customer;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @ManyToMany
    @JoinTable(name = "order_products", joinColumns = {
                    @JoinColumn(name = "order_id")
            }, inverseJoinColumns = {
                    @JoinColumn(name = "product_id")
            })
    private Set<Product> products = new HashSet<>();
}
