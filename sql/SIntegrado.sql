DROP DATABASE IF EXISTS ifsulms;
CREATE DATABASE ifsulms;
USE ifsulms;

CREATE TABLE role(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  email VARCHAR(254) NOT NULL UNIQUE,
  senha VARCHAR(64),
  id_role BIGINT NOT NULL,
  FOREIGN KEY (id_role) REFERENCES role(id)
);

CREATE TABLE verification_token(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  token VARCHAR(100) NOT NULL,
  expiry_date DATETIME NOT NULL,
  verified BOOLEAN NOT NULL,
  id_usuario BIGINT NOT NULL UNIQUE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE notificacao(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  mensagem VARCHAR(40) NOT NULL,
  usuario BIGINT NOT NULL,
  FOREIGN KEY (usuario) REFERENCES usuario(id)
);

CREATE TABLE departamento(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  usuario BIGINT NOT NULL UNIQUE,
  FOREIGN KEY (usuario) REFERENCES usuario(id)
);

CREATE TABLE curso(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  nome VARCHAR(60) NOT NULL
);

CREATE TABLE aluno(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  rg VARCHAR(15) NOT NULL UNIQUE,
  data_nasc DATE NOT NULL,
  matricula VARCHAR(20) NOT NULL UNIQUE,
  telefone VARCHAR(13) NOT NULL,
  id_usuario BIGINT NOT NULL UNIQUE,
  id_curso BIGINT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_curso) REFERENCES curso(id)
);

CREATE TABLE requerimento(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  justificativa VARCHAR(500) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  requerimento VARCHAR(80) NOT NULL,
  data DATE NOT NULL,
  id_aluno BIGINT NOT NULL,
  id_departamento_deferinte BIGINT,
  id_departamento_atual BIGINT NOT NULL,
  FOREIGN KEY (id_aluno) REFERENCES aluno(id),
  FOREIGN KEY (id_departamento_deferinte) REFERENCES departamento(id),
  FOREIGN KEY (id_departamento_atual) REFERENCES departamento(id)
);

CREATE TABLE parecer(
  id BIGINT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  deferido TINYINT NOT NULL,
  parecer VARCHAR(500),
  id_requerimento BIGINT NOT NULL UNIQUE,
  id_departamento BIGINT NOT NULL,
  FOREIGN KEY (id_requerimento) REFERENCES requerimento(id),
  FOREIGN KEY (id_departamento) REFERENCES departamento(id)
);

INSERT INTO ifsulms.role (role_name) VALUES ('ALUNO');
INSERT INTO ifsulms.role (role_name) VALUES ('CORDCURSO');
INSERT INTO ifsulms.usuario (email, senha, id_role) VALUES ('aluno@local', '$2a$06$xwbhsO54v9Xlhb5xy3BG.u1pWaoBntVXNINFg6e4qBjeMlmzCqYSO', 1);
INSERT INTO ifsulms.curso (nome) VALUES ('info');
INSERT INTO ifsulms.aluno (nome, rg, data_nasc, matricula, telefone, id_usuario, id_curso) VALUES ('asdf', 'fasdjlkf', '2017-02-16', 'asdfasdf', 'asdfasdf', 1, 1);
