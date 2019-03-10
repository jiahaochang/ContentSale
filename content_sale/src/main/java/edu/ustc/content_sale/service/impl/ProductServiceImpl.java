package edu.ustc.content_sale.service.impl;

import edu.ustc.content_sale.dao.CommodityDao;
import edu.ustc.content_sale.dao.ShoppingCartDao;
import edu.ustc.content_sale.domain.Commodity;
import edu.ustc.content_sale.domain.ProductVO;
import edu.ustc.content_sale.domain.ShoppingCart;
import edu.ustc.content_sale.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 20:24
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    @Value("${service_address}")
    private String serviceAddress;

    @Autowired
    CommodityDao commodityDao;
    @Autowired
    ShoppingCartDao shoppingCartDao;

    @Override
    public List<ProductVO> getSellerProductList() {
        List<ProductVO> productVOList = new ArrayList<>();
        List<Commodity> commodities = commodityDao.findAll();
        commodities.stream().forEach(commodity -> {
            ProductVO productVO = new ProductVO();
            //log.info(serviceAddress + commodity.getImageName());
            BeanUtils.copyProperties(commodity, productVO);
            productVO.setImgUrl(serviceAddress + commodity.getImageName());
            productVOList.add(productVO);
        });
        return productVOList;
    }

    @Override
    public ProductVO getProductDetailById(Long id) {
        Commodity commodity = commodityDao.getOne(id);
        if (commodity==null){
            return null;
        }
        ProductVO productVO = new ProductVO();
        BeanUtils.copyProperties(commodity, productVO);
        productVO.setImgUrl(serviceAddress + commodity.getImageName());
        return productVO;
    }

    @Override
    public Boolean addProductsToShoppingCart(Commodity commodity) {
        ShoppingCart shoppingCart = new ShoppingCart();
        int count = commodity.getCount();
        Long id = commodity.getId();
        //先检查购物车中是否存在此商品
        ShoppingCart exist = shoppingCartDao.getOne(id);
        //如果已经存在，则只变更购物车中商品的数量
        if (exist!=null){
            int tempNum = exist.getCount();
            count += tempNum;
        }
        Commodity commodityInfo = commodityDao.getOne(id);
        BeanUtils.copyProperties(commodityInfo, shoppingCart);
        shoppingCart.setCount(count);
        shoppingCartDao.save(shoppingCart);
        return true;
    }
}
