package edu.ustc.content_sale.controller;

import com.nimbusds.jose.JOSEException;
import edu.ustc.content_sale.commen.Result;
import edu.ustc.content_sale.domain.LoginInfo;
import edu.ustc.content_sale.domain.ReleasedProduct;
import edu.ustc.content_sale.service.CheckLoginService;
import edu.ustc.content_sale.service.UploadFileService;
import edu.ustc.content_sale.util.ResultUtil;
import edu.ustc.content_sale.util.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 11:13
 * Description
 */
@RestController
public class ContentSaleController {

    @Autowired
    private CheckLoginService checkLoginService;
    @Autowired
    private UploadFileService uploadFileService;

    //验证登录页面发过来的账号密码是否正确，返回token
    @PostMapping(value = "/login/post/userId/and/pwd")
    public Result checkLogin(@RequestBody LoginInfo loginInfo) throws JOSEException {
        System.out.println(loginInfo);
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
    @GetMapping(value = "/login/get/loginStatus")
    public Result getLoginStatus(@RequestHeader(name = "authToken") String authToken){
        System.out.println("authToken= "+authToken);
        Map<String, Object> loginStatus = checkLoginService.validToken(authToken);
        System.out.println(loginStatus);
        return ResultUtil.success(loginStatus);
    }

    //接收并保存发布商品的信息
    @RequestMapping(value="/login/post/upload/info", method=RequestMethod.POST )
    public @ResponseBody Result releaseProduct(@RequestBody ReleasedProduct releasedProduct){
        uploadFileService.parsendSaveImage(releasedProduct);
        return ResultUtil.success();
    }
}
