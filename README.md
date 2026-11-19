# Felipe Mello Padula · Creative Art Director

Portfólio em React + Vite, layout inspirado no Werkstatt (text style).

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview
```

## Onde mexer

* `src/data/works.ts` · os 10 cases (mesmo arquivo do site anterior). A ordem aqui é a ordem da home. `cover` é a imagem que aparece no hover, `coverVideo` é o vídeo de capa (quando existe, ele toca no hover). `coverMobile` e `coverVideoMobile` são os cortes verticais usados até 1024px.
* `src/data/caseDetails.ts` · ficha técnica, filme do case e peças com legenda (mesmo arquivo do site anterior).
* `src/i18n.jsx` · todos os textos de interface em `en` e `pt`. Inglês é o padrão; o botão EN / PT troca tudo e a escolha fica salva no navegador.
* `src/data/site.js` · email, WhatsApp, LinkedIn, Instagram e o endpoint do Formspree.
* `src/styles.css` · cores (`--accent` é o vermelho), fontes e layout.

## Como funciona

* Home: header com animação tipográfica (letras entram uma a uma, de vez em quando uma pula em vermelho, e a frase de baixo troca de palavra). Abaixo, a lista de projetos: passando o mouse no nome, o fundo troca para a capa do case (imagem ou vídeo). No celular não existe hover, então o projeto que está no meio da tela vira o ativo enquanto você rola.
* Case (`/work/<slug>`): página clara, como na referência. Título, tagline, insight e ideia à esquerda, ficha técnica à direita, capa, filme (Vimeo ou arquivo, só carrega no clique) e as peças.
* Sobre (`/about`) e Contato (`/contact`). O formulário usa o mesmo Formspree do site anterior (`mblnzewd`), então as mensagens chegam na mesma caixa. Botão de WhatsApp para +55 13 99118 8903.
* `/admin` · o painel de analytics do site anterior, intacto (fala com `/api/auth.php` e `/api/stats.php`). Os pageviews continuam indo para `/api/track.php`.

## Publicando

Os slugs dos cases são os mesmos do site no ar, então os links já enviados continuam funcionando.

1. `npm run build`
2. Suba o conteúdo de `dist/` para a raiz do servidor **sem apagar a pasta `/api`** (é ela que guarda o histórico do analytics).
3. O `.htaccess` vai junto no `dist/` e faz as URLs limpas (`/work/...`, `/about`, `/contact`) funcionarem no Apache.
