package edu.ustc.content_sale.service.impl;

import edu.ustc.content_sale.dao.CommodityDao;
import edu.ustc.content_sale.domain.Commodity;
import edu.ustc.content_sale.domain.ImageInfo;
import edu.ustc.content_sale.domain.ReleasedProductByType1;
import edu.ustc.content_sale.domain.ReleasedProductByType2;
import edu.ustc.content_sale.service.UploadFileService;
import edu.ustc.content_sale.util.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private CommodityDao commodityDao;

    @Override
    public Boolean parseAndSaveImage(ReleasedProductByType2 releasedProduct) {
        List<ImageInfo> imageInfos = releasedProduct.getUpload();
        imageInfos.stream().forEach(imageInfo -> {
            String imgName = imageInfo.getUid()+ "." +(imageInfo.getType().split("/"))[1];
            String imgFileSavePath = System.getProperty("user.dir") + saveFilePath + imgName;
            //String imgFileSavePath = System.getProperty("user.dir") + saveFilePath + imageInfo.getName();
            log.info("imgFileSavePath = "+imgFileSavePath);
            FileUtils.generateImage(imageInfo.getThumbUrl(), imgFileSavePath);
        });
        return true;
    }

    @Override
    public Boolean saveCommodityToDB(ReleasedProductByType2 releasedProduct) {
        Commodity commodity = new Commodity();
        BeanUtils.copyProperties(releasedProduct, commodity);
        ImageInfo imageInfo = releasedProduct.getUpload().get(0);
        commodity.setSaleStatus("notYetSold");
        String imgSuffix = imageInfo.getType().split("/")[1];
        commodity.setImageName(imageInfo.getUid()+"."+imgSuffix);
        commodityDao.save(commodity);
        return true;
    }

    @Override
    public Boolean saveCommodityToDBFromUrl(ReleasedProductByType1 releasedProductByType1) throws Exception {
        String[] urlSplit = releasedProductByType1.getPicUrl().split("\\.");
        String imgSuffix = urlSplit[urlSplit.length-1];
        String imgName = "rc-upload-"+System.currentTimeMillis()+"."+imgSuffix;
        String savePath = System.getProperty("user.dir") + saveFilePath;
        Boolean saveRes = FileUtils.downloadOneFileByURL(imgName, releasedProductByType1.getPicUrl(), savePath);
        if (saveRes){
            Commodity commodity = new Commodity();
            BeanUtils.copyProperties(releasedProductByType1, commodity);
            commodity.setImageName(imgName);
            commodity.setSaleStatus("notYetSold");
            commodityDao.save(commodity);
            return true;
        }
        return false;
    }
}
