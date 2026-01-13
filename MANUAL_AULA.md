# 📚 Manual de Aula - API RESTful Escola Profissional

### Duração: 3 Blocos de 1,5h cada (4,5h total)

---

## 🎯 BLOCO 1 (1,5h) - Setup e Primeiros Testes

### Objetivos do Bloco 1:

- ✅ Configurar ambiente (IntelliJ + MySQL)
- ✅ Executar a aplicação
- ✅ Testar endpoints básicos no Postman
- ✅ Criar registos iniciais

---

### 📋 Tarefa 1.1 - Configuração do Ambiente (25 min)

#### Passo 1: Instalar e Configurar MySQL Workbench

1. **Descarregar MySQL Server + Workbench**:

   - Ir para: https://dev.mysql.com/downloads/workbench/
   - Escolher "MySQL Installer for Windows" (inclui tudo) ou descarregar separadamente
   - Instalar MySQL Server e MySQL Workbench Community Edition

2. **Durante a instalação do MySQL Server**:

   - Escolher "Developer Default" ou "Server only"
   - **IMPORTANTE**: Anotar a palavra-passe do root (exemplo: root123)
   - Porta: manter 3306 (padrão)

3. **Abrir MySQL Workbench**:

   - Procurar no menu iniciar: "MySQL Workbench"
   - Clicar na ligação: **"Local instance MySQL80"** (ou similar)
   - Inserir a palavra-passe do root

4. **Criar a Base de Dados**:

   - No painel central, escrever:

   ```sql
   CREATE DATABASE escola_db;
   ```

   - Clicar no ⚡ (ícone de raio) ou pressionar `Ctrl+Enter`
   - Verificar mensagem: "1 row(s) affected"

5. **Configurar como Schema Padrão**:

   - No painel esquerdo (Navigator), procurar `escola_db`
   - Clicar com botão direito → **"Set as Default Schema"**
   - O schema fica a **negrito**

6. **Testar Ligação**:
   ```sql
   SHOW DATABASES;
   ```
   - Deve aparecer `escola_db` na lista ✅

#### Passo 2: Abrir o Projeto no IntelliJ IDEA Community

1. Abrir IntelliJ IDEA
2. `File` → `Open`
3. Selecionar pasta: `/Users/ruimartins/Desktop/APIRestfull`
4. Clicar `OK`
5. **Aguardar** o IntelliJ:
   - Detectar Maven
   - Descarregar dependências (pode demorar 2-5 min)
   - Indexar projeto

#### Passo 3: Configurar Credenciais MySQL no Projeto

1. No IntelliJ, abrir: `src/main/resources/application.properties`
2. **Alterar** a palavra-passe (usar a mesma do MySQL Workbench):

```properties
spring.datasource.username=root
spring.datasource.password=SUA_PALAVRA_PASSE_AQUI
```

3. **Guardar** (`Cmd+S` ou `Ctrl+S`)

**Exemplo**: Se usou "root123" no Workbench, colocar:

```properties
spring.datasource.password=root123
```

#### Passo 4: Executar a Aplicação

1. Navegar até: `src/main/java/com/escola/api/EscolaApiApplication.java`
2. Clicar no **▶️ verde** ao lado de `public class EscolaApiApplication`
3. Ou pressionar: `Shift + F10` (Windows) / `Ctrl + R` (macOS)
4. **Verificar console**: deve aparecer:

```
Started EscolaApiApplication in X.XXX seconds
```

#### ✅ Checkpoint 1: Testar se está a funcionar

Abrir navegador: http://localhost:8080/swagger-ui.html

- Se aparecer a documentação Swagger → **SUCESSO!** ✅

---

### 📋 Tarefa 1.2 - Configurar Postman (10 min)

#### Passo 1: Instalar Postman

- Descarregar: https://www.postman.com/downloads/
- Instalar e abrir

#### Passo 2: Criar Workspace

