package edu.ustc.content_sale.util;


import edu.ustc.content_sale.commen.Result;
import edu.ustc.content_sale.commen.ResultEnum;

public class ResultUtil {

    /**
     * 成功且带数据
     **/
    public static Result success(Object object) {
        Result result = new Result();
        result.setCode(ResultEnum.SUCCESS.getCode());
        result.setMessage(ResultEnum.SUCCESS.getMsg());
        result.setResult(object);
        return result;
    }

    /**
     * 成功但不带数据
     **/
    public static Result success() {
        return success(null);
    }

    /**
     * 失败
     **/
    public static Result error(Integer code, String msg) {
        Result result = new Result();
        result.setCode(code);
        result.setMessage(msg);
        return result;
    }
}

