package edu.ustc.content_sale.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 15:35
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@NoArgsConstructor
@Data
public class ReleasedProductByType2 extends Product{
    private Long id;
    private List<ImageInfo> upload;
}