1. Clicar `Workspaces` → `Create Workspace`
2. Nome: **"Escola API"**
3. Tipo: **Personal**

#### Passo 3: Criar Collection

1. Clicar `Collections` → `+` (New Collection)
2. Nome: **"API Escola - Testes"**
3. Clicar `Save`

---

### 📋 Tarefa 1.3 - Criar Registos de Cursos (15 min)

**Objetivo**: Criar 5 cursos diferentes

#### Criar no Postman:

1. Na Collection, clicar `Add Request`
2. Nome: **"Criar Curso"**
3. Método: **POST**
4. URL: `http://localhost:8080/cursos`
5. Ir para aba **Body** → selecionar **raw** → **JSON**

#### Curso 1 - Desenvolvimento Web

```json
{
  "nome": "Desenvolvimento Web Full Stack",
  "duracao": 12
}
```

**Clicar `Send`** → Anotar o `id` retornado

#### Curso 2 - Mobile

```json
{
  "nome": "Desenvolvimento Mobile Android/iOS",
  "duracao": 10
}
```

#### Curso 3 - Data Science

```json
{
  "nome": "Ciência de Dados e Machine Learning",
  "duracao": 15
}
```

#### Curso 4 - DevOps

```json
{
  "nome": "DevOps e Cloud Computing",
  "duracao": 8
}
```

#### Curso 5 - Cibersegurança

```json
{
  "nome": "Cibersegurança e Ethical Hacking",
  "duracao": 14
}
```

#### ✅ Verificar Cursos Criados

1. Nova Request: **GET** `http://localhost:8080/cursos`
2. Deve retornar array com 5 cursos
3. **Anotar os IDs de cada curso** (vamos precisar depois!)

---

### 📋 Tarefa 1.4 - Criar Registos de Professores (20 min)

**Objetivo**: Criar 8 professores

#### Criar Request no Postman:

- Nome: **"Criar Professor"**
- Método: **POST**
- URL: `http://localhost:8080/professores`
- Body: **raw** → **JSON**

#### Professor 1

```json
{
  "nome": "Dr. João Silva",
  "disciplina": "Programação Java",
  "email": "joao.silva@escola.com"
}
```

#### Professor 2

```json
{
  "nome": "Profª Ana Costa",
  "disciplina": "Bases de Dados",
  "email": "ana.costa@escola.com"
}
```

#### Professor 3

```json
{
  "nome": "Dr. Pedro Santos",
  "disciplina": "Desenvolvimento Frontend",
  "email": "pedro.santos@escola.com"
}
```

#### Professor 4

```json
{
  "nome": "Profª Maria Oliveira",
  "disciplina": "Python e Data Science",
  "email": "maria.oliveira@escola.com"
}
```

#### Professor 5

```json
{
  "nome": "Eng. Carlos Ferreira",
  "disciplina": "Redes e Segurança",
  "email": "carlos.ferreira@escola.com"
}
```

#### Professor 6

```json
{
  "nome": "Dr. Ricardo Almeida",
  "disciplina": "Cloud Computing",
  "email": "ricardo.almeida@escola.com"
}
```

#### Professor 7

```json
{
  "nome": "Profª Sofia Rodrigues",
  "disciplina": "Mobile Development",
  "email": "sofia.rodrigues@escola.com"
}
```

#### Professor 8

```json
{
  "nome": "Dr. Bruno Pereira",
  "disciplina": "Inteligência Artificial",
  "email": "bruno.pereira@escola.com"
}
```

#### ✅ Verificar Professores

1. Request: **GET** `http://localhost:8080/professores`
2. **Anotar os IDs** de cada professor

---

### 📋 Tarefa 1.5 - Testes CRUD Básicos (25 min)

#### Teste 1: Atualizar um Curso

1. Request: **PUT** `http://localhost:8080/cursos/1`
2. Body:

```json
{
  "nome": "Desenvolvimento Web Full Stack - Avançado",
  "duracao": 14
}
```

