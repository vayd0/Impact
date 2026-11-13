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
| 1. Architecture | Déclaration de l'ordre des `@layer` | `css/main.css:16` | Déclarée une seule fois, avant les `@import` ; chaque fichier est enveloppé dans son layer. |
| 1. Architecture | Tokens primitifs | `css/tokens.css:19` | Palette (noirs, craie, rouge, 2 tons par combattant), échelle d'espacement, rayons « galet / dalle », bordures, durées, polices. |
| 1. Architecture | Tokens sémantiques | `css/tokens.css:95` | Couleurs par rôle en `light-dark()`, alias d'espacement nommés (`--space-s`, `--space-section`…), tailles, mesures de texte, typographie fluide. Les composants n'utilisent que ces tokens. |
| 1. Architecture | Nesting natif (exemple représentatif) | `css/components.css:53` | `.btn { &:hover {…} &:active {…} }` ; `@media` et `@container` imbriqués dans le composant ; 3 niveaux au maximum. |
| 2. Mise en page | `grid-template-areas` (mobile → desktop) | `css/layout.css:73`, `css/layout.css:143` | Hero : `titre / date / media / texte / actions` empilés, puis dès 64rem la vidéo passe en fond et le texte se range en bas à gauche (`". ." "titre ." "date ." "texte ." "actions ."`). Programme : `intro / jour1 / jour2` puis `"intro intro" "jour1 jour2"`. |
| 2. Mise en page | `subgrid` | `css/layout.css:182-185` + `css/components.css:768` (offres) ; `css/components.css:366-374` (créneaux) ; `css/components.css:1123` (historique des fiches) | Billetterie : chaque offre occupe 5 rangées de la grille parente : prix, listes et boutons restent alignés même si une seule offre a un badge (démontrable en allongeant une liste). Programme : tous les créneaux d'un jour partagent les colonnes horaire / contenu. |
| 2. Mise en page | Flexbox pour un composant | `css/components.css:189`, `css/layout.css:12`, `css/components.css:308` | `display: flex`, `gap`, `flex-wrap`, raccourci `flex: 1 1 …` pour les boutons du hero. |
| 3. Responsive | Première media query mobile-first | `css/layout.css:19` | Styles de base pour 320 px, puis `@media (width >= 48rem)` et `(width >= 64rem)`. |
| 3. Responsive | Typographie fluide `clamp()` | `css/tokens.css:125` | Échelle complète en `clamp()` dans les tokens (display, h2, h3, corps…) + espacements de section et gouttières. |
| 3. Responsive | Container query (`container-type` + `@container`) et ses 2 contextes | `css/layout.css:166-169` + `css/components.css:536` | La même carte `.fighter` vit dans le bandeau du tenant du titre (large : avatar, texte et palmarès côte à côte) et dans chaque cellule de la grille (~20rem : carte verticale). Unité `cqi` pour la taille de l'avatar. Un conteneur ne pouvant pas être un subgrid (containment), l'alignement des cartes combattants se fait par lignes de grille fixes. |
| 3. Responsive | Test 320 px sans défilement horizontal (correctif principal) | `css/layout.css:76`, `css/layout.css:173`, `css/base.css:26` | `minmax(0, 1fr)` sur les sections, `min(100%, …)` dans les grilles, `overflow-wrap: break-word`. Vérifié sur les 7 pages : `scrollWidth = 320`. |
| 4. Sélecteurs | `:has()` pertinent | `css/components.css:789`, `css/tokens.css:256`, `css/components.css:251`, `css/components.css:713` | L'offre qui contient un badge est mise en avant ; le champion coché recolore tout le site ; la bascule de thème se remplit ; la carte entière reçoit l'anneau de focus quand son lien est focus. Sans `:has()`, il faudrait des classes posées à la main ou du JS. |
| 4. Sélecteurs | `:is()` / `:where()` | `css/base.css:30`, `css/base.css:38` | `:is()` factorise la police des titres ; `:where()` (spécificité nulle) pour `text-wrap: balance`. |
| 5. Thème | `light-dark()` / `prefers-color-scheme` + `color-scheme` | `css/tokens.css:93-95` | `color-scheme: light dark` puis tous les sémantiques en `light-dark()` : « salle éteinte » (sombre) et « lumières allumées » (clair). Suit le système par défaut. |
| 5. Thème (bonus technique) | Bascule CSS-only | `css/tokens.css:244-250`, `index.html:45` | Case `#theme-toggle` : `:root:has(#theme-toggle:checked)` inverse `color-scheme`, donc tous les `light-dark()` d'un coup, quel que soit le thème du système. |
| 6. Animations | Transition n°1 | `css/components.css:73` | Bouton : `translate` + `box-shadow` + couleurs, durées et courbes issues des tokens ; au survol il « s'enfonce ». |
| 6. Animations | Transition n°2 | `css/components.css:515` | Carte : `translate` + `box-shadow` au survol. Aussi : icône de FAQ (`rotate`), sélecteur de champion (`border-color`, `scale`), menu (`opacity`, `translate`). |
| 6. Animations | `@keyframes` | `css/components.css:1327` | `punch-in` sur le titre du hero et le nom des fiches ; `fade-down` à l'ouverture d'une réponse de FAQ ; `rise` au scroll. Uniquement `transform`/`opacity`/`scale`/`rotate`. |
| 6. Animations | `prefers-reduced-motion` | `css/components.css:1362`, `css/utilities.css:21`, `js/main.js:13` | Animations déclarées seulement sous `no-preference` (rien ne reste à `opacity: 0`) ; en `reduce`, le layer `utilities` coupe animations, transitions, scroll fluide et View Transitions ; la vidéo du hero est mise en pause. |
| 6. Animations (bonus technique) | Scroll-driven (`@supports`), View Transitions, `@starting-style`/popover | `css/components.css:1369`, `css/base.css:10`, `css/components.css:576`, `css/components.css:182` | `animation-timeline: view()` dans `@supports` (Firefox : cartes simplement visibles) ; `@view-transition { navigation: auto }` + `view-transition-name` : le médaillon d'un combattant devient le grand portrait de sa fiche ; menu mobile en Popover API animé avec `@starting-style`. |
| 7. Accessibilité | Landmarks + hiérarchie de titres | `index.html:28`, `index.html:52`, `index.html:55`, `index.html:357` | `header` / `nav` / `main` / sections titrées (`aria-labelledby`) / `footer` ; un seul `h1` dans le hero, puis h2 → h3 sans saut ; `lang="fr"` ; lien d'évitement ; listes pour les listes ; FAQ en `<details>`. |
| 7. Accessibilité | `:focus-visible` | `css/base.css:57`, `css/components.css:256`, `css/components.css:508` | Anneau de 3 px décalé, couleur du texte : contrasté dans les deux thèmes et sur la vidéo. Reporté sur les libellés des champs masqués et sur les cartes cliquables. |
| 7. Accessibilité | Contrastes AA vérifiés (outil + paires de couleurs testées, 2 thèmes) | `css/tokens.css:95` | Sombre : craie #F4F1EA / noir #0B0B0C 17,4:1 ; gris #9A9A9E / noir 7:1. Clair : noir / craie 17,4:1 ; gris #5E5E64 / craie ≈ 5,8:1. Hero : craie sur panneau noir à 72 % ≥ 9:1. Tons clairs des combattants sous texte noir : 4,9:1 à 10,9:1. Outil : _à compléter (ex. WebAIM Contrast Checker, DevTools)_. |
| 7. Accessibilité | Images avec `alt` | `index.html:91` | `alt` descriptifs sur les visuels informatifs, `alt=""` sur les avatars dont le nom est écrit à côté ; vidéo sans son avec `aria-label` descriptif. |
| 8. Qualité | Résultat du validateur W3C | — | Aucune erreur réelle (validé le 13/11 avec le profil CSS3 + SVG). Les messages restants portent sur des syntaxes récentes, listées ci-dessous. |
| 8. Qualité | `!important` (aucun, ou utilitaire justifié) | — | Aucun : les conflits sont réglés par l'ordre des layers. |

