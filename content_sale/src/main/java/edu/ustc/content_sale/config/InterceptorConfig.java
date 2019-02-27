package edu.ustc.content_sale.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Jiahao.Zhang
 * Date 2019/2/27 13:05
 * Description
 */
@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter {

    /*public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthenticationInterceptor()).addPathPatterns("/api");
    }*/
}
