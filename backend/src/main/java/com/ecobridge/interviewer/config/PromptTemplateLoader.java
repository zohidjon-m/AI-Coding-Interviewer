package com.ecobridge.interviewer.config;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class PromptTemplateLoader {

    private final ResourceLoader loader;

    /**
     * Loads a UTF‑8 template from classpath and substitutes ${key} placeholders.
     */

    @SneakyThrows
    public String loadAndFill(String location, Map<String, String> vars) {
        var res   = loader.getResource(location);
        var bytes = res.getInputStream().readAllBytes();
        var tmpl  = new String(bytes, StandardCharsets.UTF_8);

        // simple placeholder replacement ${key}
        for (var e : vars.entrySet()) {
            tmpl = tmpl.replace("${" + e.getKey() + "}", e.getValue());
        }
        return tmpl;
    }
}
