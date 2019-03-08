package edu.ustc.content_sale.dao;

import edu.ustc.content_sale.domain.Commodity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 11:34
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public interface CommodityDao extends JpaRepository<Commodity, Long>{

}
