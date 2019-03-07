package edu.ustc.content_sale.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 15:35
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@NoArgsConstructor
@Data
public class ReleasedProduct {
    private String title;
    private String summary;
    private String text;
    private double price;
    private List<ImageInfo> upload;

}
