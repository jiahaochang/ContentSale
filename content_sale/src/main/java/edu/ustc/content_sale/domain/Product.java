package edu.ustc.content_sale.domain;

import lombok.Data;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 10:22
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Data
public class Product {
    private String title;
    private String summary;
    private String text;
    private double price;
}
