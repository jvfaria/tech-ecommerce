package com.techecommerce;

import com.techecommerce.api.config.FilesUpload.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
public class TechecommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechecommerceApplication.class, args);
	}

}
