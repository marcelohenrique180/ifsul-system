package br.com.ifsul.system.api.jwt.extractor;

public interface TokenExtractor {
    public String extract(String payload);
}
