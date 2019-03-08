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
public class ReleasedProduct extends Product{
    private List<ImageInfo> upload;
}
