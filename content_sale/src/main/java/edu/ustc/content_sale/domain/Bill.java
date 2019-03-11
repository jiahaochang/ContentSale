package edu.ustc.content_sale.domain;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-10 22:11
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Data
@DynamicUpdate
@Entity
@Table(name = "bill")
public class Bill extends Product{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Date buyTime;

    @Column
    private Long totalPrice;

    @Column
    private String imageName;

}
