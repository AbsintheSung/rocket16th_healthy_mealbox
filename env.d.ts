/// <reference types="vite/client" />

//配置 部屬前生成自動生成內容
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }