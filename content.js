/* =========================================================================
   content.js — 사이트의 모든 내용은 이 파일 하나만 고치면 됩니다.
   - 문자열 안에서 <a>, <b>, <em> 같은 간단한 HTML 태그를 쓸 수 있습니다.
   - 이미지·로고는 images/ 폴더에 넣고 경로만 적으세요.
     파일이 없으면 자동으로 글자 배지(예: "SKKU")가 대신 표시됩니다.
   ========================================================================= */

window.SITE = {
  profile: {
    name: "Seunggyu Kim",
    nameLocal: "김승규",
    initials: "SK",
    eyebrow: "Integrated M.S.–Ph.D. Student · AIM Lab, Sungkyunkwan University",
    tagline:
      "I work on <em>multimodal learning</em> and <em>video understanding</em>, with a focus on making them <em>efficient</em>.",
    photo: "images/profile.jpg",          // 비우면 이니셜 아바타
    authorName: "Seunggyu Kim",           // 논문 저자 목록에서 자동 강조할 이름
    links: [
      // icon: Font Awesome 클래스 (https://fontawesome.com/icons 에서 검색)
      { label: "Email: seunggyu.kim@skku.edu", href: "mailto:seunggyu.kim@skku.edu", icon: "fa-solid fa-envelope" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/seung-gyu-kim-02aa722b1/", icon: "fa-brands fa-linkedin-in" }
      // 생기면 추가:
      // { label: "Google Scholar", href: "https://scholar.google.com/citations?user=...", icon: "fa-solid fa-graduation-cap" },
      // { label: "GitHub",         href: "https://github.com/...",                     icon: "fa-brands fa-github" },
      // { label: "CV",             href: "files/cv.pdf",                               icon: "fa-solid fa-file-lines" }
    ]
  },

  about: [
    "I'm Seunggyu Kim, an integrated M.S.–Ph.D. student in the Department of Applied Artificial Intelligence at Sungkyunkwan University, advised by <a href=\"https://www.csehong.com/\" target=\"_blank\" rel=\"noopener\">Prof. Sungeun Hong</a> in the <a href=\"https://aim.skku.edu/\" target=\"_blank\" rel=\"noopener\">AI &amp; Media Lab (AIM Lab)</a>.",
    "My research interests lie in multimodal learning and video understanding, with a particular focus on efficiency.",
    "Before joining SKKU, I received my B.Eng. in Computer and Data Engineering from City University of Hong Kong."
  ],

  interests: ["Multimodal Learning", "Video Understanding", "Efficiency"],

  // 최신순으로 위에 추가하세요. 6개가 넘으면 "Show all" 버튼이 생깁니다.
  news: [
    { date: "2026.09", text: "Joined <a href=\"https://aim.skku.edu/\" target=\"_blank\" rel=\"noopener\">AIM Lab</a> at Sungkyunkwan University as an integrated M.S.–Ph.D. student." }
  ],

  // logo: images/ 폴더의 로고 파일 경로 (없으면 logoText 배지가 표시됨)
  education: [
    {
      logo: "images/logo-skku.png",
      logoText: "SKKU",
      school: "Sungkyunkwan University",
      degree: "Integrated M.S.–Ph.D. in Applied Artificial Intelligence",
      note: "AIM Lab · Advisor: <a href=\"https://www.csehong.com/\" target=\"_blank\" rel=\"noopener\">Prof. Sungeun Hong</a>",
      period: "2026 – Present",
      place: "Seoul, Korea"
    },
    {
      logo: "images/logo-cityu.png",
      logoText: "CityU",
      school: "City University of Hong Kong",
      degree: "Bachelor of Engineering in Computer and Data Engineering",
      note: "",
      period: "2019 – 2026",
      place: "Hong Kong"
    }
  ],

  projects: [
    {
      logo: "",
      logoText: "",                       // 로고 없이 표시
      image: "images/etri-project.png",   // 왼쪽 썸네일 (클릭하면 크게 보기)
      imageAlt: "Hierarchical (L0–L3) semantic segmentation of a video timeline",
      title: "Content-Type-Aware Multimodal Semantic Information Extraction and Graph-Based Structure Design",
      titleLocal: "콘텐츠 유형별 멀티모달 의미 정보 추출 및 그래프 기반 구조 설계",
      org: "Electronics and Telecommunications Research Institute (ETRI)",
      period: "2026.06 – 2026.08",
      desc: "",
      link: ""
    }
  ],

  // 논문이 생기면 아래 형식으로 추가하세요. 비어 있으면 "Coming soon" 안내가 보입니다.
  // selected: true → 기본 "Selected" 탭에 표시 / highlight: true → 학회 배지 강조
  publications: [
    // {
    //   title: "Paper Title",
    //   authors: ["Seunggyu Kim", "Coauthor", "Sungeun Hong"],
    //   venue: "Conference on ... (VENUE)",
    //   venueTag: "VENUE 2027",
    //   year: 2027,
    //   selected: true,
    //   highlight: true,
    //   image: "images/paper1.png",
    //   tldr: "One-sentence summary.",
    //   links: { Paper: "https://...", Code: "https://..." },
    //   bibtex: "@inproceedings{...}"
    // }
  ],

  footer: "© 2026 Seunggyu Kim"
};
