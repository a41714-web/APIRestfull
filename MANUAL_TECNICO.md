# 📘 Manual Técnico - API RESTful Escola Profissional

## Guia Completo de Conceitos e Arquitetura

---

## 📚 Índice

1. [Introdução e Conceitos Base](#1-introdução-e-conceitos-base)
2. [Arquitetura da Aplicação](#2-arquitetura-da-aplicação)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Estrutura em Camadas](#4-estrutura-em-camadas)
5. [Entidades e Modelo de Dados](#5-entidades-e-modelo-de-dados)
6. [Relacionamentos JPA](#6-relacionamentos-jpa)
7. [DTOs - Data Transfer Objects](#7-dtos---data-transfer-objects)
8. [Repositories e Acesso a Dados](#8-repositories-e-acesso-a-dados)
9. [Services e Lógica de Negócio](#9-services-e-lógica-de-negócio)
10. [Controllers e API REST](#10-controllers-e-api-rest)
11. [Validações e Tratamento de Erros](#11-validações-e-tratamento-de-erros)
12. [Configurações](#12-configurações)
13. [Boas Práticas Implementadas](#13-boas-práticas-implementadas)

---

## 1. Introdução e Conceitos Base

### 1.1 O que é uma API RESTful?

**REST** (Representational State Transfer) é um estilo arquitectural para sistemas distribuídos, particularmente para serviços web.

#### Princípios REST:

1. **Cliente-Servidor**: Separação entre interface do utilizador e armazenamento de dados
2. **Stateless**: Cada pedido contém toda a informação necessária
3. **Cacheable**: Respostas podem ser guardadas em cache
4. **Interface Uniforme**: Utiliza métodos HTTP padronizados
5. **Sistema em Camadas**: Arquitetura pode ter múltiplas camadas

#### Métodos HTTP (Verbos):

```
GET    → Obter recursos (Leitura)
POST   → Criar novos recursos
PUT    → Atualizar recursos existentes
DELETE → Apagar recursos
PATCH  → Atualização parcial (não usamos neste projeto)
```

#### Códigos de Estado HTTP:

```
2xx - Sucesso
  200 OK              → Pedido bem-sucedido
  201 Created         → Recurso criado com sucesso
  204 No Content      → Sucesso sem conteúdo de retorno

4xx - Erros do Cliente
  400 Bad Request     → Pedido inválido
  404 Not Found       → Recurso não encontrado
  409 Conflict        → Conflito (ex: email duplicado)

5xx - Erros do Servidor
  500 Internal Error  → Erro interno do servidor
```

### 1.2 Porquê REST?

**Vantagens**:

- ✅ Simplicidade e legibilidade
- ✅ Independência de plataforma
- ✅ Escalabilidade
- ✅ Stateless (facilita load balancing)
- ✅ Suporte universal (todos os navegadores e dispositivos)

### 1.3 O que é Spring Boot?

**Spring Boot** é uma framework que simplifica a criação de aplicações Spring, eliminando configurações complexas.

**Porquê Spring Boot?**

- ✅ Configuração automática (Convention over Configuration)
- ✅ Servidor embutido (Tomcat)
- ✅ Gestão de dependências simplificada
- ✅ Pronto para produção (métricas, health checks)
- ✅ Grande comunidade e documentação

---

## 2. Arquitetura da Aplicação

### 2.1 Visão Geral

A nossa aplicação segue o padrão **MVC modificado** com separação clara de responsabilidades:

```
Cliente (Web/Mobile)
        ↓
   Controller ← (REST API)
        ↓
     Service ← (Lógica de Negócio)
        ↓
   Repository ← (Acesso a Dados)
        ↓
   Base de Dados (MySQL)
```

### 2.2 Padrão em Camadas (Layered Architecture)

#### Porquê usar camadas?

1. **Separação de Responsabilidades**: Cada camada tem uma função específica
2. **Manutenibilidade**: Mudanças numa camada não afetam as outras
3. **Testabilidade**: Podemos testar cada camada independentemente
4. **Reutilização**: Lógica de negócio pode ser reutilizada
5. **Escalabilidade**: Facilita a evolução do sistema

#### As Nossas Camadas:

```
┌─────────────────────────────────────────┐
│     CONTROLLER (Camada de Apresentação) │ ← REST Endpoints
├─────────────────────────────────────────┤
│            DTO (Transfer Objects)       │ ← Transferência de Dados
├─────────────────────────────────────────┤
│      SERVICE (Camada de Negócio)        │ ← Regras de Negócio
├─────────────────────────────────────────┤
│    REPOSITORY (Camada de Persistência)  │ ← Acesso à BD
├─────────────────────────────────────────┤
│         MODEL (Camada de Domínio)       │ ← Entidades JPA
├─────────────────────────────────────────┤
│    EXCEPTION (Tratamento de Erros)      │ ← Gestão de Exceções
└─────────────────────────────────────────┘
```

---

## 3. Tecnologias Utilizadas

### 3.1 Spring Boot Starters

#### O que são Starters?

**Starters** são dependências que incluem tudo o que precisamos para uma funcionalidade específica.

#### Starters Utilizados:

**1. spring-boot-starter-web**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**O que inclui:**

- Spring MVC (para controllers REST)
- Tomcat embutido (servidor web)
- Jackson (conversão JSON)
- Validação

**Porquê:** Base para criar APIs REST

---

**2. spring-boot-starter-data-jpa**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

**O que inclui:**

- Spring Data JPA
- Hibernate (implementação JPA)
- Transações

**Porquê:** Simplifica acesso à base de dados

---

**3. mysql-connector-j**

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>
```

**Porquê:** Driver JDBC para conectar ao MySQL

---

**4. spring-boot-starter-validation**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

**O que faz:** Validação de dados com anotações (@NotBlank, @Email, etc.)

**Porquê:** Garante integridade dos dados

---

**5. springdoc-openapi**

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
</dependency>
```

**O que faz:** Gera documentação Swagger automaticamente

**Porquê:** Documentação interativa da API

---

**6. Lombok**

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

**O que faz:** Gera código repetitivo (getters, setters, construtores)

**Porquê:** Reduz código boilerplate em 70%

---

## 4. Estrutura em Camadas

### 4.1 Camada Model (Entidades)

#### O que é?

Classes que representam tabelas da base de dados.

#### Responsabilidades:

- Definir estrutura dos dados
- Mapear para tabelas (JPA)
- Definir relacionamentos

#### Exemplo: Aluno.java

```java
@Entity                          // ← Marca como entidade JPA
@Table(name = "alunos")          // ← Nome da tabela na BD
@Data                            // ← Lombok: gera getters/setters
@NoArgsConstructor               // ← Construtor vazio (JPA precisa)
@AllArgsConstructor              // ← Construtor com todos os campos
public class Aluno {

    @Id                          // ← Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // ← Auto-incremento
    private Long id;

    @NotBlank(message = "Nome é obrigatório")  // ← Validação
    @Column(nullable = false)    // ← Não pode ser NULL na BD
    private String nome;

    @NotNull(message = "Idade é obrigatória")
    private Integer idade;

    @Email(message = "Email deve ser válido")
    @Column(unique = true)       // ← Email único na BD
    private String email;

    @ManyToOne                   // ← Relação: Muitos alunos → Uma turma
    @JoinColumn(name = "turma_id")  // ← Coluna FK na tabela
    private Turma turma;
}
```

#### Porquê estas anotações?

**@Entity**: Diz ao JPA que isto é uma tabela
**@Table**: Especifica o nome exato da tabela
**@Id**: Define a chave primária
**@GeneratedValue**: MySQL gera o ID automaticamente
**@Column**: Configura a coluna (nullable, unique, etc.)
**@ManyToOne**: Define relacionamento entre tabelas

---

### 4.2 Camada DTO (Data Transfer Objects)

#### O que é um DTO?

**DTO** é um objeto usado apenas para transferir dados entre camadas, sem lógica de negócio.

#### Porquê usar DTOs?

❌ **Sem DTO** (expor entidade diretamente):

```java
// Problemas:
// 1. Expõe estrutura interna da BD
// 2. Pode causar lazy loading exceptions
// 3. Dados sensíveis expostos
// 4. Dificulta versionamento da API
```

✅ **Com DTO**:

```java
// Vantagens:
// 1. Controlo total sobre dados expostos
// 2. Desacopla API da estrutura da BD
// 3. Facilita evolução
// 4. Previne serialização de relações circulares
```

#### Exemplo: AlunoDTO.java

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlunoDTO {

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotNull(message = "Idade é obrigatória")
    private Integer idade;

    @Email(message = "Email deve ser válido")
    private String email;

    // Em vez de objeto Turma completo, só enviamos o ID e nome
    private Long turmaId;        // ← Simples e eficiente
    private String turmaNome;    // ← Informação útil para o cliente
}
```

#### Comparação: Entidade vs DTO

```
Entidade (Aluno)              DTO (AlunoDTO)
├─ id                         ├─ id
├─ nome                       ├─ nome
├─ idade                      ├─ idade
├─ email                      ├─ email
├─ turma (objeto completo)    ├─ turmaId (apenas ID)
│   ├─ id                     └─ turmaNome (apenas nome)
│   ├─ nome
│   ├─ curso (objeto)
│   └─ alunos (lista)
└─ ...relações...
```

**Resultado**: JSON limpo e eficiente!

---

### 4.3 Camada Repository

#### O que é?

Interface que abstrai o acesso à base de dados usando **Spring Data JPA**.

#### Porquê Repository?

Sem Repository (JDBC tradicional):

```java
// Código manual, repetitivo
Connection conn = DriverManager.getConnection(...);
PreparedStatement stmt = conn.prepareStatement("SELECT * FROM alunos");
ResultSet rs = stmt.executeQuery();
// 20+ linhas de código...
```

Com Repository:

```java
List<Aluno> alunos = alunoRepository.findAll();  // ← 1 linha!
```

#### Exemplo: AlunoRepository.java

```java
@Repository                     // ← Marca como componente Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    //                                                  ^      ^
    //                                                  |      └─ Tipo da chave primária
    //                                                  └──────── Entidade

    // Spring Data JPA já fornece automaticamente:
    // - findAll()           → SELECT * FROM alunos
    // - findById(id)        → SELECT * FROM alunos WHERE id = ?
    // - save(aluno)         → INSERT ou UPDATE
    // - deleteById(id)      → DELETE FROM alunos WHERE id = ?
    // - count()             → SELECT COUNT(*) FROM alunos

    // Métodos personalizados (Query Methods):
    Optional<Aluno> findByEmail(String email);
    //              ^^^^^^^^^^^
    //              Spring gera a query automaticamente!
    //              SELECT * FROM alunos WHERE email = ?

    boolean existsByEmail(String email);
    //      ^^^^^^^^^^^^
    //      SELECT COUNT(*) > 0 FROM alunos WHERE email = ?
}
```

#### Como funciona a "mágica"?

**Spring Data JPA** analisa o nome do método e gera a query SQL automaticamente:

```
findBy + NomeDoCampo           → WHERE nome_campo = ?
findBy + Campo1 + And + Campo2 → WHERE campo1 = ? AND campo2 = ?
existsBy + Campo               → Verifica se existe
countBy + Campo                → Conta registos
deleteBy + Campo               → Apaga por condição
```

#### Query Personalizada (JPQL):

```java
@Query("SELECT a FROM Aluno a WHERE a.idade > :idade")
List<Aluno> findAlunosComMaisDe(@Param("idade") int idade);
```

**JPQL** vs **SQL**:

- JPQL: trabalha com objetos Java
- SQL: trabalha com tabelas

---

### 4.4 Camada Service

#### O que é?

Camada que contém a **lógica de negócio** da aplicação.

#### Responsabilidades:

1. **Regras de Negócio**: Validações complexas, cálculos
2. **Orquestração**: Coordena múltiplas operações
3. **Transações**: Garante consistência
4. **Conversões**: Entity ↔ DTO

#### Porquê Service?

**Separação de Responsabilidades**:

```
Controller → "Como" receber/enviar dados (HTTP)
Service    → "O que" fazer com os dados (Negócio)
Repository → "Onde" guardar os dados (BD)
```

#### Exemplo: AlunoService.java

```java
@Service                        // ← Marca como componente de serviço
public class AlunoService {

    @Autowired                  // ← Injeção de dependência
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    // Listar todos
    @Transactional(readOnly = true)  // ← Otimização: apenas leitura
    public List<AlunoDTO> findAll() {
        return alunoRepository.findAll().stream()
                .map(this::convertToDTO)     // ← Converte Entity → DTO
                .collect(Collectors.toList());
    }

    // Buscar por ID
    @Transactional(readOnly = true)
    public AlunoDTO findById(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Aluno não encontrado com ID: " + id
                ));
        return convertToDTO(aluno);
    }

    // Criar novo aluno
    @Transactional              // ← Transação: tudo ou nada
    public AlunoDTO create(AlunoDTO alunoDTO) {
        // Validação de negócio
        if (alunoRepository.existsByEmail(alunoDTO.getEmail())) {
            throw new EmailAlreadyExistsException(
                "Email já registado: " + alunoDTO.getEmail()
            );
        }

        Aluno aluno = convertToEntity(alunoDTO);  // ← DTO → Entity
        Aluno savedAluno = alunoRepository.save(aluno);
        return convertToDTO(savedAluno);          // ← Entity → DTO
    }

    // Conversão Entity → DTO
    private AlunoDTO convertToDTO(Aluno aluno) {
        AlunoDTO dto = new AlunoDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setIdade(aluno.getIdade());
        dto.setEmail(aluno.getEmail());

        if (aluno.getTurma() != null) {
            dto.setTurmaId(aluno.getTurma().getId());
            dto.setTurmaNome(aluno.getTurma().getNome());
        }

        return dto;
    }

    // Conversão DTO → Entity
    private Aluno convertToEntity(AlunoDTO dto) {
        Aluno aluno = new Aluno();
        aluno.setNome(dto.getNome());
        aluno.setIdade(dto.getIdade());
        aluno.setEmail(dto.getEmail());

        if (dto.getTurmaId() != null) {
            Turma turma = turmaRepository.findById(dto.getTurmaId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                        "Turma não encontrada"
                    ));
            aluno.setTurma(turma);
        }

        return aluno;
    }
}
```

#### @Transactional - Porquê?

**Transação** garante que operações sejam atómicas:

```java
@Transactional
public void transferirAluno(Long alunoId, Long novaTurmaId) {
    // Tudo acontece ou nada acontece
    // Se houver erro, faz rollback automático
    removerDaTurmaAtual(alunoId);    // Operação 1
    adicionarEmNovaTurma(alunoId);   // Operação 2
}
```

**readOnly = true**: Otimização quando só lemos dados.

---

### 4.5 Camada Controller

#### O que é?

Camada que expõe os **endpoints REST** e trata pedidos HTTP.

#### Responsabilidades:

1. Receber pedidos HTTP
2. Validar dados de entrada
3. Chamar Service apropriado
4. Retornar resposta HTTP

#### Exemplo: AlunoController.java

```java
@RestController                 // ← REST Controller (retorna JSON)
@RequestMapping("/alunos")      // ← Base path: /alunos
@Tag(name = "Alunos")           // ← Documentação Swagger
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    // GET /alunos → Listar todos
    @GetMapping
    @Operation(summary = "Listar todos os alunos")
    public ResponseEntity<List<AlunoDTO>> getAllAlunos() {
        List<AlunoDTO> alunos = alunoService.findAll();
        return ResponseEntity.ok(alunos);
        //     └────────────────┘
        //     HTTP 200 OK + JSON no body
    }

    // GET /alunos/1 → Buscar por ID
    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID")
    public ResponseEntity<AlunoDTO> getAlunoById(@PathVariable Long id) {
        //                                        └───────────┘
        //                                        Captura {id} da URL
        AlunoDTO aluno = alunoService.findById(id);
        return ResponseEntity.ok(aluno);
    }

    // POST /alunos → Criar novo
    @PostMapping
    @Operation(summary = "Criar novo aluno")
    public ResponseEntity<AlunoDTO> createAluno(
            @Valid @RequestBody AlunoDTO alunoDTO) {
        //  ^       └───────────┘
        //  |       JSON no body do pedido
        //  └─ Valida anotações (@NotBlank, @Email)

        AlunoDTO created = alunoService.create(alunoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
        //     └────────────────────────────────────────┘
        //     HTTP 201 Created
    }

    // PUT /alunos/1 → Atualizar
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar aluno")
    public ResponseEntity<AlunoDTO> updateAluno(
            @PathVariable Long id,
            @Valid @RequestBody AlunoDTO alunoDTO) {

        AlunoDTO updated = alunoService.update(id, alunoDTO);
        return ResponseEntity.ok(updated);
    }

    // DELETE /alunos/1 → Apagar
    @DeleteMapping("/{id}")
    @Operation(summary = "Apagar aluno")
    public ResponseEntity<Void> deleteAluno(@PathVariable Long id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
        //     └──────────────────────────┘
        //     HTTP 204 No Content (sucesso sem body)
    }
}
```

#### Anotações Importantes:

**@RestController**: Combina @Controller + @ResponseBody

- Todos os métodos retornam JSON automaticamente

**@RequestMapping**: Define o path base

- `/alunos` será prefixo de todos os endpoints

**@GetMapping, @PostMapping, etc.**: Mapeia método HTTP

**@PathVariable**: Extrai variável da URL

- `/alunos/{id}` → `@PathVariable Long id`

**@RequestBody**: Converte JSON do body para objeto Java

**@Valid**: Ativa validações das anotações

**ResponseEntity**: Permite controlar:

- Código de estado HTTP
- Headers
- Body da resposta

---

## 5. Entidades e Modelo de Dados

### 5.1 Entidade Aluno

```java
@Entity
@Table(name = "alunos")
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    @NotNull
    private Integer idade;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "turma_id")
    private Turma turma;
}
```

**Tabela gerada**:

```sql
CREATE TABLE alunos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    turma_id BIGINT,
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);
```

---

### 5.2 Entidade Professor

```java
@Entity
@Table(name = "professores")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    private String disciplina;

    @Email
    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "professorResponsavel")
    private List<Turma> turmas = new ArrayList<>();
}
```

**Porquê List<Turma>?**

- Um professor pode ter várias turmas
- `mappedBy` indica que Turma é dona do relacionamento

---

### 5.3 Entidade Curso

```java
@Entity
@Table(name = "cursos")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotNull
    private Integer duracao;  // em meses

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL)
    private List<Turma> turmas = new ArrayList<>();
}
```

**cascade = CascadeType.ALL**:

- Operações no curso propagam para turmas
- CUIDADO: Apagar curso apaga turmas!

---

### 5.4 Entidade Turma

```java
@Entity
@Table(name = "turmas")
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professorResponsavel;

    @OneToMany(mappedBy = "turma",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<Aluno> alunos = new ArrayList<>();
}
```

**orphanRemoval = true**:

- Se aluno é removido da lista, é apagado da BD

---

## 6. Relacionamentos JPA

### 6.1 Tipos de Relacionamentos

#### @OneToOne (1:1)

**Exemplo teórico**: Aluno ↔ Cartão de Estudante

```java
// Cada aluno tem UM cartão
@OneToOne
private CartaoEstudante cartao;
```

---

#### @OneToMany (1:N)

**Exemplo**: Turma → Alunos

```java
@Entity
public class Turma {
    @OneToMany(mappedBy = "turma")
    private List<Aluno> alunos;  // Uma turma tem MUITOS alunos
}
```

---

#### @ManyToOne (N:1)

**Exemplo**: Alunos → Turma

```java
@Entity
public class Aluno {
    @ManyToOne
    @JoinColumn(name = "turma_id")
    private Turma turma;  // Muitos alunos pertencem a UMA turma
}
```

---

#### @ManyToMany (N:N)

**Exemplo teórico**: Alunos ↔ Disciplinas

```java
@ManyToMany
@JoinTable(
    name = "aluno_disciplina",
    joinColumns = @JoinColumn(name = "aluno_id"),
    inverseJoinColumns = @JoinColumn(name = "disciplina_id")
)
private List<Disciplina> disciplinas;
```

Cria tabela intermediária:

```sql
CREATE TABLE aluno_disciplina (
    aluno_id BIGINT,
    disciplina_id BIGINT,
    PRIMARY KEY (aluno_id, disciplina_id)
);
```

---

### 6.2 FetchType: LAZY vs EAGER

#### LAZY (Preguiçoso)

```java
@ManyToOne(fetch = FetchType.LAZY)
private Turma turma;
```

**O que faz:** Só carrega turma quando acedemos explicitamente

```java
Aluno aluno = repository.findById(1);
// Turma NÃO foi carregada ainda
String nome = aluno.getNome();  // OK

