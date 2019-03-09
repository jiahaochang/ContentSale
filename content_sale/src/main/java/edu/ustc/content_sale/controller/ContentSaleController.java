package edu.ustc.content_sale.controller;

import com.nimbusds.jose.JOSEException;
import edu.ustc.content_sale.common.Result;
import edu.ustc.content_sale.domain.LoginInfo;
import edu.ustc.content_sale.domain.ProductVO;
import edu.ustc.content_sale.domain.ReleasedProductByType1;
import edu.ustc.content_sale.domain.ReleasedProductByType2;
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

}
