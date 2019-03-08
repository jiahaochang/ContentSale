package edu.ustc.content_sale.service.impl;

import edu.ustc.content_sale.domain.ImageInfo;
import edu.ustc.content_sale.domain.ReleasedProduct;
import edu.ustc.content_sale.service.UploadFileService;
import edu.ustc.content_sale.util.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 15:14
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Slf4j
@Service
public class UploadFileServiceImpl implements UploadFileService {

    @Value("${web.upload-path}")
    private String saveFilePath; // 保存上传文件的路径

    @Override
    public void parsendSaveImage(ReleasedProduct releasedProduct) {
        List<ImageInfo> imageInfos = releasedProduct.getUpload();
        imageInfos.stream().forEach(imageInfo -> {
            String imgName = imageInfo.getUid()+ "." +(imageInfo.getType().split("/"))[1];
            String imgFileSavePath = System.getProperty("user.dir") + saveFilePath + imgName;
            //String imgFileSavePath = System.getProperty("user.dir") + saveFilePath + imageInfo.getName();
            log.info("imgFileSavePath = "+imgFileSavePath);
            FileUtils.generateImage(imageInfo.getThumbUrl(), imgFileSavePath);
        });
    }
}