String turmaNome = aluno.getTurma().getNome();  // Agora carrega turma
```

**Vantagem**: Performance (menos queries)
**Desvantagem**: Pode causar LazyInitializationException

---

#### EAGER (Ansioso)

```java
@ManyToOne(fetch = FetchType.EAGER)
private Turma turma;
```

**O que faz:** Sempre carrega turma junto com aluno

```java
Aluno aluno = repository.findById(1);
// Turma JÁ foi carregada!
```

**Vantagem**: Sem LazyInitializationException
**Desvantagem**: Performance (mais dados sempre)

---

**Recomendação:** Use LAZY por padrão!

---

### 6.3 Cascade Operations

```java
@OneToMany(cascade = CascadeType.ALL)
private List<Aluno> alunos;
```

**Tipos de Cascade:**

```
CascadeType.PERSIST  → save() propaga
CascadeType.MERGE    → update() propaga
CascadeType.REMOVE   → delete() propaga
CascadeType.REFRESH  → refresh() propaga
CascadeType.DETACH   → detach() propaga
CascadeType.ALL      → Todos os anteriores
```

**Exemplo:**

```java
Turma turma = new Turma();
turma.setNome("Turma A");

Aluno aluno = new Aluno();
aluno.setNome("João");
turma.getAlunos().add(aluno);

