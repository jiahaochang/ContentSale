package edu.ustc.content_sale.controller;

import com.alibaba.fastjson.JSONObject;
import com.nimbusds.jose.JOSEException;
import edu.ustc.content_sale.common.Result;
import edu.ustc.content_sale.domain.*;
import edu.ustc.content_sale.service.CheckLoginService;
import edu.ustc.content_sale.service.ProductService;
import edu.ustc.content_sale.service.UploadFileService;
import edu.ustc.content_sale.util.ResultUtil;
import edu.ustc.content_sale.util.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 11:13
 * Description
 */

@Slf4j
@RestController
@RequestMapping("/login")
public class ContentSaleController {

    @Autowired
    private CheckLoginService checkLoginService;
    @Autowired
    private UploadFileService uploadFileService;
    @Autowired
    private ProductService productService;

    //验证登录页面发过来的账号密码是否正确，返回token
    @PostMapping(value = "/post/userId/and/pwd")
    public Result checkLogin(@RequestBody LoginInfo loginInfo) throws JOSEException {
        log.info(loginInfo.toString());
        if (!checkLoginService.verifyAccountAndPassword(loginInfo)){
            return ResultUtil.error(401,"账号或密码错误");
        }
        Map<String, Object> tokenMap = checkLoginService.checkLogin(loginInfo);
        String authToken = TokenUtils.creatToken(tokenMap);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("authToken", authToken);
        return ResultUtil.success(resultMap);
    }

    //根据前端发过来的token验证登录状态
    @GetMapping(value = "/get/loginStatus")
    public Result getLoginStatus(@RequestHeader(name = "authToken") String authToken){
        log.info("authToken = "+authToken);
        Map<String, Object> loginStatus = checkLoginService.validToken(authToken);
        System.out.println(loginStatus);
        return ResultUtil.success(loginStatus);
    }

    //接收并保存发布商品的信息
    @RequestMapping(value="/post/upload/info", method=RequestMethod.POST )
    public @ResponseBody Result releaseProduct(@RequestBody ReleasedProductByType2 releasedProduct){
        uploadFileService.parseAndSaveImage(releasedProduct);
        Boolean saveResult = uploadFileService.saveCommodityToDB(releasedProduct);
        if (saveResult){
            return ResultUtil.success();
        }
        return ResultUtil.error(304, "发布失败");
    }

    //通过上传url的方式获取远程图片
    @PostMapping(value = "/post/upload/picurl")
    public Result releaseProductByUrl(@RequestBody ReleasedProductByType1 releasedProductByType1) throws Exception {
        Boolean saveRes = uploadFileService.saveCommodityToDBFromUrl(releasedProductByType1);
        if (saveRes){
            return ResultUtil.success();
        }
        return ResultUtil.error(304, "发布失败");
    }

    //seller登录获得商品信息列表
    @GetMapping(value = "/cards")
    public Result getProductVOList(){
        List<ProductVO> productVOList = productService.getSellerProductList();
        return ResultUtil.success(productVOList);
    }

    //根据商品id获取商品详情
    @GetMapping(value = "/detail/{id}")
    public Result getProductDetail(@PathVariable(value = "id") Long id){
        ProductVO productVO = productService.getProductDetailById(id);
        if (productVO==null){
            return ResultUtil.error(500, "该商品不存在");
        }
        return ResultUtil.success(productVO);
    }

    //通过上传图片的方式修改商品信息
    @PostMapping(value = "/post/modified/info")
    public Result modifyProductInfoByType1(@RequestBody ReleasedProductByType2 releasedProductByType2){
        //保存新上传的图片
        Boolean uploadPicRes = uploadFileService.parseAndSaveImage(releasedProductByType2);
        //删除原来的图片
        Boolean deleteRes = uploadFileService.deleteOriginPic(releasedProductByType2);
        //更新数据库中product的信息
        Boolean saveResult = uploadFileService.saveCommodityToDB(releasedProductByType2);
        if (saveResult && deleteRes && uploadPicRes){
            return ResultUtil.success();
        }
        return ResultUtil.error(304, "发布失败");
    }

    //通过上传图片url的方式修改商品信息
    @PostMapping(value = "/post/modified/type1")
    public Result modifyProductByUrl(@RequestBody ReleasedProductByType1 releasedProductByType1) throws Exception {
        //删除原来的图片
        Boolean deleteRes = uploadFileService.deleteOriginPic(releasedProductByType1);
        Boolean saveRes = uploadFileService.saveCommodityToDBFromUrl(releasedProductByType1);
        if (saveRes){
            return ResultUtil.success();
        }
        return ResultUtil.error(304, "发布失败");
    }

    //添加商品到购物车
    @PostMapping(value = "/add/to/shopping/cart")
    public Result addProductToCart(@RequestBody Commodity commodity) {
        boolean res = productService.addProductsToShoppingCart(commodity);
        if (!res){
            return ResultUtil.error(304, "添加购物车失败");
        }
        return ResultUtil.success();
    }

    @GetMapping(value = "/shoppingCarts")
    public Result getShoppingCarts(){
        List<ShoppingCart> shoppingCartList = productService.getShoppingCartList();
        return ResultUtil.success(shoppingCartList);
    }

    @GetMapping(value = "/buy")
    public Result buyProducts(){
        boolean buyRes = productService.buy();
        if (buyRes){
            return ResultUtil.success();
        }
        return ResultUtil.error(304, "购买失败");
    }

    @GetMapping(value = "/bills")
    public Result getBills(){
        List<Bill> billList = productService.getBillList();
        return ResultUtil.success(billList);
    }

    //获取用户未该买的商品列表信息
    @GetMapping(value = "/unpurchased")
    public Result getUnpurchasedProducts(){
        List<ProductVO> productVOList = productService.getUnpurchasedProducts();
        return ResultUtil.success(productVOList);
    }

    //发布者删除未出售的商品
    @DeleteMapping(value = "/cards/{id}")
    public Result deleteProduce(@PathVariable(value = "id") Long id){
        log.info("要删除商品的id"+id);
        boolean res = productService.deleteCommodityById(id);
        if (!res){
            return ResultUtil.error(500,"删除商品信息失败");
        }
        return ResultUtil.success();
    }

    //根据imgName获取Commodity中的商品id
    @PostMapping(value = "/post/id/get/imgName")
    public Result getCommodityIdByImageName(@RequestBody JSONObject jsonObject){
        String imgUrl = jsonObject.getString("imgUrl");
        Long id = productService.getIdByImgName(imgUrl);
        Map<String,Object> res = new HashMap<>();
        res.put("id", id);
        return ResultUtil.success(res);
    }

}
