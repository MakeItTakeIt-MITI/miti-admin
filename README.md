# MITI Admin

MITI 서비스 운영을 위한 관리자 웹 콘솔입니다.
회원/경기/경기장/문의/신고/정산 데이터를 조회하고, 운영 액션(상태 변경, 답변 등록, 제재 처리 등)을 수행할 수 있습니다.

## 주요 기능

- 회원 관리: 회원 목록 조회, 상세 조회, 정지 처리
- 경기 관리: 경기 목록 조회, 상세 조회, 참가자/신고 정보 확인
- 경기장 관리: 경기장 목록/상세 조회, 정보 수정, 이미지 업로드
- 문의 관리: 유저 문의 및 익명 문의 조회/상세/답변 등록
- 신고 관리: 신고 목록 조회, 상세 확인, 제재/기각 처리
- 정산 관리: 정산 요청 목록/상세 조회, 이체 상태 변경

## 전체 페이지 (라우트)

| 구분      | 경로                            | 페이지           |
| --------- | ------------------------------- | ---------------- |
| 인증      | `/login`                        | 로그인           |
| 메인      | `/`                             | 대시보드         |
| 회원      | `/users`                        | 회원 목록        |
| 회원      | `/users/detail`                 | 회원 상세        |
| 경기      | `/games`                        | 경기 목록        |
| 경기      | `/games/detail`                 | 경기 상세        |
| 경기장    | `/courts`                       | 경기장 목록      |
| 경기장    | `/courts/detail`                | 경기장 상세      |
| 신고      | `/reports`                      | 신고 목록        |
| 신고      | `/reports/detail`               | 신고 상세        |
| 정산      | `/settlements`                  | 정산 요청 목록   |
| 결제      | `/payments`                     | 결제/정산 페이지 |
| 문의      | `/inquiry`                      | 유저 문의 목록   |
| 문의      | `/inquiry/:id`                  | 유저 문의 상세   |
| 익명 문의 | `/anonymous-inquiry`            | 익명 문의 목록   |
| 익명 문의 | `/anonymous-inquiry/:inquiryId` | 익명 문의 상세   |
| 예외      | `*`                             | 404 Not Found    |

## 전체 페이지 스크린샷 (임시 이미지)

아래 이미지는 임시 이미지입니다. 나중에 실제 화면 이미지로 교체해 주세요.

### 로그인

![Login Placeholder](https://dummyimage.com/1200x675/0f172a/e2e8f0&text=MITI+Admin+Login)

### 대시보드

![Dashboard Placeholder](https://dummyimage.com/1200x675/111827/e5e7eb&text=MITI+Admin+Dashboard)

### 경기 목록

![Games List Placeholder](https://dummyimage.com/1200x675/1f2937/f9fafb&text=Games+List)

### 회원 목록

![Users List Placeholder](https://dummyimage.com/1200x675/111827/e5e7eb&text=Users+List)

### 회원 상세

![User Detail Placeholder](https://dummyimage.com/1200x675/0b1020/e2e8f0&text=User+Detail)

### 경기 상세

![Game Detail Placeholder](https://dummyimage.com/1200x675/1e293b/f8fafc&text=Game+Detail)

### 경기장 목록

![Courts List Placeholder](https://dummyimage.com/1200x675/1f2937/e5e7eb&text=Courts+List)

### 경기장 상세

![Court Detail Placeholder](https://dummyimage.com/1200x675/111827/f8fafc&text=Court+Detail)

### 신고 목록

![Reports List Placeholder](https://dummyimage.com/1200x675/0f172a/f1f5f9&text=Reports+List)

### 신고 상세

![Report Detail Placeholder](https://dummyimage.com/1200x675/1e293b/e2e8f0&text=Report+Detail)

### 정산 요청 목록

![Settlements Placeholder](https://dummyimage.com/1200x675/111827/e5e7eb&text=Settlements)

### 결제/정산 페이지

![Payments Placeholder](https://dummyimage.com/1200x675/0b1020/f8fafc&text=Payments)

### 유저 문의 목록

![Inquiry List Placeholder](https://dummyimage.com/1200x675/1f2937/f9fafb&text=Inquiry+List)

### 유저 문의 상세

![Inquiry Detail Placeholder](https://dummyimage.com/1200x675/111827/e5e7eb&text=Inquiry+Detail)

### 익명 문의 목록

![Anonymous Inquiry List Placeholder](https://dummyimage.com/1200x675/0f172a/e2e8f0&text=Anonymous+Inquiry+List)

### 익명 문의 상세

![Anonymous Inquiry Detail Placeholder](https://dummyimage.com/1200x675/1e293b/f8fafc&text=Anonymous+Inquiry+Detail)

### 404 페이지

![404 Placeholder](https://dummyimage.com/1200x675/111827/f3f4f6&text=404+Not+Found)

## 기술 스택

- Frontend: React 18, TypeScript, Vite
- Routing: React Router
- Data Fetching: TanStack Query
- State: Zustand
- Form: React Hook Form
- Styling: Tailwind CSS
- HTTP: Axios
- Notification: React Toastify
- Quality: ESLint, Prettier

## 시작하기

### 1) 설치

```bash
npm install
```

### 2) 개발 서버 실행

```bash
npm run dev
```

기본 접속 주소: `http://localhost:5173`

### 3) 빌드

```bash
npm run build
```

### 4) 프리뷰

```bash
npm run preview
```

## 스크립트

- 개발 서버: `npm run dev`
- 프로덕션 빌드: `npm run build`
- 빌드 결과 프리뷰: `npm run preview`
- 테스트: `npm run test`
- 린트 검사: `npm run lint`
- 린트 자동 수정: `npm run lint:fix`
- 포맷 적용: `npm run format`
- 포맷 검사: `npm run format:check`

## 디렉터리 구조

```text
src/
  api/                # 공통 API 요청 함수
  components/         # 공용 UI 컴포넌트
  constants/          # 상수 정의
  features/           # 도메인별 기능 모듈(auth, games, courts ...)
  pages/              # 라우트 페이지
  store/              # 전역 상태(zustand)
  utils/              # 공용 유틸
```

## 코드 품질 규칙

- ESLint 설정: [eslint.config.js](eslint.config.js)
- Prettier 설정: [.prettierrc](.prettierrc)
- Prettier 제외 규칙: [.prettierignore](.prettierignore)

권장 순서:

1. `npm run lint`
2. `npm run format:check`
3. 필요 시 `npm run lint:fix`, `npm run format`

## 배포 전 체크리스트

- `npm run build` 성공
- `npm run lint` 통과
- `npm run format:check` 통과
- 로그인/주요 운영 플로우(회원, 경기, 문의, 신고, 정산) 수동 점검

## 메모

- 현재 README의 스크린샷은 임시 이미지입니다.
- 실제 운영 화면 이미지로 교체 시 `## 스크린샷` 섹션의 이미지 URL만 변경하면 됩니다.
