# Casa da Prece

Site estático em HTML, CSS e JavaScript, compilado com Vite.

## Desenvolvimento

Use a versão do Node.js indicada em `.node-version`.

```sh
npm ci
npm run dev
```

Antes de publicar, execute `npm run build`. Para conferir a versão de produção localmente, execute `npm run preview`.

## Publicação automática gratuita — Cloudflare Pages + GitHub

A integração nativa do Cloudflare executa o build e publica o site a cada push para `main`. Outras branches e pull requests podem gerar prévias para revisão. Não é necessário criar um workflow do GitHub Actions ou armazenar tokens no repositório.

Configuração inicial no painel Cloudflare:

1. Acesse **Workers & Pages → Create application → Pages → Connect to Git**.
2. Conecte o GitHub e autorize o repositório `luizborges17/teste`.
3. Preencha as configurações abaixo e selecione **Save and Deploy**.

| Campo | Valor |
| --- | --- |
| Plano | Free |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Deixar em branco (raiz do repositório) |
| Build command | `npm run build` |
| Build output directory | `dist` |

O Cloudflare instala as dependências antes do build e lê a versão do Node.js em `.node-version`. O diretório local se chama `teste`, mas o `package.json` está na raiz do repositório: não configure `teste` como Root directory.

Envie também as imagens de `img/logo` e `img/quentinhas` ao GitHub. `node_modules`, `dist` e o ZIP de publicação não precisam ser versionados.

O plano Free oferece 500 builds por mês, conforme documentação consultada em 13/09/2026. As prévias também consomem builds. Use o endereço gratuito `*.pages.dev`; um domínio próprio é opcional e tem custo separado.

Se o site já foi criado por upload de ZIP, esse projeto não pode ser convertido para a integração Git nativa. Crie um novo projeto integrado ao GitHub; ele terá outro endereço `pages.dev`. Mantenha o anterior até conferir a nova publicação.

## Alterações futuras

- Textos, links e contato: `index.html`.
- Programação semanal: estrutura `schedule` em `script.js`.
- Cores e layout: `styles.css`.
- Fotos do carrossel: `img/quentinhas` (inclusão automática no próximo build).
- Logo: imagem em `img/logo`, referenciada em `index.html`.

Faça as alterações em uma branch, envie ao GitHub e abra um pull request para conferir a prévia. Ao integrar o pull request na `main`, o Cloudflare publica a nova versão automaticamente. Alterações simples podem ser feitas pelo editor do GitHub e confirmadas em um commit.

A preparação local não ativa a integração: a conexão entre Cloudflare e GitHub precisa ser feita na conta do proprietário, e os arquivos atualizados precisam ser enviados ao repositório.

Referências:
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/configuration/build-image/
