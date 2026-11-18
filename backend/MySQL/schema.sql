CREATE DATABASE IF NOT EXISTS acervo_busca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE acervo_busca;

CREATE TABLE IF NOT EXISTS livros (
    id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    titulo VARCHAR(500) NOT NULL,
    autor VARCHAR(300) NOT NULL DEFAULT '',
    sinopse TEXT,
    genero VARCHAR(150) NOT NULL DEFAULT '',
    ano SMALLINT UNSIGNED NULL,
    INDEX idx_titulo (titulo (191))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;