package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.Commodity;
import edu.ustc.content_sale.domain.ProductVO;

import java.util.List;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 20:24
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public interface ProductService {
    List<ProductVO> getSellerProductList();
    //根据商品id获得商品的详情
    ProductVO getProductDetailById(Long id);
    //将商品加入购物车
    Boolean addProductsToShoppingCart(Commodity commodity);
}
