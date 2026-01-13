# API RESTful - Sistema de Gestão de Escola Profissional

API REST completa desenvolvida em Spring Boot para gestão de escola profissional, com suporte para clientes web e móveis.

## 🚀 Tecnologias

- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Data JPA**
- **MySQL**
- **Lombok**
- **Swagger/OpenAPI**
- **Maven**

## 📋 Funcionalidades

### Entidades

- **Aluno**: id, nome, idade, email, turma
- **Professor**: id, nome, disciplina, email
- **Curso**: id, nome, duração
- **Turma**: id, nome, curso, professor responsável, lista de alunos

### Endpoints Disponíveis

#### Alunos

- `GET /alunos` - Listar todos os alunos
- `GET /alunos/{id}` - Buscar aluno por ID
- `POST /alunos` - Criar novo aluno
- `PUT /alunos/{id}` - Atualizar aluno
- `DELETE /alunos/{id}` - Apagar aluno

#### Professores

- `GET /professores` - Listar todos os professores
- `GET /professores/{id}` - Buscar professor por ID
- `POST /professores` - Criar novo professor
- `PUT /professores/{id}` - Atualizar professor
- `DELETE /professores/{id}` - Apagar professor

#### Cursos

- `GET /cursos` - Listar todos os cursos
- `GET /cursos/{id}` - Buscar curso por ID
- `POST /cursos` - Criar novo curso
- `PUT /cursos/{id}` - Atualizar curso
- `DELETE /cursos/{id}` - Apagar curso

#### Turmas

- `GET /turmas` - Listar todas as turmas
- `GET /turmas/{id}` - Buscar turma por ID
- `GET /turmas/{id}/alunos` - Listar alunos de uma turma
- `POST /turmas` - Criar nova turma
- `PUT /turmas/{id}` - Atualizar turma
- `DELETE /turmas/{id}` - Apagar turma

## 🔧 Configuração do Ambiente

### Pré-requisitos

- Java 17 ou superior
- Maven 3.6+
- MySQL 8.0+

### Configuração da Base de Dados MySQL

#### Opção 1: Usar MySQL Workbench (Recomendado para Alunos)

1. **Instalar MySQL Server + MySQL Workbench Community Edition**:

   - Descarregar: https://dev.mysql.com/downloads/workbench/
   - Durante a instalação do MySQL Server, anotar a palavra-passe do root

2. **Abrir MySQL Workbench**:

   - Conectar à instância local (Local instance MySQL80 ou similar)
   - Usar utilizador `root` e a palavra-passe definida na instalação

3. **Criar a Base de Dados** (no Workbench):

   ```sql
   CREATE DATABASE escola_db;
   ```

   - Executar a query (⚡ ícone de raio ou Ctrl+Enter)

4. **Verificar Ligação**:

   - No painel esquerdo, deve aparecer `escola_db` na lista de schemas
   - Clicar com botão direito → "Set as Default Schema"

5. **Configurar credenciais** no ficheiro `application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=SUA_PALAVRA_PASSE_AQUI
   ```
   **Importante**: Usar a palavra-passe definida na instalação do MySQL.

#### Opção 2: Linha de Comandos (Alternativa)

1. **Aceder ao MySQL**:

   ```bash
   mysql -u root -p
   ```

2. **Criar base de dados**:
   ```sql
   CREATE DATABASE escola_db;
   ```

**Nota**: O Spring Boot cria as tabelas automaticamente. Não é preciso criar manualmente!

## 🏃 Como Executar

1. **Clonar/navegar até ao diretório do projeto**:

   ```bash
   cd /Users/ruimartins/Desktop/APIRestfull
   ```

2. **Compilar o projeto**:

   ```bash
   mvn clean install
   ```

3. **Executar a aplicação**:

   ```bash
   mvn spring-boot:run
   ```

   Ou a usar Java diretamente:

   ```bash
   java -jar target/escola-api-1.0.0.jar
   ```

4. **A aplicação estará disponível em**: `http://localhost:8080`

## 📚 Documentação da API (Swagger)

Após iniciar a aplicação, aceda:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs

## 🧪 Testar a API

### A usar cURL

**Criar um Curso**:

```bash
curl -X POST http://localhost:8080/cursos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Desenvolvimento Web",
    "duracao": 6
  }'
```

**Criar um Professor**:

```bash
curl -X POST http://localhost:8080/professores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "disciplina": "Programação",
    "email": "joao@escola.com"
  }'
```

**Criar uma Turma**:

```bash
curl -X POST http://localhost:8080/turmas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Turma A",
    "cursoId": 1,
    "professorId": 1
  }'
```

**Criar um Aluno**:

```bash
curl -X POST http://localhost:8080/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "idade": 20,
    "email": "maria@aluno.com",
    "turmaId": 1
  }'
```

**Listar Alunos de uma Turma**:

```bash
curl http://localhost:8080/turmas/1/alunos
```

## 📁 Estrutura do Projeto

```
src/main/java/com/escola/api/
├── config/              # Configurações (CORS, Swagger)
├── controller/          # Controllers REST
├── dto/                 # Data Transfer Objects
├── exception/           # Tratamento de exceções
├── model/              # Entidades JPA
├── repository/         # Repositories JPA
├── service/            # Lógica de negócio
└── EscolaApiApplication.java
```

## ✅ Validações

- **Campos obrigatórios**: nome, email, etc.
- **Email válido**: formato correto de email
- **Email único**: não permite duplicação
- **Relacionamentos**: validação de IDs existentes

## 🌐 CORS

A API está configurada para aceitar pedidos de qualquer origem, permitindo consumo por:

- Aplicações web alojadas noutros domínios
- Aplicações móveis
- Ferramentas de teste (Postman, Insomnia)

## 🔧 Verificar Dados no MySQL Workbench

Após executar a aplicação, pode verificar as tabelas criadas:

1. Abrir MySQL Workbench
2. Conectar à instância local
3. Selecionar schema `escola_db`
4. Executar queries:

```sql
-- Ver tabelas criadas
SHOW TABLES;

-- Ver dados
SELECT * FROM cursos;
SELECT * FROM professores;
SELECT * FROM turmas;
SELECT * FROM alunos;

-- Ver relações
SELECT t.nome as turma, c.nome as curso, p.nome as professor
FROM turmas t
JOIN cursos c ON t.curso_id = c.id
JOIN professores p ON t.professor_id = p.id;
```

## 🔍 Relacionamentos

- **Aluno ↔ Turma**: ManyToOne (muitos alunos para uma turma)
- **Turma ↔ Curso**: ManyToOne (muitas turmas para um curso)
- **Turma ↔ Professor**: ManyToOne (muitas turmas para um professor)

## 📝 Notas Importantes

1. A base de dados é criada automaticamente na primeira execução (`ddl-auto=update`)
2. As tabelas são criadas com base nas entidades JPA
3. A API retorna JSON em todos os endpoints
4. Tratamento de erros padronizado com mensagens descritivas
5. Logs SQL ativados para depuração

## 🛠️ Troubleshooting

**Erro de ligação MySQL**:

- Verificar se o MySQL está a correr
- Confirmar utilizador e palavra-passe no `application.properties`
- Verificar se a porta 3306 está disponível

**Erro de porta 8080 ocupada**:

- Alterar a porta no `application.properties`:
  ```properties
  server.port=8081
  ```

**Erro de compilação**:

- Verificar versão do Java: `java -version`
- Limpar cache do Maven: `mvn clean`

## 📄 Licença

Apache 2.0

---

**Desenvolvido com Spring Boot** ☕
