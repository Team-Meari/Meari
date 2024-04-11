package Team.Meari.Meari.global.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("https://shoutmeari.site:8080", "http://shoutmeari.site:8080", "http://meari-s3-bucket.s3-website.ap-northeast-2.amazonaws.com/","https://fe--shoutmeari.netlify.app/","https://shoutmeari.netlify.app/api","https://shoutmeari.netlify.app/", "http://shoutmeari.netlify.app/", "http://localhost:8080","http://localhost:63342", "http://www.localhost:3000", "http://localhost:3000", "http://15.165.207.71:8080","https://fa44-180-68-125-6.ngrok-free.app")
                .allowedMethods("*")
                .allowedHeaders("*")
//                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .maxAge(3600)
                .allowCredentials(true)
                .allowedHeaders("*")
                .allowedOriginPatterns("*")
                .exposedHeaders("*");
    }
}
