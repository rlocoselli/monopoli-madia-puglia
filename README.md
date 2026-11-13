# Monopoli · Mare, storia e fede

Sito statico multilingue dedicato a Monopoli, alla Madonna della Madia e alla Puglia. Creato da **Rodrigo Locoselli**. È disponibile in italiano, inglese, francese, spagnolo e portoghese.

## Contenuti

- Pagina principale con storia della città, luoghi, territorio, fotografie e sezione personale.
- Pagina dedicata alla Madonna della Madia (`/madonna-della-madia.html`).
- Link al libro su Amazon e a Meu Busão.
- Feed RSS (`/feed.xml`), sitemap (`/sitemap.xml`) e `robots.txt`.

Il sito è in `dist/` e non richiede Node.js né una fase di build. Le fotografie usate dal sito sono incluse in `dist/`; le rispettive attribuzioni e i link alle fonti sono nelle pagine HTML.

## Avvio con Docker

```bash
docker build -t monopoli-madia-puglia .
docker run --rm -p 8080:8080 monopoli-madia-puglia
```

Apri <http://localhost:8080/>. Il controllo di salute risponde su <http://localhost:8080/healthz>.

## Deploy su un servizio Docker, incluso Audela

Configura il servizio usando questa repository come sorgente:

| Impostazione | Valore |
| --- | --- |
| Branch | `main` |
| Dockerfile | `Dockerfile` nella radice |
| Contesto di build | Radice della repository (`.`) |
| Porta HTTP interna | `8080` |
| Health check | `/healthz` |
| Variabili d'ambiente | Nessuna richiesta |
| Volume persistente | Non richiesto |

Il container serve direttamente i file statici tramite NGINX. Imposta il dominio e HTTPS nel proxy o nella piattaforma che ospita il container. Se Audela richiede un registro di immagini invece del build da Git, costruisci l'immagine con il comando sopra e pubblicala nel registro configurato dal tuo ambiente.

## Aggiornamenti

Modifica i file in `dist/`, crea un commit e invialo al branch `main`. Il sito usa anche un deployment Sites indipendente: il push su GitHub non aggiorna automaticamente quel deployment.

## Fonti

- [Comune di Monopoli](https://www.comune.monopoli.ba.it/)
- [Diocesi di Conversano-Monopoli](https://www.diocesiconversanomonopoli.it/)
- [Turismo Puglia](https://www.viaggiareinpuglia.it/)

Il racconto dell'approdo della Madonna della Madia è presentato come tradizione devozionale. Per orari, celebrazioni ed eventi, consulta sempre i canali ufficiali aggiornati.
