package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.LoginInfo;

import java.util.Map;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 11:13
 * Description
 */

public interface CheckLoginService {
    Map<String, Object> checkLogin(LoginInfo loginInfo);
    String validToken(String token);
}
