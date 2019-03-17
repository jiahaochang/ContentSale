package edu.ustc.content_sale.dao;

import edu.ustc.content_sale.domain.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-10 14:37
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public interface ShoppingCartDao extends JpaRepository<ShoppingCart, Long> {

    Boolean existsByImageName(String imgName);

    ShoppingCart findByImageName(String imgName);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update shopping_cart as s set s.count =:count where s.id = :id",nativeQuery = true)
    int updateCountById(@Param("count") Integer count, @Param("id") Long id);

}
