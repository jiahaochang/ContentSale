package edu.ustc.content_sale.controller;

import edu.ustc.content_sale.commen.Result;
import edu.ustc.content_sale.domain.LoginInfo;
import edu.ustc.content_sale.util.ResultUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContentSaleController {
    @PostMapping(value = "/login/post/userId/and/pwd")
    public Result checkLogin(@RequestBody LoginInfo loginInfo){
        System.out.println(loginInfo);
        return ResultUtil.success(loginInfo);
    }
}
