package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.ReleasedProductByType1;
import edu.ustc.content_sale.domain.ReleasedProductByType2;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 15:11
 * @E-mail jhcheung@mail.ustc.edu.cn
 */


public interface UploadFileService {
    //解析并保存上传的图片文件
    Boolean parseAndSaveImage(ReleasedProductByType2 releasedProduct);
    //保存商品信息到数据库
    Boolean saveCommodityToDB(ReleasedProductByType2 releasedProduct);
    //通过远程url的方式上传图片
    Boolean saveCommodityToDBFromUrl(ReleasedProductByType1 releasedProductByType1) throws Exception;
    //当修改信息重新上传图片时候，删除原来的图片
    Boolean deleteOriginPic(Object releasedProduct);
}
