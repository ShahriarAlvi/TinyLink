package com.example.urlshortener.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

@Getter
@Setter
public class UrlRequest {

    @NotBlank(message = "URL must not be blank")
//    @Pattern(
//            regexp = "^(https?://).+",
//            message = "URL must start with http:// or https://"
//    )
    @URL(message = "Invalid URL format")
    private String originalUrl;
}
