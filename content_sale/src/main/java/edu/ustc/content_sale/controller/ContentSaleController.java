package edu.ustc.content_sale.controller;

import com.nimbusds.jose.JOSEException;
import edu.ustc.content_sale.commen.Result;
import edu.ustc.content_sale.domain.LoginInfo;
import edu.ustc.content_sale.service.CheckLoginService;
import edu.ustc.content_sale.util.ResultUtil;
import edu.ustc.content_sale.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
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

    @PostMapping(value = "/login/post/userId/and/pwd")
    public Result checkLogin(@RequestBody LoginInfo loginInfo) throws JOSEException {
        System.out.println(loginInfo);
        Map<String, Object> tokenMap = checkLoginService.checkLogin(loginInfo);
        String authToken = TokenUtil.creatToken(tokenMap);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("authToken", authToken);
        return ResultUtil.success(resultMap);
    }

}
