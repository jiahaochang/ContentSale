package edu.ustc.content_sale.service;

import edu.ustc.content_sale.domain.ReleasedProductByType2;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-07 15:11
 * @E-mail jhcheung@mail.ustc.edu.cn
 */


public interface UploadFileService {
    //解析并保存上传的图片文件
    Boolean parsendSaveImage(ReleasedProductByType2 releasedProduct);
    //将上传的商品保存到数据库
    Boolean saveCommodityToDB(ReleasedProductByType2 releasedProduct);
}
