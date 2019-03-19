package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.Bill;
import edu.ustc.content_sale.domain.Commodity;
import edu.ustc.content_sale.domain.ProductVO;
import edu.ustc.content_sale.domain.ShoppingCart;

import java.util.List;
import java.util.PrimitiveIterator;

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
    //获取用户未购买的商品信息列表
    List<ProductVO> getUnpurchasedProducts();
    //根据imgName获取Commodity的id
    Long getIdByImgName(String imgName);
    //根据id删除商品
    Boolean deleteCommodityById(Long id);
    //从购物车中根据id删除商品
    Boolean deleteProductFromShoppingCart(Long id);
    //根据购物车中商品的id更改购物车中商品的数量
    Boolean changeProductNumInShoppingCart(Long id, Integer count);
    //根据商品id获取购买时的原价
    Double getOriginPriceByProductId(Long id);
}
