package com.example.urlshortener.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UrlResponse{
    private String shortCode;
    private String shortUrl;
}
