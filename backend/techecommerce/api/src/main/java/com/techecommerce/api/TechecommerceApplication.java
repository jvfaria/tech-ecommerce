package com.techecommerce.api;

import com.techecommerce.main.config.FilesUpload.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
@EntityScan(basePackages = {"com.techecommerce.main.models"})
@ComponentScan(basePackages = {
		"com.techecommerce.orderservice", // Order service module
		"com.techecommerce.main", // Main module
		"com.techecommerce.api", // Api module
		"com.techecommerce.main.config", // Main module configurations
		"com.techecommerce.main.repositories", // Main module repositories
		"com.techecommerce.messagingcore" // Messaging core service module
})
@EnableJpaRepositories(basePackages = "com.techecommerce.main.repositories")
public class TechecommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechecommerceApplication.class, args);
	}

}
