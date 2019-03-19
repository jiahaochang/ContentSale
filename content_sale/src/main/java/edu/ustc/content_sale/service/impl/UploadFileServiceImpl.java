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
            log.info(System.getProperty("user.dir"));
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
        //根据id是否为空来判断是第一次发布商品还是修改商品的信息
        Long productId = releasedProduct.getId();
        if (productId==null){//如果是第一次发布商品，则默认为是未出售状态
            commodity.setSaleStatus("notYetSold");
        }else {//若是修改商品信息，则出售状态保持不变
            Commodity exitCommodity = commodityDao.getOne(productId);
            commodity.setSaleStatus(exitCommodity.getSaleStatus());
            //已出售商品的数量保持不变
            commodity.setCount(exitCommodity.getCount());
        }

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
        log.info("下载图片的名字 = "+imgName);
        String savePath = System.getProperty("user.dir") + saveFilePath;
        Boolean saveRes = FileUtils.downloadOneFileByURL(imgName, releasedProductByType1.getPicUrl(), savePath);
        if (saveRes){
            Commodity commodity = new Commodity();
            BeanUtils.copyProperties(releasedProductByType1, commodity);

            Long productId = releasedProductByType1.getId();
            //根据id是否为空来判断是第一次发布商品还是修改商品的信息
            if (productId!=null){
                //若是修改商品信息，则出售状态保持不变
                Commodity exitCommodity = commodityDao.getOne(productId);
                commodity.setSaleStatus(exitCommodity.getSaleStatus());
                //已出售商品的数量保持不变
                commodity.setCount(exitCommodity.getCount());
            }else {
                //如果是第一次发布商品，则默认为是未出售状态
                commodity.setSaleStatus("notYetSold");
            }
            commodity.setImageName(imgName);
            commodityDao.save(commodity);
            return true;
        }
        return false;
    }

    @Override
    public Boolean deleteOriginPic(Object releasedProduct) {
        Long productId = null;
        if (releasedProduct instanceof ReleasedProductByType1){
            productId = ((ReleasedProductByType1) releasedProduct).getId();
        }else if (releasedProduct instanceof ReleasedProductByType2){
            productId = ((ReleasedProductByType2) releasedProduct).getId();
        }
        if (productId!=null){
            Commodity commodity = commodityDao.getOne(productId);
            String imgName = commodity.getImageName();
            log.info("删除图片的名字 = "+imgName);
            String imgPath = System.getProperty("user.dir") + saveFilePath + imgName;
            //return FileUtils.deleteFile(imgPath);
            return true;
        }
        return false;
    }

}
