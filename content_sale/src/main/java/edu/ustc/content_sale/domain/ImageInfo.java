package edu.ustc.content_sale.domain;

import lombok.Data;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 20:12
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Data
public class ImageInfo {
    private String uid;
    private String thumbUrl;
    private String type;
    private String name;
    private Long size;
}