#### Teste 2: Buscar Curso por ID

1. Request: **GET** `http://localhost:8080/cursos/1`
2. Verificar que o nome foi atualizado

#### Teste 3: Atualizar Professor

1. Request: **PUT** `http://localhost:8080/professores/1`
2. Body:

```json
{
  "nome": "Dr. João Silva Júnior",
  "disciplina": "Programação Java Avançada",
  "email": "joao.silva@escola.com"
}
```

#### Teste 4: Tentar Email Duplicado (deve dar erro!)

1. Request: **POST** `http://localhost:8080/professores`
2. Body:

```json
{
  "nome": "Teste Duplicado",
  "disciplina": "Teste",
  "email": "joao.silva@escola.com"
}
```

3. **Resultado esperado**: Erro 409 (Conflict) ✅

---

### ✅ FIM DO BLOCO 1 - Checklist

Antes de terminar, verificar:

- [ ] MySQL Workbench instalado e a funcionar
- [ ] Base de dados `escola_db` criada no Workbench
- [ ] Aplicação a correr no IntelliJ
- [ ] Swagger UI acessível (http://localhost:8080/swagger-ui.html)
- [ ] 5 Cursos criados
- [ ] 8 Professores criados
- [ ] Testado UPDATE em curso e professor
- [ ] Testada validação de email duplicado
- [ ] Postman organizado com todas as requests

**Pergunta ao Professor**: "Consegui criar todos os registos?" 🙋

**Dica**: Pode usar o MySQL Workbench para ver as tabelas criadas:

```sql
USE escola_db;
SHOW TABLES;
SELECT * FROM cursos;
SELECT * FROM professores;
```

---

---

## 🎯 BLOCO 2 (1,5h) - Turmas e Relacionamentos

### Objetivos do Bloco 2:

- ✅ Criar turmas com relacionamentos
- ✅ Criar alunos e associar a turmas
- ✅ Testar endpoints de relacionamentos
- ✅ Popular a base de dados com muitos registos

---

### 📋 Tarefa 2.1 - Criar Turmas (20 min)

**Objetivo**: Criar 6 turmas diferentes

#### Criar Request no Postman:

- Nome: **"Criar Turma"**
- Método: **POST**
- URL: `http://localhost:8080/turmas`

**IMPORTANTE**: Substituir `cursoId` e `professorId` pelos IDs reais que anotou!

#### Turma 1

```json
{
  "nome": "Turma A - Web Full Stack",
  "cursoId": 1,
  "professorId": 1
}
```

#### Turma 2

```json
{
  "nome": "Turma B - Web Full Stack",
  "cursoId": 1,
  "professorId": 3
}
```

#### Turma 3

```json
{
  "nome": "Turma A - Mobile Development",
  "cursoId": 2,
  "professorId": 7
}
```

#### Turma 4

```json
{
  "nome": "Turma A - Data Science",
  "cursoId": 3,
  "professorId": 4
}
```

#### Turma 5

```json
{
  "nome": "Turma A - DevOps",
  "cursoId": 4,
  "professorId": 6
}
```

#### Turma 6

```json
{
  "nome": "Turma A - Cibersegurança",
  "cursoId": 5,
  "professorId": 5
}
```

#### ✅ Verificar Turmas

Request: **GET** `http://localhost:8080/turmas`

- Deve retornar 6 turmas com informações de curso e professor

---

### 📋 Tarefa 2.2 - Criar Muitos Alunos! (40 min)

**Objetivo**: Criar 30 alunos distribuídos pelas turmas

#### Request Postman:

- Nome: **"Criar Aluno"**
- Método: **POST**
- URL: `http://localhost:8080/alunos`

**DICA**: Alterar só nome, email e turmaId. Copiar/colar acelera!

#### Turma 1 - 6 Alunos

```json
{
  "nome": "João Pedro Martins",
  "idade": 22,
  "email": "joao.martins@aluno.com",
  "turmaId": 1
}
```

```json
{
  "nome": "Maria Eduarda Santos",
  "idade": 20,
  "email": "maria.santos@aluno.com",
  "turmaId": 1
}
```

```json
{
  "nome": "André Filipe Costa",
  "idade": 23,
  "email": "andre.costa@aluno.com",
  "turmaId": 1
}
```

```json
{
  "nome": "Beatriz Silva Oliveira",
  "idade": 21,
  "email": "beatriz.oliveira@aluno.com",
  "turmaId": 1
}
```

```json
{
  "nome": "Ricardo Manuel Sousa",
  "idade": 24,
  "email": "ricardo.sousa@aluno.com",
  "turmaId": 1
}
```

```json
{
  "nome": "Carolina Ferreira Lima",
  "idade": 19,
  "email": "carolina.lima@aluno.com",
  "turmaId": 1
}
```

#### Turma 2 - 5 Alunos

```json
{
  "nome": "Tiago Alexandre Rodrigues",
  "idade": 22,
  "email": "tiago.rodrigues@aluno.com",
  "turmaId": 2
}
```

```json
{
  "nome": "Ana Rita Almeida",
  "idade": 20,
  "email": "ana.almeida@aluno.com",
  "turmaId": 2
}
```

```json
{
  "nome": "Bruno Miguel Pereira",
  "idade": 23,
  "email": "bruno.pereira@aluno.com",
  "turmaId": 2
}
```

```json
{
  "nome": "Sofia Isabel Fernandes",
  "idade": 21,
  "email": "sofia.fernandes@aluno.com",
  "turmaId": 2
}
```

```json
{
  "nome": "Pedro Henrique Gomes",
  "idade": 22,
  "email": "pedro.gomes@aluno.com",
  "turmaId": 2
}
```

#### Turma 3 - 5 Alunos

```json
{
  "nome": "Diogo Rafael Carvalho",
  "idade": 20,
  "email": "diogo.carvalho@aluno.com",
  "turmaId": 3
}
```

```json
{
  "nome": "Inês Maria Lopes",
  "idade": 19,
  "email": "ines.lopes@aluno.com",
  "turmaId": 3
}
```

```json
{
  "nome": "Miguel Ângelo Dias",
  "idade": 22,
  "email": "miguel.dias@aluno.com",
  "turmaId": 3
}
```

```json
{
  "nome": "Catarina Sofia Pinto",
  "idade": 21,
  "email": "catarina.pinto@aluno.com",
  "turmaId": 3
}
```

```json
{
  "nome": "Gonçalo José Ribeiro",
  "idade": 23,
  "email": "goncalo.ribeiro@aluno.com",
  "turmaId": 3
}
```

#### Turma 4 - 5 Alunos

```json
{
  "nome": "Rafael Tiago Mendes",
  "idade": 24,
  "email": "rafael.mendes@aluno.com",
  "turmaId": 4
}
```

```json
{
  "nome": "Mariana Isabel Castro",
  "idade": 20,
  "email": "mariana.castro@aluno.com",
  "turmaId": 4
}
```

```json
{
  "nome": "Hugo Daniel Monteiro",
  "idade": 22,
  "email": "hugo.monteiro@aluno.com",
  "turmaId": 4
}
```

```json
{
  "nome": "Leonor Teresa Nunes",
  "idade": 21,
  "email": "leonor.nunes@aluno.com",
  "turmaId": 4
}
```

```json
{
  "nome": "Fábio André Correia",
  "idade": 23,
  "email": "fabio.correia@aluno.com",
  "turmaId": 4
}
```

#### Turma 5 - 5 Alunos

```json
{
  "nome": "Daniel Fernando Teixeira",
  "idade": 22,
  "email": "daniel.teixeira@aluno.com",
  "turmaId": 5
}
```

```json
{
  "nome": "Rita Alexandra Moreira",
  "idade": 20,
  "email": "rita.moreira@aluno.com",
  "turmaId": 5
}
```

```json
{
  "nome": "Nuno Miguel Cardoso",
  "idade": 24,
  "email": "nuno.cardoso@aluno.com",
  "turmaId": 5
}
```

```json
{
  "nome": "Joana Filipa Baptista",
  "idade": 21,
  "email": "joana.baptista@aluno.com",
  "turmaId": 5
}
```

```json
{
  "nome": "Luís Pedro Marques",
  "idade": 23,
  "email": "luis.marques@aluno.com",
  "turmaId": 5
}
```

#### Turma 6 - 4 Alunos

```json
{
  "nome": "Vasco Manuel Silva",
  "idade": 22,
  "email": "vasco.silva@aluno.com",
  "turmaId": 6
}
```

```json
{
  "nome": "Francisca Isabel Ramos",
  "idade": 20,
  "email": "francisca.ramos@aluno.com",
  "turmaId": 6
}
```

```json
{
  "nome": "Rodrigo Paulo Araújo",
  "idade": 23,
  "email": "rodrigo.araujo@aluno.com",
  "turmaId": 6
}
```

```json
{
  "nome": "Marta Cristina Barbosa",
  "idade": 21,
  "email": "marta.barbosa@aluno.com",
  "turmaId": 6
}
```

---

### 📋 Tarefa 2.3 - Testar Endpoint Especial (15 min)

#### Teste: Listar Alunos de uma Turma

**Request 1**: Alunos da Turma 1

- Método: **GET**
- URL: `http://localhost:8080/turmas/1/alunos`
- **Resultado esperado**: 6 alunos ✅

**Request 2**: Alunos da Turma 4

- URL: `http://localhost:8080/turmas/4/alunos`
- **Resultado esperado**: 5 alunos ✅

#### Teste: Buscar Turma com Detalhes

- Método: **GET**
- URL: `http://localhost:8080/turmas/1`
- **Verificar**: Deve mostrar nome do curso e professor ✅

---

### 📋 Tarefa 2.4 - Exercício Livre (15 min)

**Desafio para os alunos**:

1. **Criar mais 3 alunos** em turmas diferentes
2. **Atualizar** um aluno para mudar de turma
3. **Apagar** um aluno (à escolha)
4. **Buscar** todos os alunos e contar quantos ficaram

#### Exemplo - Mudar Aluno de Turma:

```
PUT http://localhost:8080/alunos/5
```

```json
{
  "nome": "Ricardo Manuel Sousa",
  "idade": 24,
  "email": "ricardo.sousa@aluno.com",
  "turmaId": 3
}
```

---

### ✅ FIM DO BLOCO 2 - Checklist

- [ ] 6 Turmas criadas
- [ ] 30+ Alunos criados
- [ ] Testado endpoint `/turmas/{id}/alunos`
- [ ] Testado UPDATE de aluno
- [ ] Testado DELETE de aluno
- [ ] Base de dados bem preenchida

**Pergunta ao Professor**: "Tenho pelo menos 30 alunos criados?" 🙋

**Bonus - Ver dados no MySQL Workbench**:

```sql
-- Contar registos
SELECT COUNT(*) as total_alunos FROM alunos;
SELECT COUNT(*) as total_turmas FROM turmas;

-- Ver alunos por turma
SELECT t.nome as turma, COUNT(a.id) as num_alunos
FROM turmas t
LEFT JOIN alunos a ON t.id = a.turma_id
GROUP BY t.id, t.nome;
```

---

---

## 🎯 BLOCO 3 (1,5h) - Testes Avançados e Swagger

### Objetivos do Bloco 3:

- ✅ Explorar documentação Swagger
- ✅ Testes de validação e erros
- ✅ Testes de performance
- ✅ Criar cenários complexos

---

### 📋 Tarefa 3.1 - Explorar Swagger UI (20 min)

#### Passo 1: Abrir Swagger

1. Navegador: http://localhost:8080/swagger-ui.html
2. **Explorar** cada secção:
   - Alunos Controller
   - Professores Controller
   - Cursos Controller
   - Turmas Controller

#### Passo 2: Testar no Swagger

1. Clicar em **GET /alunos**
2. Clicar **"Try it out"**
3. Clicar **"Execute"**
4. Verificar resposta

#### Passo 3: Criar Aluno pelo Swagger

1. Abrir **POST /alunos**
2. **"Try it out"**
3. Editar JSON no campo "Request body"
4. **"Execute"**

**Exercício**: Criar 2 alunos usando APENAS o Swagger

---

### 📋 Tarefa 3.2 - Testes de Validação (25 min)

**Objetivo**: Forçar erros para testar validações

#### Teste 1: Email Inválido

```
POST http://localhost:8080/alunos
```

```json
{
  "nome": "Teste Validação",
  "idade": 20,
  "email": "email-invalido",
  "turmaId": 1
}
```

**Resultado esperado**: Erro 400 - "Email deve ser válido" ✅

#### Teste 2: Campo Obrigatório Vazio

```json
{
  "nome": "",
  "idade": 20,
  "email": "teste@email.com",
  "turmaId": 1
}
```

**Resultado esperado**: Erro 400 - "Nome é obrigatório" ✅

#### Teste 3: Idade Nula

```json
{
  "nome": "Teste",
  "idade": null,
  "email": "teste2@email.com",
  "turmaId": 1
}
```

**Resultado esperado**: Erro 400 ✅

#### Teste 4: Professor Duplicado

```
POST http://localhost:8080/professores
```

```json
{
  "nome": "Duplicado",
  "disciplina": "Teste",
  "email": "joao.silva@escola.com"
}
```

**Resultado esperado**: Erro 409 - "Email já registado" ✅

#### Teste 5: Turma Inexistente

```
POST http://localhost:8080/alunos
```

```json
{
  "nome": "Teste Turma",
  "idade": 20,
  "email": "teste.turma@email.com",
  "turmaId": 999
}
```

**Resultado esperado**: Erro 404 - "Turma não encontrada" ✅

#### Teste 6: Buscar ID Inexistente

```
GET http://localhost:8080/alunos/9999
```

**Resultado esperado**: Erro 404 ✅

---

### 📋 Tarefa 3.3 - Cenários Complexos (30 min)

#### Cenário 1: Gestão Completa de Curso

**Passo a passo**:

1. Criar novo curso: "Big Data Analytics" (duração: 16 meses)
2. Criar novo professor: "Dr. Paulo Data" (email: paulo.data@escola.com)
3. Criar turma com esse curso e professor
4. Adicionar 5 alunos nessa turma
5. Listar alunos da turma
6. Atualizar nome do curso
7. Verificar se a turma mostra o nome atualizado

#### Cenário 2: Migração de Alunos

**Objetivo**: Mover 3 alunos da Turma 1 para Turma 2

1. Listar alunos da Turma 1
2. Escolher 3 alunos (anotar IDs)
3. Para cada aluno, fazer PUT alterando `turmaId` para 2
4. Listar alunos da Turma 2 → deve ter +3 alunos
5. Listar alunos da Turma 1 → deve ter -3 alunos

#### Cenário 3: Análise de Dados

**Tarefas**:

1. Contar quantos cursos existem
2. Contar quantos professores existem
3. Contar quantas turmas existem
4. Contar quantos alunos existem no total
5. Identificar qual turma tem mais alunos
6. Identificar qual turma tem menos alunos

#### Cenário 4: Cleanup

**Objetivo**: Apagar registos de forma organizada

1. Escolher 1 aluno para apagar
2. **DELETE** do aluno
3. Verificar que já não aparece na listagem
4. Verificar que a turma dele continua a existir
5. Tentar buscar o aluno apagado por ID → deve dar 404 ✅

---

### 📋 Tarefa 3.4 - Criar Collection Postman Completa (15 min)

**Objetivo**: Organizar todas as requests

#### Estrutura da Collection:

```
📁 API Escola - Testes
  📂 Cursos
    ├─ GET Listar Cursos
    ├─ GET Buscar Curso por ID
    ├─ POST Criar Curso
    ├─ PUT Atualizar Curso
    └─ DELETE Apagar Curso

  📂 Professores
    ├─ GET Listar Professores
    ├─ GET Buscar Professor por ID
    ├─ POST Criar Professor
    ├─ PUT Atualizar Professor
    └─ DELETE Apagar Professor

  📂 Turmas
    ├─ GET Listar Turmas
    ├─ GET Buscar Turma por ID
    ├─ GET Listar Alunos da Turma
    ├─ POST Criar Turma
    ├─ PUT Atualizar Turma
    └─ DELETE Apagar Turma

  📂 Alunos
    ├─ GET Listar Alunos
    ├─ GET Buscar Aluno por ID
    ├─ POST Criar Aluno
    ├─ PUT Atualizar Aluno
    └─ DELETE Apagar Aluno

  📂 Testes de Validação
    ├─ Email Inválido
    ├─ Campo Obrigatório Vazio
    ├─ Email Duplicado
    └─ ID Inexistente
```

**Acção**: Criar todas estas requests organizadas

---

### 📋 Tarefa 3.5 - Desafio Final (20 min)

**Desafio Completo** (fazer tudo em sequência):

1. **Criar** novo curso "Blockchain Development" (18 meses)
2. **Criar** novo professor "Dr. Crypto Master" (disciplina: "Blockchain", email: crypto@escola.com)
3. **Criar** 2 turmas para esse curso (com professores diferentes)
4. **Criar** 10 alunos no total (5 em cada turma)
5. **Mover** 2 alunos de uma turma para outra
6. **Atualizar** o nome de 1 aluno
7. **Apagar** 1 aluno
8. **Listar** alunos de cada turma para confirmar
9. **Exportar** Collection do Postman com todos os testes

---

### ✅ FIM DO BLOCO 3 - Checklist Final

- [ ] Explorado Swagger UI completamente
- [ ] Testados todos os tipos de erro (400, 404, 409)
- [ ] Cenários complexos executados
- [ ] Collection Postman organizada
- [ ] Desafio final concluído
- [ ] Base de dados com 40+ alunos

---

## 📊 Resumo Final da Aula

### Estatísticas Esperadas:

- ✅ **Cursos**: 6-7 registos
- ✅ **Professores**: 8-10 registos
- ✅ **Turmas**: 8-10 registos
- ✅ **Alunos**: 40-50 registos

### Conhecimentos Adquiridos:

1. ✅ Configurar projeto Spring Boot no IntelliJ
2. ✅ Executar aplicação REST
3. ✅ Usar Postman para testes de API
4. ✅ Compreender CRUD completo
5. ✅ Testar relações (OneToMany, ManyToOne)
6. ✅ Validar dados e tratar erros
7. ✅ Usar documentação Swagger
8. ✅ Criar cenários de teste complexos

---

## 🎓 Avaliação Sugerida

### Critérios:

- **Bloco 1** (30%): Setup correto + registos iniciais
- **Bloco 2** (40%): Turmas e alunos criados + testes de relações
- **Bloco 3** (30%): Testes de validação + cenários complexos + organização

### Entregáveis:

1. Collection Postman exportada (.json)
2. Screenshot do Swagger UI funcionando
3. Screenshot do console IntelliJ com aplicação a correr
4. Lista com quantidade de registos criados

---

## 💡 Dicas para o Professor

### Durante o Bloco 1:

- Circular pelas mesas para ajudar com instalação do MySQL Workbench
- Garantir que todos criaram a base de dados `escola_db`
- Verificar se todos conseguem abrir o Swagger
- Confirmar que todos têm Postman instalado
- **Mostrar no ecrã**: Como criar database no Workbench

### Durante o Bloco 2:

- Ajudar com o conceito de relações
- Explicar a diferença entre ManyToOne e OneToMany
- Mostrar como os IDs são usados para criar relações

### Durante o Bloco 3:

- Explicar a importância dos testes de validação
- Mostrar como os erros HTTP são tratados
- Discutir boas práticas de API REST

### Problemas Comuns:

1. **MySQL não liga**:

   - Verificar se MySQL Server está a correr (ver Services no Windows)
   - Confirmar palavra-passe no application.properties
   - Testar ligação no MySQL Workbench primeiro

2. **Erro 404 em tudo**:

   - Aplicação não está a correr no IntelliJ
   - Verificar console do IntelliJ para erros

3. **Email duplicado**:

   - Explicar a validação de unicidade
   - Mostrar erro 409 (Conflict) no Postman

4. **Turma não encontrada**:

   - IDs incorretos no JSON
   - Verificar IDs reais no MySQL Workbench: `SELECT id, nome FROM turmas;`

5. **Tabelas não aparecem no Workbench**:
   - Clicar no 🔄 (refresh) no painel Schemas
   - Expandir `escola_db` → `Tables`

---

## 📚 Recursos Adicionais

- **Documentação Spring Boot**: https://spring.io/projects/spring-boot
- **Postman Learning**: https://learning.postman.com/
- **HTTP Status Codes**: https://httpstatuses.com/
- **REST API Best Practices**: https://restfulapi.net/
- **MySQL Workbench Manual**: https://dev.mysql.com/doc/workbench/en/

---

## 🔧 Queries Úteis no MySQL Workbench

### Consultas Básicas para Verificação:

```sql
-- Ver todas as tabelas criadas
SHOW TABLES;

-- Ver estrutura de uma tabela
DESCRIBE alunos;
DESCRIBE turmas;

-- Contar registos em cada tabela
SELECT 'Cursos' as tabela, COUNT(*) as total FROM cursos
UNION ALL
SELECT 'Professores', COUNT(*) FROM professores
UNION ALL
SELECT 'Turmas', COUNT(*) FROM turmas
UNION ALL
SELECT 'Alunos', COUNT(*) FROM alunos;
```

### Queries com Relacionamentos:

```sql
-- Ver turmas com curso e professor
SELECT
    t.id,
    t.nome as turma,
    c.nome as curso,
    p.nome as professor
FROM turmas t
JOIN cursos c ON t.curso_id = c.id
JOIN professores p ON t.professor_id = p.id;

-- Ver alunos com turma
SELECT
    a.id,
    a.nome as aluno,
    a.email,
    t.nome as turma
FROM alunos a
LEFT JOIN turmas t ON a.turma_id = t.id
ORDER BY t.nome, a.nome;

-- Estatísticas por turma
SELECT
    t.nome as turma,
    COUNT(a.id) as num_alunos,
    AVG(a.idade) as idade_media
FROM turmas t
LEFT JOIN alunos a ON t.id = a.turma_id
GROUP BY t.id, t.nome
ORDER BY num_alunos DESC;
```

### Queries para Limpeza (Cuidado!):

```sql
-- ATENÇÃO: Estas queries apagam dados!
-- Usar apenas se precisar recomeçar do zero

-- Apagar todos os alunos
DELETE FROM alunos;

-- Apagar todas as turmas
DELETE FROM turmas;

-- Apagar todos os professores
DELETE FROM professores;

-- Apagar todos os cursos
DELETE FROM cursos;

-- Resetar auto_increment (opcional)
ALTER TABLE alunos AUTO_INCREMENT = 1;
ALTER TABLE turmas AUTO_INCREMENT = 1;
ALTER TABLE professores AUTO_INCREMENT = 1;
ALTER TABLE cursos AUTO_INCREMENT = 1;
```

---

**Boa Aula! 🚀**
