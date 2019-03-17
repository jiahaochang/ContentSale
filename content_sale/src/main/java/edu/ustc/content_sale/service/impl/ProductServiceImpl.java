package edu.ustc.content_sale.service.impl;

import edu.ustc.content_sale.dao.BillDao;
import edu.ustc.content_sale.dao.CommodityDao;
import edu.ustc.content_sale.dao.ShoppingCartDao;
import edu.ustc.content_sale.domain.Bill;
import edu.ustc.content_sale.domain.Commodity;
import edu.ustc.content_sale.domain.ProductVO;
import edu.ustc.content_sale.domain.ShoppingCart;
import edu.ustc.content_sale.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 20:24
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Slf4j
@Service
public class ProductServiceImpl implements ProductService, InitializingBean {

    @Value("${service_address}")
    private String serviceAddress;

    @Value("${web.upload-path}")
    private String saveFilePath; // 保存上传文件的路径


    @Autowired
    CommodityDao commodityDao;
    @Autowired
    ShoppingCartDao shoppingCartDao;
    @Autowired
    BillDao billDao;

    @Override
    public void afterPropertiesSet() throws Exception {
        saveFilePath = System.getProperty("user.dir")+saveFilePath;
    }

    @Override
    public List<ProductVO> getSellerProductList() {
        List<ProductVO> productVOList = new ArrayList<>();
        List<Commodity> commodities = commodityDao.findAll();
        commodities.stream().forEach(commodity -> {
            productVOList.add(convertCommodityToProductVO(commodity));
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
        Commodity commodityInfo = commodityDao.getOne(id);
        String imgName = commodityInfo.getImageName();
        //先检查购物车中是否存在此商品
        boolean exist = shoppingCartDao.existsByImageName(imgName);
        Long shoppingCardInfoId = null;
        //如果已经存在，则只变更购物车中商品的数量
        if (exist){
            ShoppingCart existInfo = shoppingCartDao.findByImageName(imgName);
            int tempNum = existInfo.getCount();
            count += tempNum;
            shoppingCardInfoId = existInfo.getId();
        }
        BeanUtils.copyProperties(commodityInfo, shoppingCart);
        shoppingCart.setCount(count);
        shoppingCart.setId(shoppingCardInfoId);
        //System.out.println(shoppingCardInfoId);
        shoppingCartDao.save(shoppingCart);
        return true;
    }

    @Override
    public List<ShoppingCart> getShoppingCartList() {
        List<ShoppingCart> shoppingCartList = shoppingCartDao.findAll();
        return shoppingCartList;
    }

    @Override
    public Boolean buy() {
        List<ShoppingCart> shoppingCartList = shoppingCartDao.findAll();
        shoppingCartList.stream().forEach(shoppingCart -> {
            String imgName = shoppingCart.getImageName();
            boolean existInBill = billDao.existsByImageName(imgName);
            //如果已经购买过该商品，则更新账单里的 购买数量，购买总价 和 购买时间字段
            if (existInBill){
                Bill bill = billDao.findByImageName(imgName);
                Integer count = bill.getCount()+shoppingCart.getCount();
                double totalPrice = count * shoppingCart.getPrice();
                bill.setBuyTime(new Date());
                bill.setCount(count);
                bill.setTotalPrice((long) totalPrice);
                billDao.save(bill);
            }else {
                //如果没有购买过该商品，则加入账单列表
                Bill newBill = new Bill();
                BeanUtils.copyProperties(shoppingCart, newBill);
                newBill.setId(null);
                newBill.setTotalPrice((long) (shoppingCart.getCount() * shoppingCart.getPrice()));
                newBill.setBuyTime(new Date());
                billDao.save(newBill);
            }
            //把商品信息更改为已出售状态
            commodityDao.updateSaleStatusByImgName("alreadySold",imgName);
        });
        shoppingCartDao.deleteAll();
        return true;
    }

    @Override
    public List<Bill> getBillList() {
        List<Bill> bills = billDao.findAll();
        bills.stream().forEach(bill -> {
            bill.setImageName(serviceAddress + bill.getImageName());
        });
        return bills;
    }

    @Override
    public List<ProductVO> getUnpurchasedProducts() {
        List<Commodity> commodities = commodityDao.findBySaleStatus("notYetSold");
        List<ProductVO> productVOS = new ArrayList<>();
        commodities.stream().forEach(commodity -> {
            productVOS.add(convertCommodityToProductVO(commodity));
        });
        return productVOS;
    }

    @Override
    public Long getIdByImgName(String imgUrl) {
        String arr[] = imgUrl.split("/");
        //System.out.println(arr[arr.length-1]);
        String imgName = arr[arr.length-1];
        Commodity commodity = commodityDao.findByImageName(imgName);
        return commodity.getId();
    }

    public ProductVO convertCommodityToProductVO(Commodity commodity){
        ProductVO productVO = new ProductVO();
        BeanUtils.copyProperties(commodity, productVO);
        productVO.setImgUrl(serviceAddress + commodity.getImageName());
        return productVO;
    }

}
