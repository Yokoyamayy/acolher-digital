# AcolherDigital — CACS

Plataforma de gestão unificada desenvolvida para apoiar o atendimento psicológico voluntário (psicoterapia breve) do **CACS (Centro Assistencial Cairbar Schutel)**, em conformidade com diretrizes de sigilo clínico do **CFP** e da **LGPD**.

O sistema centraliza o fluxo operacional e clínico da instituição — desde a inscrição e priorização na fila de triagem até o vínculo com psicólogos voluntários, agenda semanal, prontuário clínico protegido, gestão de usuários/permissões (RBAC), repositório de documentos e trilha de auditoria.

---

## Estrutura do Repositório

```text
acolher-digital/
├── backend/              # Diretório reservado para a implementação do backend (API/banco de dados)
├── frontend/             # Diretório reservado para a aplicação frontend definitiva
├── docs/                 # Documentação de design, estrutura cadastral e matriz RBAC
├── prototipo/            # Protótipo interativo funcional (desktop e mobile)
│   ├── prototipo.html    # Aplicação principal do protótipo
│   ├── public/           # Logotipos e ativos visuais
│   └── src/
│       └── config/
│           └── roles.js  # Definição de perfis, permissões e regras RBAC
└── README.md
```

---

## Como Baixar o Repositório

### Opção 1: Via Git (recomendado)

```bash
git clone https://github.com/Yokoyamayy/acolher-digital.git
cd acolher-digital
```

### Opção 2: Download manual (ZIP)

1. Acesse [https://github.com/Yokoyamayy/acolher-digital](https://github.com/Yokoyamayy/acolher-digital).
2. Clique em **Code** > **Download ZIP**.
3. Extraia o arquivo compactado na pasta de sua preferência.

---

## Como Acessar o Protótipo

O protótipo está na pasta `prototipo/` e não precisa de instalação de dependências para rodar — basta estar **conectado à internet** (para carregar Tailwind CSS, Phosphor Icons e fontes via CDN).

### Acesso direto pelo navegador (mais simples)

1. Abra a pasta `prototipo/`.
2. Dê um duplo clique no arquivo **`prototipo.html`** (ou clique com o botão direito > **Abrir com** > navegador de sua preferência).

### Opcional: servidor local (para desenvolvimento)

Caso prefira servir o protótipo via `http://localhost` (ex.: para usar rotas locais ou o Live Server do VS Code):

```bash
cd prototipo
python3 -m http.server 8080
```

Depois, acesse **`http://localhost:8080/prototipo.html`** no navegador.
