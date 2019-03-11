package edu.ustc.content_sale.dao;

import edu.ustc.content_sale.domain.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-11 10:09
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public interface BillDao extends JpaRepository<Bill, Long> {
    Boolean existsByImageName(String imgName);
    Bill findByImageName(String imgName);
}