## Avertissements du validateur W3C non corrigés

Syntaxes récentes que le validateur ne reconnaît pas encore (non pénalisées si listées ici) :

| Fichier:ligne | Message du validateur | Pourquoi c'est valide |
|---|---|---|
| `css/main.css:18` | `@import` n'est pas autorisé après une autre déclaration | La spécification autorise une instruction `@layer` déclarative avant les `@import` : c'est même le seul moyen de fixer l'ordre des layers en tête. |
| `css/tokens.css:108` | Erreur interne du validateur (`NullPointerException`) | Plantage du validateur sur `light-dark()` imbriqué avec `var()` ; syntaxe Baseline 2024. |
| `css/base.css:10` | `@view-transition` non reconnue | View Transitions entre documents (amélioration progressive, ignorée sans support). |
| `css/layout.css:169` | La propriété `container` n'existe pas | Raccourci de `container-name` + `container-type` (Baseline 2023). |
| `css/layout.css:173` et suivants | Type invalide dans `min(100%, var(…))` | Le validateur ne sait pas résoudre `var()` dans `min()` ; la valeur est valide. |
| `css/components.css:182` | `@starting-style` non reconnue | Baseline 2024, amélioration progressive. |
| `css/components.css:536` | `@container` non reconnue | Container queries, Baseline 2023. |
| `css/components.css:562` | Erreur d'analyse | Unité `cqi` (container queries) inconnue du validateur. |
| `css/components.css:576` | `view-transition-name` n'existe pas | View Transitions, Baseline 2025 (amélioration progressive). |
| `css/components.css:1369` | `animation-timeline` / `animation-range` n'existent pas | Scroll-driven animations, placées dans `@supports`. |
| `css/utilities.css:33` | Erreur d'analyse | Pseudo-éléments `::view-transition-*` inconnus du validateur. |
| tous les fichiers | Avertissements sur `var()` et le nesting | Le validateur ne vérifie pas les custom properties ni le nesting natif (Baseline 2023). |

