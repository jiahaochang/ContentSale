package edu.ustc.content_sale.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 10:40
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Data
@Entity
@Table(name = "commodity")
public class Commodity extends Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String imageName;

    @Column
    private String saleStatus;

}
