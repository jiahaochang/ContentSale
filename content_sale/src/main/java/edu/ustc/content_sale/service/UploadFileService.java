package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.ReleasedProduct;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 15:11
 * @E-mail jhcheung@mail.ustc.edu.cn
 */


public interface UploadFileService {
    //解析并保存上传的图片文件
    void parsendSaveImage(ReleasedProduct releasedProduct);
}
