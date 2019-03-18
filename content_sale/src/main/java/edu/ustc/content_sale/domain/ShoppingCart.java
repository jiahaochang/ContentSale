package edu.ustc.content_sale.domain;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-10 14:26
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Data
@DynamicUpdate
@Entity
@Table(name = "shopping_cart")
public class ShoppingCart extends Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String imageName;

    @Column
    private Long commodityId;
}
