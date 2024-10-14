package com.techecommerce.api;

import com.techecommerce.main.config.FilesUpload.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
		"com.techecommerce.api",
		"com.techecommerce.main",
		"com.techecommerce.messagingcore",
		"com.techecommerce.orderservice",
})
@EnableConfigurationProperties(FileStorageProperties.class)
@EntityScan(basePackages = "com.techecommerce.main.models")
@EnableJpaRepositories(basePackages = "com.techecommerce.main.repositories")
public class TechecommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechecommerceApplication.class, args);
	}

}