turmaRepository.save(turma);  // Aluno também é guardado!
```

**CUIDADO**: `CascadeType.REMOVE` pode apagar dados em cascata!

---

## 7. DTOs - Data Transfer Objects

### 7.1 Porquê DTOs?

#### Problema 1: Serialização Circular

Sem DTO:

```java
// Aluno tem Turma
// Turma tem Lista de Alunos
// Cada Aluno tem Turma...
// LOOP INFINITO! StackOverflowError
```

Com DTO:

```java
// AlunoDTO tem apenas turmaId
// Sem referências circulares
```

---

#### Problema 2: Lazy Loading Exception

```java
@Transactional
public Aluno getAluno(Long id) {
    return repository.findById(id).get();
}
// Fora da transação:
aluno.getTurma().getNome();  // LazyInitializationException!
```

Com DTO:

```java
@Transactional
public AlunoDTO getAluno(Long id) {
    Aluno aluno = repository.findById(id).get();
    return convertToDTO(aluno);  // Carrega tudo necessário
}
```

---

#### Problema 3: Exposição de Dados Sensíveis

```java
@Entity
public class User {
    private String password;  // NÃO queremos expor!
    private String nif;       // Dados sensíveis!
}
```

Com DTO:

```java
public class UserDTO {
    private String nome;
    private String email;
    // password e nif NÃO incluídos
}
```

---

### 7.2 Padrão de Conversão

```java
// Entity → DTO (para enviar ao cliente)
private AlunoDTO convertToDTO(Aluno entity) {
    AlunoDTO dto = new AlunoDTO();
    dto.setId(entity.getId());
    dto.setNome(entity.getNome());
    // ... copiar campos
    return dto;
}