## Bonus technique revendiqué

| Fonctionnalité | Fichier:ligne | Explication (et repli prévu pour les navigateurs qui ne la gèrent pas) |
|---|---|---|
| Bascule de thème CSS-only | `css/tokens.css:244` | `:has()` sur une case à cocher qui inverse `color-scheme`. |
| Le site prend la couleur du champion | `css/tokens.css:256` | Boutons radio + `:root:has(:checked)` changent `--color-champion` (bordures, offre mise en avant). |
| Scroll-driven animations | `css/components.css:1369` | Dans `@supports (animation-timeline: view())` : sans support, les cartes sont simplement visibles. |
| View Transitions entre pages | `css/base.css:10` | Le médaillon d'une carte se transforme en portrait sur la fiche. Sans support : navigation classique. |
| Popover API + `@starting-style` | `index.html:33`, `css/components.css:182` | Menu mobile ouvert sans JS, animé à l'ouverture. Sans `@starting-style` : apparition sans animation. |

## JavaScript (facultatif, ≤ 20 lignes)

| Fichier:lignes | Ce que fait le code | Pourquoi ce n'était pas faisable en CSS |
|---|---|---|
| `js/main.js:6-10` | Ferme le menu mobile (popover) quand on clique sur un lien d'ancre. | Le popover s'ouvre et se ferme sans JS (Menu / Fermer, Échap, clic dehors), mais un lien `<a href="#…">` ne peut pas porter `popovertarget` : sans ce code, le menu resterait ouvert par-dessus la section atteinte. |
| `js/main.js:13-15` | Met la vidéo du hero en pause si `prefers-reduced-motion: reduce`. | CSS ne peut pas mettre une `<video>` en pause ; l'attribut `autoplay` la lance toujours. |

## Déclaration d'usage d'outils d'IA

| Outil | Pour quoi faire (textes, explication d'une erreur, revue…) | Parties du code concernées |
|---|---|---|
| Claude Code (Anthropic) | Aide à l'intégration de la maquette Figma, rédaction des textes fictifs (fiches, FAQ), vérification à 320 px et validation W3C | `*.html`, `css/*.css`, `js/main.js` |

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
