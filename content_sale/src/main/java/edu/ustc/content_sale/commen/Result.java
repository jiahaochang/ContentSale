package edu.ustc.content_sale.commen;

import lombok.Data;

@Data
public class Result<T> {
    private Integer code;
    private String message;
    private T result;
}
