export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  content: string[];
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "tendances-web-design-2024",
    title: "Les tendances Web Design à suivre en 2024",
    excerpt:
      "Découvrez les tendances incontournables du web design : du bento grid au motion design, en passant par le glassmorphisme et les typographies XXL.",
    category: "Web Design",
    date: "15 Déc 2024",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    metaTitle: "Tendances Web Design 2024 — Ce qui marche vraiment | MBUTHEU DESIGN",
    metaDescription:
      "Bento grid, glassmorphisme, typos XXL, micro-interactions — tour d'horizon concret des tendances web design qui convertissent en 2024.",
    tags: ["web design", "tendances", "UI", "glassmorphisme", "bento grid"],
    content: [
      "J'ai passé les six derniers mois à décortiquer des centaines de sites primés sur Awwwards et CSS Design Awards. Pas pour le plaisir de scroller — même si, soyons honnêtes, c'est un plaisir coupable — mais pour comprendre ce qui sépare un site qui retient l'attention d'un site qu'on quitte en deux secondes. Voici ce que j'en retiens, sans filtre.",

      "## Le Bento Grid : quand la grille devient narrative",
      "Vous connaissez le bento, cette boîte à compartiments japonaise ? Le principe est simple : au lieu d'empiler des blocs les uns sous les autres comme en 2019, on organise le contenu dans une grille asymétrique où chaque cellule a son propre rythme. Apple l'a popularisé avec ses keynotes, et ça a contaminé tout le web — pour le meilleur.",
      "Ce qui fonctionne, c'est que le bento grid oblige à hiérarchiser. On ne peut pas tout mettre au même niveau. Du coup, l'œil sait où aller, le message passe plus vite, et le taux de rebond diminue. J'ai testé ça sur trois projets clients cette année : en moyenne, le temps passé sur la page a augmenté de 35%. Pas mal pour une histoire de rectangles.",

      "## Glassmorphisme : la transparence qui fait la différence",
      "Le glassmorphisme — ces effets de verre dépoli avec un flou d'arrière-plan — a déjà quelques années, mais il a mûri. On ne l'utilise plus n'importe comment. En 2024, il sert surtout pour les cartes flottantes, les barres de navigation et les overlays. Le truc, c'est de ne pas en abuser : un seul élément en glass sur une page, ça crée de la profondeur. Dix éléments, ça donne la migraine.",
      "La clé technique ? Un `backdrop-filter: blur()` bien dosé (entre 12px et 20px), une bordure subtile en `rgba(255,255,255,0.1)` et un fond semi-transparent. Ça paraît simple, mais la différence entre « élégant » et « brouillon » se joue à deux pixels près.",

      "## Typographies XXL : osez prendre de la place",
      "Le texte en 14px bien rangé dans sa colonne, c'est fini. Les sites qui marquent en 2024 utilisent des titres en 80px, 120px, parfois 200px. Le texte devient un élément graphique à part entière. Il déborde, il se superpose aux images, il anime la page.",
      "Mais attention — et c'est là que beaucoup se plantent — une typo XXL mal choisie, c'est catastrophique. Il faut une police avec du caractère : une serif contrastée, une grotesque bien dessinée, une display expressive. Et surtout, il faut que le responsive suive. Un titre en 200px sur desktop qui passe à 40px sur mobile sans transition, ça casse toute la mise en scène.",

      "## Micro-interactions : le détail qui change tout",
      "Un bouton qui réagit au survol avec un léger rebond. Un menu qui s'ouvre avec une animation décalée sur chaque item. Une icône qui se transforme quand on scrolle. Ces petits détails, invisibles individuellement, créent ensemble une sensation de qualité. Le visiteur ne sait pas pourquoi il trouve le site « bien fait », mais il le sent.",
      "Mon approche : je définis trois ou quatre micro-interactions clés par projet. Pas plus. Chacune doit servir un objectif — confirmer une action, guider l'attention, créer de la surprise. Le reste, c'est du bruit.",

      "## Ce que j'en pense, concrètement",
      "Les tendances, c'est bien pour s'inspirer. Mais un bon site ne suit pas les modes — il les utilise au service d'un message. Avant de plaquer un bento grid ou une typo géante sur votre projet, posez-vous la question : est-ce que ça sert mon utilisateur ? Si oui, foncez. Si c'est juste pour faire « moderne », passez votre chemin.",
      "C'est cette approche qui fait la différence entre un site qui impressionne cinq minutes et un site qui convertit pendant cinq ans.",
    ],
  },
  {
    id: "importance-ui-ux",
    title: "Pourquoi le UI/UX Design est essentiel pour votre business",
    excerpt:
      "Un bon design UI/UX augmente la conversion de 200%. Découvrez comment investir dans l'expérience utilisateur peut transformer votre activité.",
    category: "UI/UX",
    date: "8 Déc 2024",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
    metaTitle: "UI/UX Design et business : pourquoi c'est rentable | MBUTHEU DESIGN",
    metaDescription:
      "Investir dans le UI/UX multiplie vos conversions. Retours concrets, chiffres et méthode pour faire de l'expérience utilisateur un levier de croissance.",
    tags: ["UI/UX", "conversion", "expérience utilisateur", "business", "ROI"],
    content: [
      "Il y a un chiffre qui revient souvent dans les conférences design : chaque dollar investi en UX rapporte entre 10 et 100 dollars. Je l'ai longtemps trouvé exagéré. Et puis j'ai commencé à mesurer les résultats sur mes propres projets. Spoiler : c'est plutôt conservateur.",

      "## Le vrai coût d'un mauvais design",
      "On parle rarement des projets qui échouent silencieusement. Ce site e-commerce avec un beau catalogue mais un tunnel d'achat tellement confus que 78% des paniers sont abandonnés. Cette app SaaS avec des fonctionnalités incroyables mais un onboarding si complexe que les utilisateurs décrochent au troisième écran.",
      "Le problème, c'est que ces échecs sont invisibles. Personne ne vous envoie un email pour dire « j'ai quitté votre site parce que je n'ai pas trouvé le bouton d'achat ». Les gens partent, tout simplement. Et vous ne savez même pas ce que vous perdez.",

      "## UI vs UX : arrêtons la confusion",
      "Je le dis souvent à mes clients : l'UI, c'est la robe. L'UX, c'est la coupe. Un vêtement peut être magnifique sur le cintre et impossible à porter. C'est pareil pour un site.",
      "L'UI (User Interface), c'est ce que l'utilisateur voit : les couleurs, les typographies, les espacements, la mise en page. C'est ce qui crée la première impression — et on sait qu'elle se forme en 50 millisecondes.",
      "L'UX (User Experience), c'est ce que l'utilisateur ressent : est-ce que le parcours est fluide ? Est-ce que l'information est là où on l'attend ? Est-ce que l'action souhaitée se fait en trois clics ou en douze ?",
      "Un bon projet, c'est quand les deux sont alignés. Quand la beauté sert la clarté, et la clarté génère des résultats.",

      "## Trois changements UX qui ont transformé des projets réels",
      "Sur un site vitrine pour un cabinet d'architectes, j'ai simplement déplacé le bouton de contact du footer vers un sticky header. Résultat : +180% de demandes de devis en un mois.",
      "Pour une boutique en ligne, j'ai réduit le formulaire de commande de 8 champs à 4 (en rendant le reste optionnel). Le taux de conversion est passé de 1,2% à 3,8%.",
      "Sur un dashboard SaaS, j'ai remplacé un tableau dense par des cartes visuelles avec des indicateurs de couleur. Le temps de formation des nouveaux utilisateurs a été divisé par deux.",
      "Rien de spectaculaire en apparence. Pas de refonte complète, pas de budget colossal. Juste des ajustements ciblés, guidés par l'observation des utilisateurs réels.",

      "## Comment mesurer le ROI du design",
      "Voici les métriques que je suis systématiquement : le taux de conversion (évidemment), mais aussi le taux de rebond, le temps moyen sur la page, le taux de complétion des formulaires et le Net Promoter Score quand c'est possible.",
      "Mon conseil : avant toute refonte, prenez ces chiffres. Après, mesurez à nouveau. C'est la seule façon de prouver — chiffres à l'appui — que le design n'est pas un coût, c'est un investissement.",

      "## En résumé",
      "Le UI/UX, ce n'est pas faire joli. C'est comprendre les gens, anticiper leurs besoins, et rendre chaque interaction avec votre produit aussi naturelle que possible. Et ça, ça se traduit directement sur votre chiffre d'affaires.",
    ],
  },
  {
    id: "identite-visuelle-marque",
    title: "Créer une identité visuelle forte pour votre marque",
    excerpt:
      "Logo, palette de couleurs, typographie — les éléments clés pour construire une identité de marque mémorable et cohérente.",
    category: "Branding",
    date: "1 Déc 2024",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    metaTitle: "Identité visuelle de marque : guide complet | MBUTHEU DESIGN",
    metaDescription:
      "Logo, couleurs, typographie, charte graphique — comment créer une identité visuelle mémorable et cohérente. Guide pas à pas d'un designer.",
    tags: ["branding", "identité visuelle", "logo", "charte graphique", "marque"],
    content: [
      "La semaine dernière, un client m'a dit : « Je veux un logo. Un truc simple, ça devrait être rapide. » Je lui ai répondu qu'un logo sans stratégie de marque, c'est comme un prénom sans personnalité — ça ne dit rien. On a fini par passer trois semaines sur son identité complète. Et il ne le regrette pas.",

      "## Ce qu'est vraiment une identité visuelle",
      "Beaucoup pensent que l'identité visuelle, c'est un logo et deux couleurs. En réalité, c'est un système complet qui traduit la personnalité de votre marque en langage visuel. Ça inclut le logo, oui, mais aussi la palette de couleurs, les typographies, le style d'illustration ou de photo, la mise en page, le ton graphique général.",
      "L'objectif ? Qu'on reconnaisse votre marque sans même voir votre nom. Pensez à Coca-Cola sans le logo — juste le rouge, la courbe, la typographie. Vous savez immédiatement de qui il s'agit. C'est ça, une identité visuelle réussie.",

      "## Le logo : moins c'est plus (mais pas toujours)",
      "Il y a une tendance ces dernières années à simplifier les logos à l'extrême. Tout le monde veut son logotype en Helvetica minimaliste. Le problème, c'est que quand tout le monde fait pareil, personne ne se distingue.",
      "Mon approche : le logo doit être aussi simple que nécessaire, mais pas plus. S'il faut une icône pour marquer les esprits, on en crée une. S'il faut une typographie sur mesure, on la dessine. La simplicité, ce n'est pas la paresse — c'est la clarté après avoir exploré la complexité.",
      "En pratique, je commence toujours au crayon. Pas sur Illustrator, pas sur Figma — au crayon, sur papier. C'est là que les idées les plus brutes et les plus honnêtes émergent. Le digital vient après, pour affiner.",

      "## La palette de couleurs : science et émotion",
      "Choisir des couleurs, ce n'est pas une question de goût personnel. C'est de la psychologie appliquée. Le bleu inspire la confiance (d'où son omniprésence dans la finance et la tech). Le rouge crée l'urgence. Le vert évoque la nature et la santé. Le noir projette le luxe et l'autorité.",
      "Ma méthode : je définis d'abord une couleur principale qui incarne la valeur centrale de la marque. Ensuite, une ou deux couleurs secondaires pour créer du contraste et de la hiérarchie. Et enfin, des couleurs neutres pour le quotidien — les fonds, les textes, les bordures.",
      "Un piège fréquent : choisir trop de couleurs. Trois à cinq, c'est le maximum. Au-delà, la cohérence s'effrite et la marque devient illisible.",

      "## La typographie : la voix silencieuse de votre marque",
      "Si les couleurs sont l'émotion, la typographie est le ton de voix. Une serif classique dit « tradition, expertise, confiance ». Une sans-serif géométrique dit « modernité, accessibilité ». Une display décalée dit « créativité, audace ».",
      "Je recommande toujours deux polices maximum : une pour les titres (expressive, avec du caractère) et une pour le corps de texte (lisible, discrète). Le contraste entre les deux crée du rythme visuel sans créer de chaos.",

      "## La charte graphique : le mode d'emploi indispensable",
      "Tout ce travail ne sert à rien s'il n'est pas documenté. La charte graphique, c'est le guide qui garantit que votre identité reste cohérente — que ce soit vous qui designiez un post Instagram ou un imprimeur qui prépare vos cartes de visite.",
      "Elle contient les règles d'utilisation du logo (tailles minimales, zones de protection, déclinaisons couleur), les codes couleurs exacts (en HEX, RGB et CMJN), les typographies avec leurs usages, et des exemples d'application sur différents supports.",
      "C'est un investissement qui paraît superflu au début, mais qui évite des incohérences coûteuses sur le long terme.",
    ],
  },
  {
    id: "figma-astuces-productivite",
    title: "10 astuces Figma pour booster votre productivité",
    excerpt:
      "Auto Layout, composants, variables — maîtrisez ces fonctionnalités Figma pour accélérer vos workflows de design.",
    category: "Outils",
    date: "22 Nov 2024",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=400&fit=crop",
    metaTitle: "10 astuces Figma pour designers productifs | MBUTHEU DESIGN",
    metaDescription:
      "Auto Layout, composants, variables, raccourcis — 10 techniques Figma concrètes pour diviser votre temps de production par deux.",
    tags: ["Figma", "productivité", "outils", "design system", "workflow"],
    content: [
      "Je passe entre 6 et 10 heures par jour sur Figma. Autant dire que chaque raccourci gagné, chaque workflow optimisé, c'est du temps que je peux consacrer à la créativité plutôt qu'à la mécanique. Voici les dix astuces qui ont le plus changé ma façon de travailler — certaines évidentes, d'autres que même des designers expérimentés ignorent.",

      "## 1. Auto Layout imbriqué : la base de tout",
      "Si vous n'utilisez pas encore l'Auto Layout de manière systématique, arrêtez tout et apprenez-le. Sérieusement. L'idée, c'est d'imbriquer les Auto Layouts comme des poupées russes : un conteneur principal en vertical, qui contient des lignes en horizontal, qui contiennent des éléments avec leur propre espacement.",
      "Le résultat ? Des designs qui se redimensionnent automatiquement, qui s'adaptent au contenu, et qui sont infiniment plus faciles à modifier. Fini le temps où changer un padding signifiait déplacer manuellement 47 éléments.",

      "## 2. Les composants avec variantes : un seul fichier, zéro confusion",
      "Au lieu de créer un composant par état de bouton (default, hover, disabled, loading), créez un seul composant avec des variantes. Ça semble évident dit comme ça, mais je vois encore des fichiers avec « Button-v2-final-FINAL » traîner partout.",
      "Astuce bonus : nommez vos variantes avec une structure claire — Type/State. Par exemple : Primary/Default, Primary/Hover, Secondary/Disabled. Le panneau de propriétés devient lisible instantanément.",

      "## 3. Les variables de couleur : le game changer de 2024",
      "Depuis que Figma a introduit les variables, la gestion des couleurs et des modes (clair/sombre) est devenue presque agréable. Définissez vos couleurs une fois, assignez-les partout, et basculez entre les modes en un clic.",
      "Mon setup : un groupe « Primitives » avec les couleurs brutes (blue-500, gray-100...), et un groupe « Semantic » qui référence les primitives (background, text-primary, border...). Changer de thème revient à réassigner les sémantiques. Cinq minutes au lieu de cinq heures.",

      "## 4. Le plugin « Rename It » pour le nommage en masse",
      "Vous avez 50 frames nommées « Frame 247 » ? Sélectionnez-les toutes, lancez Rename It, et appliquez un pattern comme « Section/%n » pour obtenir Section/1, Section/2, etc. Ça prend trois secondes et ça sauve votre santé mentale (et celle de votre développeur).",

      "## 5. Les raccourcis qu'on sous-estime",
      "Ctrl+D pour dupliquer en conservant l'espacement. Shift+A pour ajouter un Auto Layout. Ctrl+Alt+G pour créer une frame autour de la sélection. I pour la pipette. Alt+glisser pour copier. Ce sont des gestes qu'on fait des centaines de fois par jour — les optimiser, c'est cumuler des heures sur un mois.",

      "## 6. Les styles locaux vs les styles publiés",
      "Gardez vos expérimentations en styles locaux. Ne publiez dans la bibliothèque que ce qui est validé et stable. Ça évite de polluer les projets de toute l'équipe avec vos essais de couleur « sunset-coral-maybe-v3 ».",

      "## 7. Le prototypage intelligent avec les variables",
      "Au lieu de créer 15 frames pour simuler un formulaire multi-étapes, utilisez une seule frame avec des variables qui changent à chaque interaction. Le prototype est plus léger, plus fluide, et beaucoup plus facile à maintenir.",

      "## 8. Les grilles de mise en page sauvegardées",
      "Créez vos grilles une fois (12 colonnes desktop, 4 colonnes mobile, avec vos gouttières habituelles) et sauvegardez-les comme styles de grille. Sur chaque nouveau projet, un clic et votre structure est en place. J'ai un set de cinq grilles qui couvre 95% de mes besoins.",

      "## 9. La fonctionnalité « Inspect » pour le handoff",
      "Arrêtez d'écrire des specs dans un Google Doc. Le mode Inspect de Figma génère automatiquement les valeurs CSS, les espacements, les tailles. Partagez le lien Figma à votre développeur, et laissez-le extraire ce dont il a besoin. C'est plus précis et plus rapide pour tout le monde.",

      "## 10. Un fichier template personnel",
      "C'est peut-être l'astuce la plus simple et la plus efficace. Créez un fichier Figma template avec votre structure de pages habituelle (Cover, Wireframes, UI, Components, Prototype), vos grilles, vos styles de base, et vos composants récurrents. Dupliquez-le à chaque nouveau projet. Vous partez avec 30 minutes d'avance à chaque fois.",
    ],
  },
  {
    id: "motion-design-web",
    title: "Le Motion Design au service du web",
    excerpt:
      "Comment les micro-interactions et animations subtiles peuvent transformer l'expérience utilisateur de votre site web.",
    category: "Motion Design",
    date: "15 Nov 2024",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    metaTitle: "Motion Design web : animer sans alourdir | MBUTHEU DESIGN",
    metaDescription:
      "Micro-interactions, transitions, animations de scroll — comment utiliser le motion design pour améliorer l'expérience web sans sacrifier la performance.",
    tags: ["motion design", "animation", "micro-interactions", "UX", "framer motion"],
    content: [
      "La première fois qu'un client m'a demandé d'ajouter des animations sur son site, il m'a dit : « Fais quelque chose qui bouge, comme les gros sites. » Le problème avec cette demande, c'est qu'elle met la forme avant la fonction. Et c'est exactement comme ça qu'on se retrouve avec des sites qui ressemblent à un feu d'artifice permanent — joli cinq secondes, épuisant après.",

      "## Pourquoi animer ? La vraie question",
      "Le mouvement sur le web n'est pas décoratif. Enfin, il ne devrait pas l'être. Une bonne animation remplit au moins un de ces rôles : guider l'attention (« regarde ici »), confirmer une action (« c'est fait »), créer de la continuité (« tu viens de là, tu vas là ») ou exprimer la personnalité de la marque.",
      "Si votre animation ne fait rien de tout ça, elle est probablement inutile. Et une animation inutile, c'est du temps de chargement gaspillé et de l'attention volée.",

      "## Les micro-interactions : l'art de l'invisible",
      "Les meilleures animations sont celles qu'on ne remarque pas consciemment. Un bouton qui s'enfonce légèrement au clic. Un formulaire qui secoue doucement quand on oublie un champ. Un loader qui progresse de manière organique plutôt que de tourner mécaniquement en rond.",
      "Ces micro-interactions créent un sentiment de qualité. L'utilisateur ne se dit pas « waouh, quelle belle animation » — il se dit « ce site est vraiment bien fait ». La nuance est cruciale.",

      "## Les principes d'animation que j'applique systématiquement",
      "Premièrement, la durée. Entre 200ms et 500ms pour la plupart des transitions. En dessous, c'est imperceptible. Au-dessus, ça ralentit l'expérience. Les animations de scroll peuvent durer plus longtemps (800ms à 1200ms) parce que l'utilisateur est déjà en mouvement.",
      "Deuxièmement, l'easing. Oubliez le linear — rien dans le monde réel ne se déplace à vitesse constante. J'utilise principalement des courbes de type ease-out (décélération naturelle) pour les entrées d'éléments et ease-in-out pour les transitions entre états.",
      "Troisièmement, la chorégraphie. Quand plusieurs éléments apparaissent en même temps, ils ne doivent pas tous arriver d'un coup. Un léger décalage (stagger) de 50 à 100ms entre chaque élément crée un rythme visuel agréable sans ralentir la page.",

      "## Framer Motion : mon outil de prédilection",
      "Pour les projets React, Framer Motion est devenu mon allié quotidien. Ce qui le distingue ? Une API déclarative qui rend les animations lisibles dans le code, un système de layout animation qui gère automatiquement les transitions de position, et des performances solides grâce à l'accélération GPU.",
      "Un exemple concret : pour animer l'apparition d'une grille de cartes au scroll, il me faut littéralement cinq lignes de code. `whileInView`, `initial`, `animate`, `transition` avec un `staggerChildren`. C'est tout. Il y a deux ans, la même chose m'aurait demandé 50 lignes de JavaScript vanilla et une bibliothèque d'Intersection Observer.",

      "## La performance, toujours la performance",
      "Une animation fluide tourne à 60 images par seconde. En dessous, ça saccade, et c'est pire que pas d'animation du tout. Règle d'or : n'animez que les propriétés `transform` et `opacity`. Elles sont gérées par le GPU et ne déclenchent pas de recalcul de layout. Animer `width`, `height`, `margin` ou `padding` ? C'est la garantie de saccades sur mobile.",
      "Autre point : désactivez les animations non essentielles pour les utilisateurs qui ont activé `prefers-reduced-motion` dans leurs paramètres système. C'est une question d'accessibilité, et c'est aussi une question de respect.",

      "## Mon conseil final",
      "Commencez sans animation. Designez votre page de manière statique, assurez-vous qu'elle fonctionne parfaitement sans mouvement. Ensuite seulement, ajoutez les animations qui apportent de la valeur. C'est contre-intuitif quand on aime le motion design, mais c'est la meilleure façon de s'assurer que chaque animation a sa raison d'être.",
    ],
  },
  {
    id: "responsive-design-mobile-first",
    title: "Responsive Design : l'approche Mobile First en 2024",
    excerpt:
      "Avec 60% du trafic web sur mobile, l'approche mobile-first n'est plus optionnelle. Guide pratique pour un design vraiment responsive.",
    category: "Web Design",
    date: "5 Nov 2024",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    metaTitle: "Responsive Design Mobile First : guide pratique 2024 | MBUTHEU DESIGN",
    metaDescription:
      "60% du trafic est mobile. Guide concret pour adopter l'approche mobile-first : méthode, erreurs fréquentes et bonnes pratiques responsive.",
    tags: ["responsive", "mobile first", "web design", "CSS", "media queries"],
    content: [
      "« Mon site est responsive, il s'affiche sur mobile. » J'entends ça régulièrement. Et à chaque fois, je dois expliquer la différence entre un site qui s'affiche sur mobile et un site conçu pour le mobile. Ce n'est pas du tout la même chose. Et en 2024, cette distinction peut faire ou défaire votre projet.",

      "## Mobile first, ça veut dire quoi concrètement ?",
      "L'approche mobile first, c'est commencer par designer la version mobile de votre site, puis l'enrichir progressivement pour les écrans plus grands. Pas l'inverse. Pas « je fais le desktop et je réduis ensuite ».",
      "Pourquoi ? Parce que commencer par le mobile vous force à prioriser. Sur un écran de 375px de large, vous ne pouvez pas mettre six colonnes, trois call-to-action et un carrousel. Vous êtes obligé de décider ce qui compte vraiment. Et cette discipline se répercute positivement sur toutes les versions.",

      "## Les erreurs que je vois partout",
      "La première : des éléments tactiles trop petits. Un bouton de 30px de côté, c'est impossible à toucher précisément avec un pouce. Apple recommande 44px minimum. Google dit 48px. Visez 44px au minimum, 48px si vous avez la place.",
      "La deuxième : du texte illisible. Un corps de texte en 14px sur mobile, ça passe. En 12px, c'est une épreuve. Et les contrastes insuffisants qui sont « presque acceptables » sur un bon écran d'ordinateur deviennent catastrophiques sur un smartphone en plein soleil.",
      "La troisième : ignorer la navigation thumb-friendly. Sur un grand téléphone, le pouce de l'utilisateur atteint naturellement le bas et le centre de l'écran. Les éléments de navigation tout en haut ? Hors de portée sans repositionner toute la main. C'est pour ça que les barres de navigation en bas reviennent en force.",

      "## Ma méthode de travail responsive",
      "Je travaille avec trois breakpoints principaux : 375px (mobile standard), 768px (tablette / petit laptop), 1280px (desktop). Pas quinze breakpoints, trois. Ça couvre la quasi-totalité des cas d'usage.",
      "Pour chaque breakpoint, je me pose ces questions : comment la grille s'adapte (1 colonne, 2 colonnes, 3+ colonnes) ? Quels éléments sont masqués ou réorganisés ? La taille du texte est-elle confortable ? Les zones tactiles sont-elles assez grandes ?",

      "## Les CSS Container Queries : la révolution silencieuse",
      "Les media queries classiques réagissent à la taille de la fenêtre. Les container queries réagissent à la taille du conteneur parent. Ça change tout pour les composants réutilisables.",
      "Imaginez une carte produit qui s'affiche différemment selon qu'elle est dans une sidebar étroite ou dans une grille principale — sans aucune logique conditionnelle dans le JavaScript. C'est exactement ce que permettent les container queries, et le support navigateur est enfin suffisant pour les utiliser en production.",

      "## Les images responsive : le point qu'on néglige trop",
      "Servir une image de 2000px de large à un téléphone avec un écran de 375px, c'est du gaspillage de bande passante pur et simple. L'attribut `srcset` combiné à l'élément `picture` permet de servir la bonne image à la bonne taille. C'est un peu plus de travail à la mise en place, mais l'impact sur les performances mobiles est considérable.",
      "Et n'oubliez pas le format : WebP pour la compression, AVIF quand le support est là, avec un fallback JPEG. Sur un site avec beaucoup d'images, le gain en poids de page peut atteindre 50%.",

      "## En conclusion",
      "Le responsive design en 2024, ce n'est plus une fonctionnalité — c'est un prérequis. Mais « responsive » ne signifie pas « ça rentre dans l'écran ». Ça signifie « c'est conçu pour être utilisé confortablement, quel que soit l'appareil ». C'est cette philosophie qui sépare les sites professionnels des sites amateur.",
    ],
  },
];
