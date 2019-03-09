package edu.ustc.content_sale.domain;

import lombok.Data;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 20:10
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Data
public class ProductVO extends Product {
    private Long id;
    private String imgUrl;
    private String saleStatus;
}
