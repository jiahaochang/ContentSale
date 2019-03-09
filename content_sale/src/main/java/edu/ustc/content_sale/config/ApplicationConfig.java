package edu.ustc.content_sale.config;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @Author: Jiahao.Zhang
 * @Date: 2019-03-08 22:12
 * @E-mail jhcheung@mail.ustc.edu.cn
 */

@Configuration
public class ApplicationConfig extends WebMvcConfigurerAdapter implements InitializingBean {

    @Value("${web.upload-path}")
    private String saveFilePath; // 保存上传文件的路径

    @Override
    public void afterPropertiesSet() throws Exception {
        saveFilePath = System.getProperty("user.dir")+saveFilePath;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        /*
         * 说明：增加虚拟路径(经过本人测试：在此处配置的虚拟路径，用springboot内置的tomcat时有效，
         * 用外部的tomcat也有效;所以用到外部的tomcat时不需在tomcat/config下的相应文件配置虚拟路径了,阿里云linux也没问题)
         */
        registry.addResourceHandler("/imgs/**").addResourceLocations("file:"+saveFilePath);

        super.addResourceHandlers(registry);
    }


}
