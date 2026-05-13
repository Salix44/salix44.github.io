# 살릭스 로그

Astro, TypeScript, Lit로 구성한 한국어 개발자 블로그입니다. 개발 노트, 게임 글, 자료 아카이브를 함께 다룰 수 있도록 콘텐츠 컬렉션과 태그/카테고리 탐색을 포함했습니다.

## 기술 구성

- npm 기반 패키지 관리
- Astro 6 정적 사이트
- TypeScript strict 설정
- Lit 웹 컴포넌트 기반 글 필터
- GitHub Pages 배포 워크플로

## 실행

PowerShell에서 `npm` 실행 정책 오류가 나면 같은 명령을 `npm.cmd`로 실행하면 됩니다.

```bash
npm install
npm run dev
```

검증과 빌드는 다음 명령을 사용합니다.

```bash
npm run check
npm run build
```

## 글 작성

새 글은 `src/content/blog` 아래에 Markdown 파일로 추가합니다.

```md
---
title: "글 제목"
description: "목록과 검색 결과에 보일 요약"
publishDate: 2026-05-13
category: "개발"
tags: ["Astro", "TypeScript"]
draft: false
---

본문을 한국어로 작성합니다.
```

카테고리는 `개발`, `게임`, `자료` 중 하나를 사용합니다. 임시 글은 `draft: true`로 두면 프로덕션 빌드에서 제외됩니다.

## GitHub Pages 배포

1. GitHub 저장소에 이 프로젝트를 push합니다.
2. 저장소 Settings -> Pages에서 Source를 `GitHub Actions`로 설정합니다.
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 실행됩니다.

프로젝트 페이지 저장소라면 Actions 환경의 `GITHUB_REPOSITORY` 값으로 base path가 자동 설정됩니다. 사용자/조직 페이지 저장소인 `사용자명.github.io` 형태에서는 base path 없이 빌드됩니다. 별도 도메인을 쓰는 경우 Actions 변수로 `SITE`를 지정할 수 있습니다.
