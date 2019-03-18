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

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update commodity as c set c.sale_status =:status where c.id = :id",nativeQuery = true)
    int updateSaleStatusById(@Param("status") String status, @Param("id") Long id);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update commodity as c set c.count =:num where c.id = :id",nativeQuery = true)
    int updateCountById(@Param("num") Integer num, @Param("id") Long id);

    List<Commodity> findBySaleStatus(String saleStatus);

    Commodity findByImageName(String imgName);
}