// DTO → Entity (ao receber do cliente)
private Aluno convertToEntity(AlunoDTO dto) {
    Aluno entity = new Aluno();
    entity.setNome(dto.getNome());
    entity.setIdade(dto.getIdade());
    // ... copiar campos
    return entity;
}
```

**Alternativa**: Usar bibliotecas como **ModelMapper** ou **MapStruct**

---

## 8. Repositories e Acesso a Dados

### 8.1 Spring Data JPA

#### Hierarquia de Interfaces:

```
Repository (marker interface)
    ↓
CrudRepository (CRUD básico)
    ↓
PagingAndSortingRepository (+ paginação)
    ↓
JpaRepository (+ batch operations, flush)
```

**Usamos JpaRepository** por ter todos os métodos.

---

### 8.2 Métodos Automáticos

```java
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    // Herdados automaticamente:

    List<Aluno> findAll();
    Optional<Aluno> findById(Long id);
    Aluno save(Aluno aluno);
    void deleteById(Long id);
    long count();
    boolean existsById(Long id);

    // ... mais de 20 métodos!
}
```

---

### 8.3 Query Methods (Derived Queries)

Spring Data JPA cria queries a partir do nome do método:

```java
// Padrão: findBy + Campo + Operação + And/Or + ...

// WHERE email = ?
Optional<Aluno> findByEmail(String email);

// WHERE nome LIKE ?
List<Aluno> findByNomeContaining(String nome);

// WHERE idade > ?
List<Aluno> findByIdadeGreaterThan(Integer idade);

// WHERE nome = ? AND idade = ?
List<Aluno> findByNomeAndIdade(String nome, Integer idade);

// WHERE email = ? ORDER BY nome ASC
List<Aluno> findByEmailOrderByNomeAsc(String email);

// Apenas verificar existência
boolean existsByEmail(String email);

// Contar
long countByIdadeGreaterThan(Integer idade);

// Apagar
void deleteByEmail(String email);
```

**Palavras-chave suportadas:**

```
And, Or, Between, LessThan, GreaterThan,
After, Before, Like, StartingWith, EndingWith,
Containing, OrderBy, Not, In, NotIn,
True, False, IgnoreCase, ...
```

---

### 8.4 @Query (JPQL)

Para queries mais complexas:

```java
@Query("SELECT a FROM Aluno a WHERE a.idade > :minIdade AND a.turma.id = :turmaId")
List<Aluno> findAlunosComIdadeMinimaPorTurma(
    @Param("minIdade") Integer minIdade,
    @Param("turmaId") Long turmaId
);
```

**JPQL** (Java Persistence Query Language):

- Sintaxe parecida com SQL
- Usa nomes de classes e atributos (não tabelas e colunas)
- `SELECT a FROM Aluno a` (não `SELECT * FROM alunos`)

---

### 8.5 Native Queries

Para SQL puro:

```java
@Query(value = "SELECT * FROM alunos WHERE idade > ?1", nativeQuery = true)
List<Aluno> findAlunosComSQL(Integer idade);
```

**Quando usar:**

- Queries muito específicas do MySQL
- Otimizações de performance
- Funções SQL não suportadas em JPQL

---

## 9. Services e Lógica de Negócio

### 9.1 Responsabilidades do Service

1. **Validações de Negócio**

```java
if (alunoRepository.existsByEmail(email)) {
    throw new EmailAlreadyExistsException("Email já registado");
}
```

2. **Orquestração de Múltiplas Operações**

```java
public void transferirAluno(Long alunoId, Long novaTurmaId) {
    Aluno aluno = buscarAluno(alunoId);
    Turma novaTurma = buscarTurma(novaTurmaId);
    aluno.setTurma(novaTurma);
    alunoRepository.save(aluno);
    notificarProfessor(novaTurma);  // Múltiplas ações
}
```

3. **Conversões Entity ↔ DTO**

4. **Tratamento de Exceções**

---

### 9.2 @Transactional

#### O que é uma Transação?

**Transação** = Conjunto de operações que devem ser executadas como unidade atómica.

**Propriedades ACID:**

- **A**tomicity: Tudo ou nada
- **C**onsistency: BD fica consistente
- **I**solation: Transações isoladas
- **D**urability: Mudanças permanentes

#### Exemplo sem @Transactional:

```java
public void transferirAluno(Long alunoId, Long novaTurmaId) {
    removerDaTurmaAtual(alunoId);     // OK
    // ERRO aqui! (ex: turma não existe)
    adicionarNaNovaTurma(alunoId);    // NÃO executa

    // Resultado: Aluno sem turma! (inconsistência)
}
```

#### Com @Transactional:

```java
@Transactional
public void transferirAluno(Long alunoId, Long novaTurmaId) {
    removerDaTurmaAtual(alunoId);
    // ERRO aqui!
    adicionarNaNovaTurma(alunoId);

    // Rollback automático! Aluno volta à turma anterior
}
```

---

### 9.3 Injeção de Dependências

#### O que é?

Spring cria e gere objetos (beans) automaticamente.

#### Sem Injeção:

```java
public class AlunoService {
    private AlunoRepository repository = new AlunoRepository(); // ❌
    // Problemas:
    // - Acoplamento forte
    // - Difícil testar
    // - Difícil mudar implementação
}
```

#### Com @Autowired:

```java
@Service
public class AlunoService {
    @Autowired
    private AlunoRepository repository;  // ✅ Spring injeta

    // Vantagens:
    // - Desacoplamento
    // - Fácil testar (pode injetar mock)
    // - Fácil trocar implementação
}
```

#### Tipos de Injeção:

**1. Field Injection** (usamos no projeto):

```java
@Autowired
private AlunoRepository repository;
```

**2. Constructor Injection** (recomendado):

```java
private final AlunoRepository repository;

@Autowired
public AlunoService(AlunoRepository repository) {
    this.repository = repository;
}
```

**3. Setter Injection**:

```java
private AlunoRepository repository;

@Autowired
public void setRepository(AlunoRepository repository) {
    this.repository = repository;
}
```

**Recomendação**: Constructor Injection é mais testável!

---

## 10. Controllers e API REST

### 10.1 ResponseEntity

#### O que é?

Classe que representa a resposta HTTP completa:

- Status code
- Headers
- Body

#### Exemplos:

```java
// 200 OK com body
return ResponseEntity.ok(aluno);

// 201 Created
return ResponseEntity.status(HttpStatus.CREATED).body(aluno);

// 204 No Content (sem body)
return ResponseEntity.noContent().build();

// 404 Not Found
return ResponseEntity.notFound().build();

// Custom headers
return ResponseEntity.ok()
    .header("X-Custom-Header", "value")
    .body(aluno);
