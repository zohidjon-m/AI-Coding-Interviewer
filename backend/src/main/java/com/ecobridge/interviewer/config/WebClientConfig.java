package com.ecobridge.interviewer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    WebClient openAiWebClient(
            @Value("${openai.api.base-url}") String baseUrl,
            @Value("${openai.api.key}")      String apiKey) {

        return WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    @Bean
    WebClient judge0WebClient(
            @Value("${judge0.api.base-url}") String baseUrl,
            @Value("${judge0.api.rapid-key}") String rapidKey) {

        return WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("X-RapidAPI-Key", rapidKey)   // or Authorization if self-hosted
                .build();
    }
}
