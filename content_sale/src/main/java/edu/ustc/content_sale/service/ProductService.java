package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.Bill;
import edu.ustc.content_sale.domain.Commodity;
import edu.ustc.content_sale.domain.ProductVO;
import edu.ustc.content_sale.domain.ShoppingCart;

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
    //获取购物车中的内容
    List<ShoppingCart> getShoppingCartList();
    //购买已经添加购物车的商品
    Boolean buy();
    //获取账单信息
    List<Bill> getBillList();
}