```

---

### 10.2 Validações com @Valid

```java
@PostMapping
public ResponseEntity<AlunoDTO> create(
        @Valid @RequestBody AlunoDTO dto) {
    // Se validação falhar, lança MethodArgumentNotValidException
    // Interceptada por GlobalExceptionHandler
}
```

**Anotações de Validação:**

```java
@NotNull       // Não pode ser null
@NotBlank      // Não pode ser vazio ou só espaços (String)
@NotEmpty      // Não pode ser vazio (String, Collection)
@Size(min, max)// Tamanho entre min e max
@Min(value)    // Valor mínimo
@Max(value)    // Valor máximo
@Email         // Email válido
@Pattern(regex)// Regex customizado
@Past          // Data no passado
@Future        // Data no futuro
```

---

### 10.3 Path Variables vs Query Parameters

#### @PathVariable (parte do path):

```java
// GET /alunos/5
@GetMapping("/{id}")
public AlunoDTO getAluno(@PathVariable Long id) {
    // id = 5
}
```

#### @RequestParam (query string):

```java
// GET /alunos?idade=20&turma=1
@GetMapping
public List<AlunoDTO> getAlunos(
        @RequestParam Integer idade,
        @RequestParam Long turma) {
    // idade = 20, turma = 1
}
```

**Quando usar cada um?**

- **PathVariable**: Identificadores, recursos específicos
- **RequestParam**: Filtros, paginação, ordenação

---

## 11. Validações e Tratamento de Erros

### 11.1 Exceções Personalizadas

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
```

**Porquê RuntimeException?**

- Não precisa `try-catch` obrigatório
- Spring trata automaticamente

---

### 11.2 Global Exception Handler

```java
@RestControllerAdvice  // ← Intercepta exceções globalmente
public class GlobalExceptionHandler {

    // Trata ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex, WebRequest request) {

        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),    // 404
            "Not Found",
            ex.getMessage(),
            request.getDescription(false)
        );

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Trata EmailAlreadyExistsException
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailExists(
            EmailAlreadyExistsException ex, WebRequest request) {

        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.CONFLICT.value(),     // 409
            "Conflict",
            ex.getMessage(),
            request.getDescription(false)
        );

        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    // Trata erros de validação (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex, WebRequest request) {

        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " +
                              error.getDefaultMessage())
                .collect(Collectors.toList());

        ErrorResponse errorResponse = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),  // 400
            "Validation Error",
            "Erro de validação nos campos",
            request.getDescription(false),
            errors
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Catch-all para outros erros
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobal(
            Exception ex, WebRequest request) {

        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),  // 500
            "Internal Server Error",
            ex.getMessage(),
            request.getDescription(false)
        );

        return new ResponseEntity<>(error,
                                   HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

#### Vantagens:

1. **Centralizado**: Um só lugar trata todos os erros
2. **Consistente**: Formato de erro padronizado
3. **Manutenível**: Fácil adicionar novos tratamentos
4. **Profissional**: Respostas JSON estruturadas

---

### 11.3 Classe ErrorResponse

```java
@Data
@AllArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private List<String> details;  // Opcional
}
```

**Exemplo de resposta JSON:**

```json
{
  "timestamp": "2026-01-06T21:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Aluno não encontrado com ID: 99",
  "path": "/alunos/99",
  "details": null
}
```

---

## 12. Configurações

### 12.1 Application Properties

```properties
# Servidor
server.port=8080

# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/escola_db
spring.datasource.username=root
spring.datasource.password=rootroot
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

#### ddl-auto - Estratégias:

```
create       → Apaga e recria tabelas (CUIDADO!)
create-drop  → Cria ao iniciar, apaga ao terminar
update       → Atualiza schema (adiciona colunas, não remove)
validate     → Apenas valida se schema está correto
none         → Não faz nada
```

**Recomendação:**

- **Desenvolvimento**: `update`
- **Produção**: `validate` ou `none` (usar migrations)

---

### 12.2 CORS Configuration

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")              // Todos os endpoints
                .allowedOrigins("*")            // Todas as origens
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);                  // Cache preflight 1h
    }
}
```

#### O que é CORS?

**CORS** (Cross-Origin Resource Sharing) controla quais domínios podem aceder à API.

**Exemplo de problema:**

```
Frontend: http://localhost:3000
API:      http://localhost:8080

Sem CORS: Browser bloqueia pedidos (política same-origin)
Com CORS: Configuramos para permitir
```

**Produção**: Especificar domínios exatos!

```java
.allowedOrigins("https://meusite.com", "https://app.meusite.com")
```

---

### 12.3 Swagger Configuration

```java
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Escola Profissional")
                        .version("1.0.0")
                        .description("API RESTful para gestão de escola")
                        .contact(new Contact()
                                .name("Escola API Support")
                                .email("suporte@escola.com"))
                        .license(new License()
                                .name("Apache 2.0")));
    }
}
```

**Acesso**: http://localhost:8080/swagger-ui.html

---

## 13. Boas Práticas Implementadas

### 13.1 Separação de Responsabilidades

✅ **Cada camada tem uma função específica**

```
Controller  → HTTP, validação de entrada
Service     → Lógica de negócio
Repository  → Acesso a dados
Model       → Estrutura de dados
DTO         → Transferência de dados
```

---

### 13.2 Uso de DTOs

✅ **Nunca expor entidades diretamente**

Razões:

1. Evita lazy loading exceptions
2. Previne serialização circular
3. Controla dados expostos
4. Facilita versionamento da API

---

### 13.3 Validações em Múltiplas Camadas

```
1. Controller: @Valid (validações de formato)
2. Service: Regras de negócio (email duplicado)
3. Database: Constraints (UNIQUE, NOT NULL)
```

**Defesa em profundidade!**

---

### 13.4 Tratamento de Erros Consistente

✅ **GlobalExceptionHandler** para todas as exceções

Resultado:

- Erros sempre retornam JSON estruturado
- Cliente sabe sempre o que esperar
- Facilita debugging

---

### 13.5 Transações

✅ **@Transactional** onde necessário

- Garante consistência
- Rollback automático em caso de erro
- Otimização com `readOnly = true`

---

### 13.6 Nomenclatura RESTful

✅ **Seguimos convenções REST**

```
Recursos no plural:      /alunos, /professores
Usar substantivos:       /alunos (não /getAlunos)
IDs no path:            /alunos/1
Métodos HTTP corretos:  GET, POST, PUT, DELETE
Status codes adequados: 200, 201, 204, 400, 404, 409, 500
```

---

### 13.7 Documentação Automática

✅ **Swagger/OpenAPI** gerado automaticamente

Vantagens:

- Documentação sempre atualizada
- Interface de testes interativa
- Facilita integração de clientes

---

### 13.8 Injeção de Dependências

✅ **Spring gere todas as dependências**

Vantagens:

- Baixo acoplamento
- Fácil testar
- Fácil substituir implementações

---

### 13.9 Repository Pattern

✅ **Abstração do acesso a dados**

Vantagens:

- Isola lógica de persistência
- Fácil mudar BD (MySQL → PostgreSQL)
- Testes unitários mais simples

---

### 13.10 Uso de Lombok

✅ **Reduz código boilerplate**

```java
@Data  // gera getters, setters, toString, equals, hashCode
@NoArgsConstructor  // construtor vazio
@AllArgsConstructor // construtor com todos os campos
```

Economia: ~70% menos código!

---

## 🎓 Resumo Final

### Stack Tecnológico:

- **Java 17**: Linguagem
- **Spring Boot**: Framework
- **Spring Data JPA**: Persistência
- **MySQL**: Base de dados
- **Hibernate**: ORM
- **Swagger**: Documentação
- **Lombok**: Produtividade

### Arquitetura:

```
Controller → Service → Repository → Database
     ↕          ↕
    DTO      Entity
