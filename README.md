

# Projeto de Login e Gerenciamento de Produtos com React Native

## 📋 Descrição do Projeto

Este projeto é um aplicativo móvel da Health Tech desenvolvido com **React Native**, que permite:

1. **Autenticação**:
   - Login com validação e navegação para o perfil do usuário.
2. **Gerenciamento de Produtos**:
   - Cadastro de novos produtos.
   - Edição e exclusão de produtos.
   - Visualização detalhada de cada produto.
   - Listagem de produtos com controle centralizado no estado global.

---

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **React Navigation**: Gerenciamento de navegação entre as telas.
- **Expo**: Ambiente para desenvolvimento e execução do projeto.
- **Fetch API** (ou local state): Simulação de um backend com dados gerenciados em estado local.

---

## 📁 Estrutura do Projeto

```plaintext
├── App.js                     # Configuração principal do aplicativo e estado global
├── screens                    # Telas do aplicativo
│   ├── LoginScreen.js         # Tela de Login
│   ├── UserProfile.js         # Tela de Perfil do Usuário
│   ├── ProductList.js         # Tela de Listagem de Produtos
│   ├── ProductDetails.js      # Tela de Detalhes do Produto
│   ├── AddProduct.js          # Tela de Cadastro e Edição de Produtos
├── assets                     # Recursos como imagens ou fontes
└── README.md                  # Documentação do projeto
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** instalado na máquina.
- Gerenciador de pacotes **npm** ou **yarn**.
- **Expo CLI** instalada globalmente:
  ```bash
  npm install -g expo-cli
  ```

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone git@github.com:VictorGovedice/HealthTech.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run web
   ```

4. Abra o aplicativo:
   - Utilize o **Expo Go** para escanear o QR Code exibido no terminal.
   - Ou execute em um emulador configurado.

---

## 🖥️ Funcionalidades do Projeto

### 1. Login
- Tela de login com validações básicas.
- Navegação para a página de perfil do usuário após o login bem-sucedido.

### 2. Gerenciamento de Produtos
#### a) **Listagem de Produtos** (`ProductList.js`)
- Exibe todos os produtos cadastrados.
- Permite deletar produtos diretamente.

#### b) **Cadastro de Produto** (`AddProduct.js`)
- Tela para adicionar um novo produto com campos como:
  - Nome
  - Descrição
  - Preço

#### c) **Edição de Produto** (`AddProduct.js`)
- Reutilização da tela de cadastro para editar produtos existentes.

#### d) **Detalhes do Produto** (`ProductDetails.js`)
- Exibe detalhes completos do produto selecionado.
- Opções para editar ou deletar o produto diretamente.

### 3. Perfil do Usuário
- Exibe as informações do usuário logado.
- Possui um botão **"Sair"** que retorna para a tela de login e limpa o estado de autenticação.

---

## ⚙️ Decisões Técnicas

### 1. **Gerenciamento Centralizado de Produtos**
- O estado global para produtos é mantido no arquivo `App.js`, permitindo que todas as telas acessem e modifiquem os produtos facilmente.

### 2. **Navegação com React Navigation**
- Cada tela é conectada ao `Stack.Navigator`, com parâmetros e funções passados dinamicamente via props.

### 3. **Design Modular**
- As telas foram separadas em arquivos independentes dentro da pasta `screens` para facilitar a organização e manutenção do código.

---

## 🛠️ Melhorias Futuras

- Implementar autenticação real com integração a um backend.
- Persistir os dados dos produtos em um banco de dados remoto.
- Adicionar notificações para feedback em ações como salvar ou deletar produtos.
- Melhorar o design do aplicativo com bibliotecas como **React Native Paper** ou **Material UI**.

---

## 📧 Contato

- **Nome**: Victor Hugo A. da S. Govedice
- **MyWebSite**: [seu-email@exemplo.com](https://victorgovedice.vercel.app/)
- **GitHub**: [Seu GitHub](https://github.com/seu-usuario)
