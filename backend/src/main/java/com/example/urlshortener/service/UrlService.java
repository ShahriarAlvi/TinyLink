package com.example.urlshortener.service;

import com.example.urlshortener.dto.UrlRequest;
import com.example.urlshortener.dto.UrlResponse;
import com.example.urlshortener.model.UrlMapping;
import com.example.urlshortener.repository.UrlRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.random.RandomGenerator;

@Service
public class UrlService {

    private final UrlRepository urlRepository;

    private static final String BASE_URL = "http://localhost:8080/";

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public UrlResponse createShortUrl(UrlRequest request) {
        Optional<UrlMapping> existing = urlRepository.findByOriginalUrl(request.getOriginalUrl());
        if (existing.isPresent()) {
            UrlMapping existingMapping = existing.get();
            return new UrlResponse(existingMapping.getShortCode(), BASE_URL + existingMapping.getShortCode());
        }

        String shortCode = generateUniqueShortCode();

        UrlMapping urlMapping = UrlMapping.builder()
                .shortCode(shortCode)
                .originalUrl(request.getOriginalUrl())
                .createdAt(LocalDateTime.now())
                .build();

        urlRepository.save(urlMapping);

        return new UrlResponse(shortCode, BASE_URL + shortCode);

    }

    public String getOriginalUrl(String code) {
        UrlMapping mapping = urlRepository.findByShortCode(code).orElseThrow(() -> new RuntimeException("URL not found for code: " + code));

        return mapping.getOriginalUrl();
    }

    private String generateUniqueShortCode() {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder shortCode;

        do {
            shortCode = new StringBuilder();
            for (int i = 0; i < 8; i++) {
                shortCode.append(characters.charAt(random.nextInt(characters.length())));
            }
        } while (urlRepository.findByShortCode(shortCode.toString()).isPresent());
        return shortCode.toString();
    }
}
