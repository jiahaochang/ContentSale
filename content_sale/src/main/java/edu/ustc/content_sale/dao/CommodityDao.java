package edu.ustc.content_sale.dao;

import edu.ustc.content_sale.domain.Commodity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 11:34
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public interface CommodityDao extends JpaRepository<Commodity, Long>{

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update commodity as c set c.sale_status =:status where c.image_name = :imgName",nativeQuery = true)
    int updateSaleStatusByImgName(@Param("status") String status, @Param("imgName") String imgName);

    List<Commodity> findBySaleStatus(String saleStatus);
}
