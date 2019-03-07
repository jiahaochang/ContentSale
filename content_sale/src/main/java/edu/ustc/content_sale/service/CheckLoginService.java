package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.LoginInfo;

import java.util.Map;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 11:13
 * Description
 */

public interface CheckLoginService {
    //根据用户名和密码生成token
    Map<String, Object> checkLogin(LoginInfo loginInfo);
    //检验token信息是否正确，返回登录状态
    Map<String, Object> validToken(String token);
    //验证登录名和密码是否正确
    Boolean verifyAccountAndPassword(LoginInfo loginInfo);
}
