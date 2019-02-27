package edu.ustc.content_sale.service.impl;

import com.nimbusds.jose.JOSEException;
import edu.ustc.content_sale.domain.LoginInfo;
import edu.ustc.content_sale.service.CheckLoginService;
import edu.ustc.content_sale.util.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONObject;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 11:13
 * Description
 */
@Slf4j
@Service
public class CheckLoginServiceImpl implements CheckLoginService {

    @Value("${seller.userName}")
    private String sellerName;
    @Value("${seller.password}")
    private String sellerPwd;
    @Value("${buyer.userName}")
    private String buyerName;
    @Value("${buyer.password}")
    private String buyerPwd;

    @Override
    public Map<String, Object> checkLogin(LoginInfo loginInfo) {
        Map<String, Object> tokenMap = new HashMap<>();

        if (loginInfo.getUserName().equals(sellerName) && loginInfo.getPassword().equals(sellerPwd)){
            tokenMap.put("uid", sellerName);
        }
        if (loginInfo.getUserName().equals(buyerName) && loginInfo.getPassword().equals(buyerPwd)){
            //System.out.println(loginInfo.getUserName()+"  "+buyerName);
            tokenMap.put("uid", buyerName);
        }
        //建立载荷，这些数据根据业务，自己定义。

        //生成时间
        tokenMap.put("sta", new Date().getTime());
        //过期时间
        tokenMap.put("exp", new Date().getTime()+ 30 * 60 * 1000);

        return tokenMap;
    }

    @Override
    public String validToken(String token) {
        //解析token
        try {
            if (token != null) {

                Map<String, Object> validMap = TokenUtils.valid(token);
                int i = (int) validMap.get("Result");
                if (i == 0) {
                    System.out.println("token解析成功");
                    JSONObject jsonObject = (JSONObject) validMap.get("data");
                    log.info("uid是" + jsonObject.get("uid"));
                    log.info("sta是"+jsonObject.get("sta"));
                    log.info("exp是"+jsonObject.get("exp"));
                    String uid = (String) jsonObject.get("uid");
                    if (uid.equals(buyerName)){
                        return "userLogged";
                    }else if (uid.equals(sellerName)){
                        return "sellerLoggedIn";
                    }
                } else if (i == 2) {
                    System.out.println("token已经过期");
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (JOSEException e) {
            e.printStackTrace();
        }
        return "notLoggedIn";
    }
}
