package edu.ustc.content_sale.dao;

import edu.ustc.content_sale.domain.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-10 14:37
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public interface ShoppingCartDao extends JpaRepository<ShoppingCart, Long> {
    Boolean existsByImageName(String imgName);
    ShoppingCart findByImageName(String imgName);

}