```

### Conceitos Chave:

1. **REST**: Arquitetura de APIs web
2. **JPA**: Mapeamento objeto-relacional
3. **IoC**: Inversão de controlo (Spring)
4. **DTO**: Objetos de transferência
5. **Transações**: ACID
6. **Validações**: Múltiplas camadas
7. **Exception Handling**: Centralizado

### Padrões de Design:

- **Repository Pattern**
- **DTO Pattern**
- **Layered Architecture**
- **Dependency Injection**
- **Builder Pattern** (Lombok)

---

## 📚 Recursos para Aprofundamento

### Documentação Oficial:

- Spring Boot: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- Hibernate: https://hibernate.org/
- MySQL: https://dev.mysql.com/doc/

### Livros Recomendados:

- "Spring in Action" - Craig Walls
- "Pro Spring Boot 2" - Felipe Gutierrez
- "Java Persistence with Hibernate" - Christian Bauer

### Tutoriais:

- Baeldung: https://www.baeldung.com/
- Spring Guides: https://spring.io/guides
- JPA Buddy: https://www.jpa-buddy.com/

---

## Apêndice A: Ferramentas de Desenvolvimento

### A.1 IntelliJ IDEA Community Edition

#### Porquê Community Edition é Suficiente?

Para este projeto de API RESTful com Spring Boot, a **versão gratuita** do IntelliJ IDEA é completamente adequada.

**Comparação: Community vs Ultimate**

| Funcionalidade      | Community | Ultimate | Necessário?     |
| ------------------- | --------- | -------- | --------------- |
| **Maven/Gradle**    | ✅        | ✅       | **SIM**         |
| **Spring Boot Run** | ✅        | ✅       | **SIM**         |
| **Editing Java**    | ✅        | ✅       | **SIM**         |
| **Debugging**       | ✅        | ✅       | **SIM**         |
| **Git Integration** | ✅        | ✅       | **SIM**         |
| **Refactoring**     | ✅        | ✅       | **SIM**         |
| Spring Visual Tools | ❌        | ✅       | Não             |
| Database Tools      | ❌        | ✅       | Não (Workbench) |
| HTTP Client         | ❌        | ✅       | Não (Postman)   |
| Profiler Avançado   | ❌        | ✅       | Não             |
| Frameworks Extra    | ❌        | ✅       | Não             |

**Conclusão**: Community Edition tem **tudo o que precisamos**!

---

#### Vantagens da Community Edition:

1. **Gratuita**: 0€, sem limitações de tempo
2. **Open Source**: Código aberto e comunidade ativa
3. **Mais Leve**: Consome menos recursos que Ultimate
4. **Completa para Java**: Suporte total para Spring Boot
5. **Legal para Comércio**: Pode ser usada profissionalmente

---

#### Como Obter:

```
Site: https://www.jetbrains.com/idea/download/

Escolher: "Community Edition" (botão preto "Download")
```

**Requisitos de Sistema:**

- **RAM**: Mínimo 2GB, recomendado 8GB
- **Disco**: 2.5GB para instalação + espaço para projetos
- **CPU**: Qualquer processador moderno
- **OS**: Windows, macOS, Linux

---

#### Configuração Inicial do Projeto:

**Passo 1: Abrir o Projeto**

```
1. Iniciar IntelliJ IDEA
2. File → Open
3. Navegar até: /Users/ruimartins/Desktop/APIRestfull
4. Selecionar a pasta e clicar "OK"
```

**O que acontece automaticamente:**

- ✅ IntelliJ detecta `pom.xml` (Maven)
- ✅ Descarrega todas as dependências
- ✅ Indexa o código
- ✅ Configura Spring Boot

**Tempo de espera**: 2-5 minutos (primeira vez)

---

**Passo 2: Configurar JDK**

Se necessário:

```
1. File → Project Structure (Ctrl+Alt+Shift+S)
2. Project Settings → Project
3. SDK: Selecionar Java 17
   - Se não aparecer: Download JDK → Oracle OpenJDK 17
4. Language Level: 17
5. Apply → OK
```

---

**Passo 3: Configurar application.properties**

1. Navegar até: `src/main/resources/application.properties`
2. Editar as credenciais do MySQL:

```properties
spring.datasource.username=root
spring.datasource.password=SUA_PALAVRA_PASSE
```

**Dica**: IntelliJ oferece autocomplete mesmo na versão Community!

---

#### Como Executar a Aplicação:

**Método 1: Pela Classe Principal** (Recomendado)

```
1. Navegar: src/main/java/com/escola/api/EscolaApiApplication.java
2. Clicar no ▶️ verde ao lado de:
   - public class EscolaApiApplication
   - ou método main()
3. Escolher: "Run 'EscolaApiApplication'"
```

**Resultado esperado no console:**

```
Started EscolaApiApplication in 3.456 seconds (JVM running for 4.123)
```

---

**Método 2: Via Maven Panel**

```
1. Abrir painel "Maven" (lado direito)
   - Se não aparecer: View → Tool Windows → Maven
