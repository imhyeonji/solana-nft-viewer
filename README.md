# NFT viewer

Make a simple NFT viewer app that can be used to list the NFTs of an arbitrary public key

## 테스트 가능 환경

라이브 환경(mainnet-beta)에서 테스트 가능합니다.

## 프로젝트 구조

```
src
├── App.tsx
├── assets
│   ├── icon_bookmark.svg
│   └── icon_search.svg
├── components
│   ├── NFT
│   │   ├── DraggableContext.tsx
│   │   ├── NFTCard.tsx
│   │   └── NFTList.tsx
│   └── common
│       ├── Buttons.tsx
│       └── Search.tsx
├── index.css
├── index.tsx
├── pages
│   ├── MainPage.tsx
│   └── NFTListPage.tsx
├── react-app-env.d.ts
├── setupTests.ts
└── utils
    └── utils.ts
```

## 실행

```bash
# 해당 프로젝트는 패키지 관리 툴로 yarn을 사용합니다.

$ yarn install

$ yarn start
```

## Libraries

- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/docs)

- [solana/web3.js](https://docs.solana.com/)
- [Metaplex](https://docs.metaplex.com/)

- [dnd-kit](https://docs.dndkit.com/) drag-and-drop 구현에 사용

## 개발 기간

- 작업 기간: 2022/03/24 ~ 2022/03/28
