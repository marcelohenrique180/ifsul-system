package br.com.ifsul.api.jwt.extractor;

public interface TokenExtractor {
    public String extract(String payload);
}