2. Expandir: escola-api → Plugins → spring-boot
3. Double-click: spring-boot:run
```

---

**Método 3: Terminal Integrado**

```
1. View → Tool Windows → Terminal
2. Executar:
```

```bash
mvn spring-boot:run
```

---

#### Debugging:

**Como adicionar breakpoints:**

```
1. Clicar na margem esquerda do editor (ao lado do número da linha)
2. Aparece um círculo vermelho 🔴
3. Clicar no 🐛 (Debug) em vez de ▶️ (Run)
4. Aplicação para quando atingir o breakpoint
```

**Painel de Debug:**

- **Variables**: Ver valores das variáveis
- **Watches**: Adicionar expressões para monitorizar
- **Frames**: Call stack
- **Console**: Logs da aplicação

**Controlos:**

- **F9**: Resume (continuar)
- **F8**: Step Over (próxima linha)
- **F7**: Step Into (entrar no método)
- **Shift+F8**: Step Out (sair do método)

---

#### Navegação Rápida:

**Procurar Classes:**

```
Windows/Linux: Ctrl + N
macOS:         Cmd + O
```

**Procurar Ficheiros:**

```
Windows/Linux: Ctrl + Shift + N
macOS:         Cmd + Shift + O
```

**Ir para Definição:**

```
Ctrl + Click (qualquer SO)
ou
Ctrl + B / Cmd + B
```

**Voltar Atrás:**

```
Windows/Linux: Ctrl + Alt + ←
macOS:         Cmd + [
```

**Ver Utilizações:**

```
Windows/Linux: Alt + F7
macOS:         Opt + F7
```

---

#### Atalhos Úteis:

| Ação              | Windows/Linux          | macOS           |
| ----------------- | ---------------------- | --------------- |
| Executar          | Shift + F10            | Ctrl + R        |
| Debug             | Shift + F9             | Ctrl + D        |
| Formatar Código   | Ctrl + Alt + L         | Cmd + Opt + L   |
| Optimizar Imports | Ctrl + Alt + O         | Ctrl + Opt + O  |
| Duplicar Linha    | Ctrl + D               | Cmd + D         |
| Apagar Linha      | Ctrl + Y               | Cmd + Backspace |
| Comentar          | Ctrl + /               | Cmd + /         |
| Autocomplete      | Ctrl + Space           | Ctrl + Space    |
| Gerar Código      | Alt + Insert           | Cmd + N         |
| Refactor          | Ctrl + Alt + Shift + T | Ctrl + T        |

---

#### Ver Estrutura do Projeto:

**Project Panel:**

```
View → Tool Windows → Project (Alt + 1)
```

Mostra:

```
escola-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com.escola.api/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── exception/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

---

#### Plugins Recomendados (Gratuitos):

**Como instalar:**

```
File → Settings → Plugins → Marketplace
```

**1. Lombok** (✅ Geralmente já vem instalado)

- Suporte para anotações Lombok
- **Essencial** para este projeto!

**2. Rainbow Brackets**

- Colore parênteses/chavetas por nível
- Facilita leitura de código aninhado

**3. SonarLint**

- Análise de qualidade de código
- Deteta bugs e code smells

**4. GitToolBox**

- Informações Git inline
- Mostra quem alterou cada linha

**5. Key Promoter X**

- Ensina atalhos de teclado
- Mostra atalho quando usas o rato

---

#### Ver Logs da Aplicação:

**Console de Execução:**

```
View → Tool Windows → Run (Alt + 4)
```

Mostra:

- Logs do Spring Boot
- Queries SQL (se `show-sql=true`)
- Erros e stack traces
- Saídas de `System.out.println()`

**Filtrar Logs:**

- Clicar no 🔍 (search)
- Escrever termo (ex: "ERROR", "SQL")
- Navegar com F3/Shift+F3

---

#### Troubleshooting Comum:

**Problema 1: "Cannot resolve symbol 'Lombok'"**

```
Solução:
1. File → Settings → Plugins
2. Procurar "Lombok"
3. Instalar e reiniciar IntelliJ
4. File → Settings → Build, Execution, Deployment → Compiler → Annotation Processors
5. Ativar: ☑ Enable annotation processing
```

---

**Problema 2: "Port 8080 already in use"**

```
Solução:
1. Parar processos anteriores:
   - No painel Run, clicar no ⬛ (Stop)
2. Ou mudar porta em application.properties:
   server.port=8081
```

---

**Problema 3: Maven não descarrega dependências**

```
Solução:
1. Painel Maven → Botão 🔄 (Reload)
2. Ou clicar com botão direito no pom.xml → Maven → Reload Project
3. Se persistir: File → Invalidate Caches → Invalidate and Restart
```

---

### A.2 MySQL Workbench

#### Porquê MySQL Workbench?

**MySQL Workbench** é a ferramenta oficial da Oracle para gerir bases de dados MySQL.

**Vantagens:**

- ✅ Interface gráfica intuitiva
- ✅ Editor SQL com autocomplete
- ✅ Visualização de tabelas e relações
- ✅ Diagrama ER automático
- ✅ Import/Export de dados
- ✅ Gratuito e open source

**Alternativas:**

- DBeaver (multi-plataforma)
- HeidiSQL (Windows)
- Sequel Pro (macOS)

Mas Workbench é o **padrão da indústria** para MySQL.

---

#### Instalação:

**Descarregar:**

```
https://dev.mysql.com/downloads/workbench/

Escolher versão para o seu sistema operativo
```

**Incluido no MySQL Installer (Windows):**

- MySQL Server
- MySQL Workbench
- MySQL Shell
- Conectores

**Recomendação**: Usar o "MySQL Installer" no Windows (tem tudo).

---

#### Primeira Configuração:

**Passo 1: Abrir MySQL Workbench**

**Passo 2: Conectar à Instância Local**

```
1. Na página inicial, clicar em:
   "Local instance MySQL80" (ou versão instalada)

2. Inserir palavra-passe do root
   - A mesma usada na instalação do MySQL Server

3. Opcional: ☑ Save password in vault
```

**Passo 3: Criar a Base de Dados do Projeto**

```sql
CREATE DATABASE escola_db;
```

```
Executar: Clicar em ⚡ (raio) ou Ctrl+Enter
```

**Passo 4: Definir como Schema Padrão**

```
1. Painel esquerdo (Navigator) → Schemas
2. Procurar "escola_db"
3. Botão direito → "Set as Default Schema"
4. O schema fica a negrito
```

---

#### Interface do Workbench:

**Painéis Principais:**

```
┌──────────────────────────────────────┐
│  Navigator (Esquerda)              │
│  - Schemas                         │
│  - Administration                  │
├──────────────────────────────────────┤
│  Query Editor (Centro)             │
│  - Escrever SQL                    │
│  - Executar queries                │
├──────────────────────────────────────┤
│  Result Grid (Baixo)               │
│  - Ver resultados                  │
│  - Editar dados                    │
└──────────────────────────────────────┘
```

---

#### Visualizar Tabelas Criadas pelo Spring Boot:

**Após executar a aplicação** (primeira vez):

```
1. No Navigator, expandir "escola_db"
2. Expandir "Tables"
3. Ver tabelas criadas:
   - alunos
   - cursos
   - professores
   - turmas
```

**Se não aparecerem:**

```
Clicar no 🔄 (Refresh) ao lado de "Schemas"
```

---

#### Queries Úteis:

**1. Ver Estrutura de Tabela:**

```sql
DESCRIBE alunos;
-- ou
SHOW COLUMNS FROM alunos;
```

**Resultado:**

```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | bigint       | NO   | PRI | NULL    | auto_increment |
| nome     | varchar(255) | NO   |     | NULL    |                |
| idade    | int          | NO   |     | NULL    |                |
| email    | varchar(255) | NO   | UNI | NULL    |                |
| turma_id | bigint       | YES  | MUL | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```

---

**2. Contar Registos:**

```sql
SELECT
    'Cursos' as tabela, COUNT(*) as total FROM cursos
UNION ALL
SELECT 'Professores', COUNT(*) FROM professores
UNION ALL
SELECT 'Turmas', COUNT(*) FROM turmas
UNION ALL
SELECT 'Alunos', COUNT(*) FROM alunos;
```

---

**3. Ver Dados com Relações (JOIN):**

```sql
-- Alunos com nome da turma
SELECT
    a.id,
    a.nome as aluno,
    a.email,
    t.nome as turma
FROM alunos a
LEFT JOIN turmas t ON a.turma_id = t.id
ORDER BY t.nome, a.nome;
```

```sql
-- Turmas com curso e professor
SELECT
    t.id,
    t.nome as turma,
    c.nome as curso,
    p.nome as professor
FROM turmas t
JOIN cursos c ON t.curso_id = c.id
JOIN professores p ON t.professor_id = p.id;
```

---

**4. Estatísticas:**

```sql
-- Alunos por turma
SELECT
    t.nome as turma,
    COUNT(a.id) as num_alunos,
    AVG(a.idade) as idade_media
FROM turmas t
LEFT JOIN alunos a ON t.id = a.turma_id
GROUP BY t.id, t.nome
ORDER BY num_alunos DESC;
```

---

**5. Procurar Dados:**

```sql
-- Alunos com mais de 20 anos
SELECT * FROM alunos WHERE idade > 20;

-- Alunos cujo nome contém "Silva"
SELECT * FROM alunos WHERE nome LIKE '%Silva%';

-- Professores de uma disciplina específica
SELECT * FROM professores WHERE disciplina = 'Programação Java';
```

---

#### Diagrama ER (Entity-Relationship):

**Gerar diagrama visual:**

```
1. Menu: Database → Reverse Engineer
2. Escolher conexão (Local instance)
3. Selecionar schema: escola_db
4. Next → Next → Execute
5. Workbench gera diagrama automático!
```

**Mostra:**

- Tabelas com campos
- Tipos de dados
- Chaves primárias (PK)
- Chaves estrangeiras (FK)
- Relações entre tabelas

---

#### Export/Import de Dados:

**Exportar para CSV:**

```sql
SELECT * FROM alunos;
-- Após executar:
-- Botão direito no Result Grid → Export → CSV
```

**Exportar Schema Completo:**

```
1. Menu: Server → Data Export
2. Selecionar "escola_db"
3. Escolher:
   - Export to Dump Project Folder (vários ficheiros)
   - ou Export to Self-Contained File (um ficheiro .sql)
4. Start Export
```

---

#### Integração com IntelliJ:

**Workflow recomendado:**

```
1. Desenvolver código no IntelliJ
2. Executar aplicação Spring Boot
3. Testar endpoints com Postman
4. Verificar dados no MySQL Workbench
5. Ajustar queries/estrutura se necessário
6. Voltar ao IntelliJ para correções
```

**Exemplo prático:**

```
Problema: "Aluno não aparece no GET /alunos"

1. Verificar no Workbench:
   SELECT * FROM alunos;

2. Se aluno existe na BD:
   - Problema no Service/Controller
   - Verificar logs no IntelliJ

3. Se aluno NÃO existe na BD:
   - POST não funcionou
   - Verificar validações
   - Ver erro no Postman
```

---

### A.3 Postman

#### Porquê Postman?

**Postman** é a ferramenta mais popular para testar APIs REST.

**Alternativas:**

- Insomnia
- cURL (linha de comandos)
- HTTPie
- IntelliJ HTTP Client (Ultimate only)

Mas Postman é o **padrão da indústria**.

---

#### Instalação:

```
https://www.postman.com/downloads/

Descarregar versão desktop (gratuita)
```

**Criar conta** (opcional mas recomendado):

- Sincroniza collections entre dispositivos
- Permite colaboração em equipa

---

#### Criar Collection para o Projeto:

```
1. Clicar em "Collections" (barra esquerda)
2. Clicar em "+" ou "Create Collection"
3. Nome: "API Escola Profissional"
4. Adicionar descrição (opcional)
```

**Estrutura recomendada:**

```
API Escola Profissional/
├── Cursos/
│   ├── GET Listar Cursos
│   ├── GET Curso por ID
│   ├── POST Criar Curso
│   ├── PUT Atualizar Curso
│   └── DELETE Apagar Curso
├── Professores/
│   ├── ...
├── Turmas/
│   ├── ...
│   └── GET Alunos da Turma
└── Alunos/
    ├── ...
```

---

#### Configurar Variáveis:

**Environment Variables** (reutilização):

```
1. Clicar em "Environments" (barra esquerda)
2. Criar novo: "Escola API Local"
3. Adicionar variáveis:
   - base_url: http://localhost:8080
   - aluno_id: 1
   - turma_id: 1
```

**Usar nas requests:**

```
URL: {{base_url}}/alunos/{{aluno_id}}
     ↓
     http://localhost:8080/alunos/1
```

---

#### Exemplo de Request Completa:

**POST /alunos**

```
Método: POST
URL: {{base_url}}/alunos

Headers:
  Content-Type: application/json

Body (raw, JSON):
{
  "nome": "João Silva",
  "idade": 22,
  "email": "joao.silva@aluno.com",
  "turmaId": 1
}
```

**Resultado esperado:**

```
Status: 201 Created

Body:
{
  "id": 5,
  "nome": "João Silva",
  "idade": 22,
  "email": "joao.silva@aluno.com",
  "turmaId": 1,
  "turmaNome": "Turma A - Web Full Stack"
}
```

---

#### Testes Automatizados no Postman:

**Tab "Tests"** (em cada request):

```javascript
// Verificar status code
pm.test("Status code is 201", function () {
  pm.response.to.have.status(201);
});

// Verificar estrutura JSON
pm.test("Response has id", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property("id");
  pm.expect(jsonData.id).to.be.a("number");
});

// Guardar ID para próxima request
pm.test("Save aluno ID", function () {
  var jsonData = pm.response.json();
  pm.environment.set("aluno_id", jsonData.id);
});
```

---

#### Workflow Completo de Testes:

**1. Testar Criação (POST):**

```
POST /cursos        → Guardar curso_id
POST /professores   → Guardar professor_id
POST /turmas        → Usar IDs anteriores, guardar turma_id
POST /alunos        → Usar turma_id, guardar aluno_id
```

**2. Testar Leitura (GET):**

```
GET /alunos         → Verificar aluno na lista
GET /alunos/{{aluno_id}} → Verificar detalhes
```

**3. Testar Atualização (PUT):**

```
PUT /alunos/{{aluno_id}} → Mudar email
GET /alunos/{{aluno_id}} → Confirmar mudança
```

**4. Testar Remoção (DELETE):**

```
DELETE /alunos/{{aluno_id}} → Apagar
GET /alunos/{{aluno_id}}    → Deve dar 404
```

---

### A.4 Workflow Completo de Desenvolvimento

#### Ciclo de Desenvolvimento Típico:

```
1. [IntelliJ] Escrever código
   ↓
2. [IntelliJ] Executar aplicação
   ↓
3. [Postman] Testar endpoints
   ↓
4. [Workbench] Verificar dados na BD
   ↓
5. [Browser] Ver documentação Swagger
   ↓
6. Encontrar bug?
   ↓
7. [IntelliJ] Debug com breakpoints
   ↓
8. [IntelliJ] Corrigir código
   ↓
9. Voltar ao passo 2
```

---

#### Exemplo Prático Completo:

**Tarefa**: Adicionar novo endpoint para buscar alunos por idade mínima.

**Passo 1: Repository** (IntelliJ)

```java
// AlunoRepository.java
List<Aluno> findByIdadeGreaterThanEqual(Integer idadeMinima);
```

**Passo 2: Service** (IntelliJ)

```java
// AlunoService.java
public List<AlunoDTO> findByIdadeMinima(Integer idade) {
    return alunoRepository.findByIdadeGreaterThanEqual(idade)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
}
```

**Passo 3: Controller** (IntelliJ)

```java
// AlunoController.java
@GetMapping("/idade/{minima}")
public ResponseEntity<List<AlunoDTO>> getByIdadeMinima(
        @PathVariable Integer minima) {
    return ResponseEntity.ok(alunoService.findByIdadeMinima(minima));
}
```

**Passo 4: Executar** (IntelliJ)

```
Run 'EscolaApiApplication'
```

**Passo 5: Testar** (Postman)

```
GET http://localhost:8080/alunos/idade/21

Resultado esperado: Lista de alunos com idade >= 21
```

**Passo 6: Verificar SQL** (Workbench)

```sql
-- Ver que query foi executada (logs do IntelliJ)
-- Verificar dados manualmente:
SELECT * FROM alunos WHERE idade >= 21;
```

**Passo 7: Documentar** (Swagger)

```
Abrir: http://localhost:8080/swagger-ui.html
Verificar: Novo endpoint aparece automaticamente!
```

---

### A.5 Recursos Adicionais

#### Documentação das Ferramentas:

- **IntelliJ IDEA**: https://www.jetbrains.com/help/idea/
- **MySQL Workbench**: https://dev.mysql.com/doc/workbench/en/
- **Postman**: https://learning.postman.com/

#### Tutoriais Vídeo:

- **IntelliJ for Beginners**: YouTube - JetBrains
- **MySQL Workbench Tutorial**: YouTube - Programming Knowledge
- **Postman Tutorial**: YouTube - Postman

#### Comunidades:

- **Stack Overflow**: https://stackoverflow.com/
- **Reddit**: r/java, r/springboot
- **Discord**: Spring Boot Community

---

**Desenvolvido com ❤️ para ensino de qualidade**

_Este manual foi criado para ajudar alunos a compreenderem não apenas o "como", mas também o "porquê" de cada decisão técnica na construção de uma API RESTful profissional._
