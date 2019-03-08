package edu.ustc.content_sale.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 10:22
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@MappedSuperclass
@Data
public class Product {

    @Column
    private String title;

    @Column
    private String summary;

    @Column(columnDefinition = "text")
    private String text;

    @Column
    private double price;

}
