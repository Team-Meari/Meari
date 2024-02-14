package Team.Meari.Meari.global.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080","http://localhost:63342", "http://www.localhost:3000", "http://localhost:3000")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .maxAge(3600)
                .allowCredentials(true)
                .allowedHeaders("*")
                .allowedOriginPatterns()
                .exposedHeaders("*");
    }
}
