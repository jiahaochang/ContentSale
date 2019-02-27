package edu.ustc.content_sale.commen;

import lombok.Data;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 11:13
 * Description
 */
@Data
public class Result<T> {
    private Integer code;
    private String message;
    private T result;
}
