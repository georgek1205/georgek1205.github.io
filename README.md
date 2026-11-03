# Personal site

Single-page academic homepage. No build step, no Jekyll — just static files for GitHub Pages.

## 구조
```
index.html          레이아웃 (거의 안 건드려도 됨)
content.js          ← 내용은 전부 여기서 수정
assets/style.css    디자인 (색: --accent 한 줄만 바꾸면 전체 톤 변경)
assets/main.js      렌더링 로직
images/             프로필 사진, 논문/프로젝트 썸네일
files/              cv.pdf 등
```

## 배포 (GitHub Pages)
1. `<username>.github.io` 이름으로 새 리포지토리 생성 (기존 academicpages 리포를 쓰려면 파일을 전부 지우고 이 파일들로 교체)
2. 이 폴더의 파일을 전부 push
3. Settings → Pages → Source: *Deploy from a branch*, Branch: `main` / `(root)`
4. 1–2분 뒤 `https://<username>.github.io` 에서 확인

`.nojekyll` 파일은 GitHub가 Jekyll 처리를 건너뛰게 합니다 (지우지 마세요).

## 로컬 미리보기
`index.html`을 브라우저로 바로 열면 됩니다. (또는 `python3 -m http.server` 후 http://localhost:8000)

## 로고 넣기
`images/` 폴더에 아래 이름으로 넣으면 자동으로 표시됩니다 (없으면 글자 배지로 대체).
- `images/logo-skku.png` — 성균관대
- `images/logo-cityu.png` — City University of Hong Kong
- `images/logo-etri.png` — ETRI

정사각형에 가까운 엠블럼(심볼)형 PNG/SVG가 가장 균형 있게 보입니다. 파일명을 바꾸려면 `content.js`의 `logo` 경로만 수정하세요.

## 자주 하는 수정
- **프로필 사진**: `images/profile.jpg` 넣고 `content.js`의 `photo: "images/profile.jpg"`
- **프로젝트 썸네일**: `image: "images/xxx.png"` (클릭하면 크게 보기)
- **논문 썸네일**: `image: "images/paper1.png"` (비워두면 제목 기반으로 자동 패턴 생성)
- **Selected 탭**: 대표 논문에 `selected: true`
- **배지 강조**: 탑 학회 논문에 `highlight: true`
- **섹션 숨기기**: `projects` 또는 `honors` 배열을 비우면 섹션이 자동으로 사라지고 번호가 다시 매겨집니다
- **강조색**: `assets/style.css` 상단 `--accent`, `--accent-deep`
- **링크 아이콘 추가**: `content.js`의 `links`에 Font Awesome 클래스로 추가 (예: `fa-brands fa-github`)
