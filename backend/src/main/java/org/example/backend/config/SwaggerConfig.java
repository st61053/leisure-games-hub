package org.example.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Leisure Games Hub API",
                version = "1.0",
                description = "Dokumentace k REST API pro Leisure Games Hub",
                contact = @Contact(
                        name = "Matěj Varga",
                        email = "varga.matej@seznam.cz"
                ),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"
                )
        )
)
public class SwaggerConfig {
}

