# Impact! — gala de boxe masqué

Site vitrine d'un événement fictif : cinq combattants en costume, deux soirs, une ceinture. 12 & 13 mars 2027, Halle Vulcain, Lyon.

Ouvrir `index.html` directement dans le navigateur (aucun build). Pages facultatives : une fiche par combattant (`braise.html`, `bulle.html`, `crete.html`, `tulipe.html`, `ourson.html`, `mystere.html`). Chaque carte de l'accueil est entièrement cliquable et mène à sa fiche ; la page prend la couleur de son combattant (`:root:has(.profile--bulle)` dans `css/tokens.css`). Les palmarès sont cohérents d'une fiche à l'autre (Grizzli, Pivoine et Mistral sont d'anciens combattants).

## Groupe

| | |
|---|---|
| Nom du groupe | _à compléter_ |
| Membres (et rôle référent) | 1. _…_ (référent·e architecture) · 2. _…_ (référent·e mise en page) · 3. _…_ (référent·e thème, animations et accessibilité) |
| Événement / thème | Thème libre (validé par l'enseignant) : gala de boxe masqué « Impact! » |
| Lien du dépôt Git (si Git) | _à compléter_ |
| Convention de nommage | BEM : `.bloc`, `.bloc__element`, `.bloc--variante` (ex. `.fighter`, `.fighter__name`, `.fighter__avatar--unknown`) ; utilitaires préfixés `u-` |

## Localisation des exigences

| Exigence | Élément attendu | Fichier:ligne | Commentaire (ce que ça fait, pourquoi) |
|---|---|---|---|
| 1. Architecture | Déclaration de l'ordre des `@layer` | `css/main.css:16` | Déclarée une seule fois, avant les `@import`. |
| 1. Architecture | Tokens primitifs | `css/tokens.css:16` | Palette (noirs, craie, rouge du coin, 2 tons par combattant), espacements, rayons « galet / dalle », bordures, durées, polices. |
| 1. Architecture | Tokens sémantiques | `css/tokens.css:88` | `--color-surface`, `--color-text`, `--color-accent`, `--color-border`, `--space-section`, `--radius-card`… Seuls ceux-ci sont utilisés dans `layout.css` et `components.css`. |
| 1. Architecture | Nesting natif (exemple représentatif) | `css/components.css:50` | `.btn { &:hover {…} &:active {…} }`, 3 niveaux au maximum dans tout le projet. |
| 2. Mise en page | `grid-template-areas` (mobile → desktop) | `css/layout.css:68` (hero), `css/layout.css:130` (programme) | Hero : `date / media / texte / actions` en colonne (vidéo dans le flux), puis dès 64rem la vidéo passe en fond du bloc et le texte se range en bas à gauche (`". ." "date ." "texte ." "actions ."`), avec un panneau sombre placé sur ces zones (`::before`, `grid-area: date / date / actions / actions`) pour garder le contraste. Programme : `intro / jour1 / jour2` puis `"intro intro" "jour1 jour2"`. |
| 2. Mise en page | `subgrid` | `css/layout.css:166` + `css/components.css:769` (offres) ; `css/components.css:356-364` (créneaux) ; `css/components.css:1100-1108` (historique, page 2) | Billetterie : chaque offre occupe 5 rangées de la grille parente (badge, nom, prix, liste, bouton) : prix, listes et boutons restent alignés même si une seule offre a un badge. Programme : les horaires et intitulés de tous les créneaux d'un jour partagent les mêmes colonnes. |
| 2. Mise en page | Flexbox pour un composant | `css/components.css:182` (`.nav__list`), `css/layout.css:10` (en-tête) | `display: flex; gap`, sans marges magiques. |
| 3. Responsive | Première media query mobile-first | `css/layout.css:17` | Styles de base pour 320 px, puis `@media (width >= 48rem)` et `(width >= 64rem)`. |
| 3. Responsive | Typographie fluide `clamp()` | `css/tokens.css:116` | `--font-size-h2: clamp(2.125rem, 1.2rem + 3.9vw, 4.75rem)` et toute l'échelle typo + espacements de section (`--space-section`, `--space-gutter`). |
| 3. Responsive | Container query (`container-type` + `@container`) et ses 2 contextes | `css/layout.css:150-153` + `css/components.css:523` | La même carte `.fighter` vit dans `.spotlight` (bandeau pleine largeur : avatar, texte et palmarès côte à côte) et dans chaque cellule de `.fighters` (~20rem : carte verticale). C'est la largeur du conteneur, pas de la fenêtre, qui décide. |
| 3. Responsive | Test 320 px sans défilement horizontal (correctif principal) | `css/layout.css:156` | Grilles en `repeat(auto-fill, minmax(min(100%, 20rem), 1fr))` : le `min(100%, …)` empêche une colonne de dépasser l'écran. Vérifié : `scrollWidth = 320` sur les deux pages. |
| 4. Sélecteurs | `:has()` pertinent | `css/components.css:750`, `css/tokens.css:178`, `css/components.css:243` | L'offre qui contient un badge est mise en avant ; le champion coché (`:root:has(#champion-braise:checked)`) recolore tout le site ; la bascule de thème se remplit quand sa case est cochée. |
| 4. Sélecteurs | `:is()` / `:where()` | `css/base.css:27`, `css/base.css:34` | `:is(h1, h2, h3, h4)` factorise la police de titre ; `:where(h1, h2, h3)` pour `text-wrap: balance` à spécificité nulle. |
| 5. Thème | `light-dark()` / `prefers-color-scheme` + `color-scheme` | `css/tokens.css:86-88` | `color-scheme: light dark` puis tous les sémantiques en `light-dark()` : « salle éteinte » (sombre) / « lumières allumées » (clair). Le thème suit le système par défaut. |
| 5. Thème (bonus technique) | Bascule CSS-only | `css/tokens.css:167-175`, `index.html:45` | Case `#theme-toggle` : `:root:has(#theme-toggle:checked)` inverse `color-scheme`, donc tous les `light-dark()` d'un coup, quel que soit le thème du système. |
| 6. Animations | Transition n°1 | `css/components.css:69` | Bouton : `translate` + `box-shadow` + couleurs ; au survol il « s'enfonce » de 3 px et son ombre raccourcit. |
| 6. Animations | Transition n°2 | `css/components.css:502` (`.fighter`) | Carte : `translate` + `box-shadow` au survol. Aussi : icône de FAQ (`rotate`), anneau du sélecteur de champion (`border-color`, `scale`). |
| 6. Animations | `@keyframes` | `css/components.css:1303` | `punch-in` sur le logo du hero (coup de poing à l'arrivée) ; `fade-down` à l'ouverture d'une réponse de FAQ. |
| 6. Animations | `prefers-reduced-motion` | `css/components.css:1336`, `css/utilities.css:18` | Les animations ne sont déclarées que sous `no-preference` ; en `reduce`, le layer `utilities` coupe animations, transitions, scroll fluide et View Transitions. Aucun élément ne démarre invisible hors animation. |
| 6. Animations (bonus technique) | Scroll-driven (`@supports`), View Transitions, `@starting-style`/popover… | `css/components.css:1342`, `css/base.css:9`, `css/components.css:561`, `css/components.css:175` | `animation-timeline: view()` dans `@supports` (Firefox : cartes simplement affichées) ; `@view-transition { navigation: auto }` + `view-transition-name: portrait-…` : le médaillon d'un combattant se transforme en grand portrait vers sa fiche ; menu mobile en Popover API animé avec `@starting-style`. |
| 7. Accessibilité | Landmarks + hiérarchie de titres | `index.html:28`, `index.html:52`, `index.html:358` | `header` / `nav` / `main` / `section` titrées (`aria-labelledby`) / `footer` ; un seul `h1` : le logo de l'en-tête sur l'accueil (`index.html:29`), puis h2 → h3 sans saut ; `lang="fr"` ; lien d'évitement. |
| 7. Accessibilité | `:focus-visible` | `css/base.css:52` | Anneau de 3 px décalé de 5 px, couleur du texte (donc contrasté dans les 2 thèmes et sur le rouge du hero). Reporté sur les libellés des champs masqués (`css/components.css:243`, `css/components.css:497`). |
| 7. Accessibilité | Contrastes AA vérifiés (outil + paires de couleurs testées, 2 thèmes) | `css/tokens.css:88` | Sombre : craie #F4F1EA / noir #0B0B0C 17,4:1 ; gris #9A9A9E / noir 7:1. Clair : noir / craie 17,4:1 ; gris #5E5E64 / craie ≈5,8:1. Hero : craie / rouge #A90000 ≈6,8:1. Tons clairs des combattants sous texte noir : 4,9:1 à 10,9:1. _Outil : à compléter (ex. WebAIM Contrast Checker)._ |
| 7. Accessibilité | Images avec `alt` | `index.html:92` | `alt` descriptifs sur les visuels porteurs de sens, `alt=""` sur les avatars du sélecteur (le nom est écrit à côté). Vidéo du hero : `aria-label` descriptif, sans son, en pause si mouvements réduits. |
| 8. Qualité | Résultat du validateur W3C | — | _À passer sur https://jigsaw.w3.org/css-validator/ et reporter ici._ |
| 8. Qualité | `!important` (aucun, ou utilitaire justifié) | — | Aucun : les conflits sont réglés par l'ordre des layers. |

## Avertissements du validateur W3C non corrigés

Syntaxes récentes que le validateur risque de ne pas reconnaître (à confirmer avec le validateur) :

| Fichier:ligne | Message du validateur | Pourquoi c'est valide |
|---|---|---|
| `css/tokens.css` | `light-dark()` | Baseline 2024. |
| tous les fichiers | Nesting natif (`&`) | Baseline 2023. |
| `css/layout.css`, `css/components.css` | `@container`, `container`, `cqi` | Baseline 2023. |
| `css/components.css` | `@starting-style`, `transition-behavior` via `allow-discrete`, `overlay` | Amélioration progressive. |
| `css/components.css` | `animation-timeline`, `animation-range` | Dans `@supports`, ignorées par Firefox. |
| `css/base.css` | `@view-transition` | Amélioration progressive. |

## Bonus technique revendiqué

| Fonctionnalité | Fichier:ligne | Explication (et repli prévu pour les navigateurs qui ne la gèrent pas) |
|---|---|---|
| Bascule de thème CSS-only | `css/tokens.css:167` | `:has()` sur une case à cocher. |
| Le site prend la couleur du champion | `css/tokens.css:178` | Boutons radio + `:root:has(:checked)` changent `--color-champion` (bordures, offre mise en avant, sélection). |
| Scroll-driven animations | `css/components.css:1342` | Dans `@supports (animation-timeline: view())` : sans support, les cartes sont simplement visibles. |
| View Transitions entre pages | `css/base.css:9` | Sans support : navigation classique. |
| Popover API + `@starting-style` | `index.html:33`, `css/components.css:175` | Menu mobile sans JS pour l'ouvrir. |

## JavaScript (facultatif, ≤ 20 lignes)

| Fichier:lignes | Ce que fait le code | Pourquoi ce n'était pas faisable en CSS |
|---|---|---|
| `js/main.js:5-9` | Ferme le menu mobile (popover) quand on clique sur un lien d'ancre. | Le popover s'ouvre et se ferme sans JS (bouton Menu / Fermer, Échap, clic dehors), mais un lien `<a href="#…">` ne peut pas porter `popovertarget` : sans ce code, le menu resterait ouvert par-dessus la section atteinte. |
| `js/main.js:10-12` | Met la vidéo du hero en pause si `prefers-reduced-motion: reduce`. | CSS ne peut pas mettre une `<video>` en pause ; l'attribut `autoplay` la lance toujours. |

## Déclaration d'usage d'outils d'IA

| Outil | Pour quoi faire (textes, explication d'une erreur, revue…) | Parties du code concernées |
|---|---|---|
| Claude Code (Anthropic) | Intégration de la maquette Figma en HTML/CSS, textes fictifs (FAQ), vérifications 320 px | `index.html`, `braise.html`, `css/*.css`, `js/main.js` |

> Rappel : chaque membre doit pouvoir expliquer chaque ligne en soutenance (question individuelle, critère H).

## Qui a fait quoi

| Membre | Principales contributions |
|---|---|
| | |
| | |
| | |

## Crédits

- Rendus 3D des combattants et vidéo du hero (Braise contre Ourson) : réalisés par le groupe.
- Polices : Goldman et Archivo, Google Fonts, licence SIL Open Font License.
- Logo « IMPACT! » : réalisé par le groupe.
