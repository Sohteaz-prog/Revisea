# Revisea

Appli de révision personnelle (« Psychopathologie : approches théoriques », janvier 2027).
Appli web installable, hors ligne, sans serveur ni compte : https://sohteaz-prog.github.io/revisea/

## Fichiers du dépôt (tous à la racine)

| Fichier | Rôle | Quand le déposer |
|---|---|---|
| `index.html` | toute l'appli : code, styles et polices | à chaque version |
| `sw.js` | hors ligne et mises à jour (porte le numéro de version) | à chaque version |
| `manifest.webmanifest` | installation sur le téléphone | une seule fois |
| `icone-192.png`, `icone-512.png` | icône (logo L7) | une seule fois |
| `README.md` | ce fichier | à chaque version finale |
| `contenu/` | un fichier JSON par chapitre (à partir de l'essai 2) | à chaque chapitre |

Publication : *Settings → Pages → Deploy from a branch → main / (root)*.
Les sources, les tests et l'état du projet sont dans le projet claude.ai « Psychopathologie 2027 » (`claude/SOURCES_revisea.txt`, `claude/ETAT_app.md`).

Polices intégrées : Inter et Source Serif 4, sous licence SIL Open Font License 1.1 (https://openfontlicense.org).
