package edu.ustc.content_sale.service.impl;

import edu.ustc.content_sale.domain.ReleasedProduct;
import edu.ustc.content_sale.service.UploadFileService;
import org.springframework.beans.factory.annotation.Value;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 15:14
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public class UploadFileServiceImpl implements UploadFileService {

    @Value("${web.upload-path}")
    private String uploadFiltPath; // 保存上传文件的路径

    @Override
    public void addResourceHandlers(ReleasedProduct releasedProduct) {

    }
}
