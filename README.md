<p align="center">
  <a href="">
    <img width="200" src ="">
  </a>
</p>

<h1 align="center" style="font-weight: 700">合食-健康餐盒平台</h1>

<div align="center" style="margin-bottom:24px">

  <a href="">
  簡報內容
  </a>
  <span>｜</span>
  <a href="https://rocket16th-healthy-mealbox.vercel.app/">
  前台網站
  </a>
  <span>｜</span>
  <a href="">
  後台Repo
  </a>
  <span>｜</span>
  <a href="https://www.notion.so/Page-API-0fb81c74a27840a7ac54a778ed345a6e">
  API流程
  </a>

<br>
<p>開合即食-懶出新高度。輕鬆又健康</p>
<img
  style="border-radius: 16px;"
  src="">
</div>

# 合食-健康餐盒平台-專案發想原由

...

---

## 功能介紹

### 用戶端

- 會員註冊/登入
- 會員資料修改
- 會員預約諮商
- 商城購物流程
- 自選菜色種類
- LinePay結帳
- ...
-
-

## 資料夾結構

```flow
內容...
```

---

## Git Commit 規則

類型以英文表示，commit訊息，以中文表示 ⇒ ex : feat : 建立首頁畫面
| 類型 | 範例格式 | 範例說明 |
| :--------- | :-------------------------------- | :--------------------------------- |
| `新增-feat` | `feat:建立首頁畫面` | `建立首頁畫面的commit message` |
| `更新-update` | `update:首頁畫面部分修改` | `首頁畫面已存在，針對部份去做修改，且修改後與原先不同` |
| `錯誤-fix` | `fix:修復請求商品失敗` | `發request失敗，修復此bug` |
| `優化-refactor` | `refastor:登入邏輯優化 ( 要用更新分支也行 )` | `登入邏輯優化` |
| `雜事-chore` | `chore:刪除部分console` | `刪除部分頁面的console` |

---

## Git Branch 命名規則

英文小寫，類型後面 + / + 功能說明 ( 此處使用英文 )
| 類型 | 範例格式 | 範例說明 |
| :--------- | :-------------------------------- | :--------------------------------- |
| `新增-feature ` | `feature / 功能(畫面)說明` | `feature/login-logic => 新增登入邏輯` |
| `更新-update ` | `update / 功能(畫面)說明` | `update/login-ui => 更新邏輯畫面` |
| `錯誤-fix` | `fix / 功能(畫面)說明` | `fix/request-error => 修復請求失敗` |
| `優化-refactor` | `refactor / 功能(畫面)說明` | `refactor/login-logic => 優化登入邏輯` |
| `雜事-chore` | `chore / 說明` | `chore / remove-console-logs => 移除console.log` |

---

## 技術規格

<h2 align="center">👩‍💻 設計工具</h2>
 <p>
  <img alt="MIRO" src="https://img.shields.io/badge/MIRO-yellow?style=for-the-badge&logo=MIRO"/>
  <img alt="Figma" src="https://img.shields.io/badge/Figma-blue?style=for-the-badge&logo=Figma"  />
  <img alt="Illustrator" src="https://img.shields.io/badge/Adobe_llustrator-orange?style=for-the-badge&logo=Adobe" />
  <img alt="claude" src="https://img.shields.io/badge/claude-%23D97757?style=for-the-badge&logo=claude" />
  <img alt="ideogram" src="https://img.shields.io/badge/ideogram-green?style=for-the-badge&logo=ideogram" />

### 工具說明：

- [ 設計稿製作 ]：Figma

  - ?
  - ?
  - ?
  </p>

<h2 align="center">💻 前端技術</h2>
 <p>
 <img alt="npm" src="https://img.shields.io/badge/npm-%23CA0000?style=for-the-badge&logo=npm">
  <img alt="vscode" src="https://img.shields.io/badge/vs_code-blue?style=for-the-badge&logo=vs_code">
  <img alt="vite" src="https://img.shields.io/badge/vite-yellow?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="vue" src="https://img.shields.io/badge/vue3-%2304DF8F?style=for-the-badge&logo=vue">
  <img alt="vue-router" src="https://img.shields.io/badge/vue_router-%2319E490?style=for-the-badge&logo=vue_router">
  <img alt="pinia" src="https://img.shields.io/badge/pinia-yellow?style=for-the-badge&logo=pinia">
  <img alt="tailwind-css" src="https://img.shields.io/badge/Tailwind_Css-%2338BDF8?style=for-the-badge&logo=TailwindCss&logoColor=white">
  <img alt="sass" src="https://img.shields.io/badge/scss-%23C66394?style=for-the-badge&logo=sass&logoColor=white">
  <img alt="vercel" src="https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel">
  <img alt="Axios" src="https://img.shields.io/badge/Axios-8A2BE2?style=for-the-badge&logo=Axios">
  <img alt="Element-plus" src="https://img.shields.io/badge/Element_plus-%233F85ED?style=for-the-badge&logo=Element_plus">
  <img alt="github" src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github&logoColor=white">
  <img alt="git" src="https://img.shields.io/badge/git-%23E94E31?style=for-the-badge&logo=git&logoColor=white">

### 技術說明：

- [ 框架 ]：Vue3.4

  - 使用 Vue3 來進行前端開發，透過 Vue3 以及 vue-router、Pinia，能夠快速的開發出一個網頁。

- [ 語言 ]：TypeScript/JavaScript

  - 建立環境時已先建置 TypeScript 設定，主要為JavaScript，會在轉換為TypeScript。

- [ CSS ]：Tailwind

  - 使用Tailwind來進行CSS的開發，透過Tailwind的原子化架構，可以增加協作時的樣式更改效率。

- [ Ui-library ]：Element-plus

  - 使用 Element-plus 使用部分的ui元件。

- [ 部署平台 ]：Vercel
  - 使用 Vercel 進行佈署，實現快速的自動化部署流程，簡化開發到上線的過程。
  </p>

<h2 align="center">⌨️ 後端技術</h2>
 <p>
  <img alt="Visual_Studio" src="https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white" />
  <img alt=".NET" src="https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" />
  <img alt="C#" src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white" />
  <img alt="SQL" src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white" />
  <img alt="POSTMAN" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
  <img alt="Azure" src="https://img.shields.io/badge/microsoft%20azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white" />
  <img alt="GItHUB" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img alt="GIT" src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" />

### 技術說明：

- [ 環境 ]：Microsoft Visual Studio

  - 使用的是.net Freamwork 平台，網頁技術版本則是asp.net。

- [ 框架 ]：ASP.NET Web API 2

  - 一個由Microsoft開發的框架，用於快速構建Web API的接口。裡面包含Get、Post、Put、Delete、Patch等。

- [ 資料庫 ]：Microsoft SQL Server

  - 微軟的關聯式資料庫，用來查詢垂直擴展的關聯表格，可以高效的查詢表跟表之間的關聯資料。

- [ 雲端平台 ]：Azure
  - Microsoft提供一個雲端平台，讓使用者可以使用多種的服務，其中有計算、存儲、資料庫、部署和管理自己的應用程序。

</p>
