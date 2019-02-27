package edu.ustc.content_sale.service.impl;

import edu.ustc.content_sale.domain.LoginInfo;
import edu.ustc.content_sale.service.CheckLoginService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 11:13
 * Description
 */
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
            tokenMap.put("user", buyerName);
        }
        //建立载荷，这些数据根据业务，自己定义。

        //生成时间
        tokenMap.put("sta", new Date().getTime());
        //过期时间
        tokenMap.put("exp", new Date().getTime()+6);

        return tokenMap;
    }
}
