package edu.ustc.content_sale.config;

import org.hibernate.dialect.MySQL5InnoDBDialect;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-17 15:43
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

public class MysqlConfig extends MySQL5InnoDBDialect {
    @Override
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci";
    }
}
