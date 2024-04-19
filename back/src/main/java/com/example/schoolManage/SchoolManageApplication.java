package com.example.schoolManage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SchoolManageApplication {
	public static void main(String[] args) {
		SpringApplication.run(SchoolManageApplication.class, args);
	}

}
