# 作品集精選專案與技能摘要 (Selected Projects & Skills Summary)

本文件特別整理了您作品集中的四大核心技術亮點，包含 Agent 架構、自動化分析工具、全端 AI 應用以及經典後端/前端專案，以利您後續整理與呈現。

---
## 1. ✈️ Travel Digest AI (智慧行程解析與優化應用)

## 📝 專案介紹

**Travel Digest AI** 是一款智慧旅遊行程規劃與管理系統。本專案旨在解決旅客在閱讀網路上零散攻略（如部落格文章、社群貼文、旅遊清單）時，難以快速整理成實際行程的痛點。

### 📌 基本功能
* **一鍵解析攻略**：貼上任意網頁攻略或景點列表，系統便會自動辨識景點、時間、停留時長等資訊。
* **多視角行程管理**：提供直觀的 **看板視角 (Kanban)**、**時間軸視角 (Timeline)** 與 **Google 地圖 (Map)** 的連動式介面，支援拖曳排程、景點編輯與自訂行程點。
* **智慧路線最佳化**：利用 TSP (旅行推銷員) 演算法結合 Google Routes API，一鍵幫使用者排出不走回頭路的最佳行車/步行路線。
* **地圖實景同步**：自動同步 Google 地標之地址、經緯度、電話與真實實景圖片。

### ⚙️ 系統技術
本系統採用全端一體化設計，技術棧包含：
* **前端與全端框架**：基於最新 **Next.js 16 (App Router)**、**React 19** 與 **TypeScript**。
* **介面與樣式**：採用 **Tailwind CSS (v4)** 與 **shadcn/ui** 打造現代精緻、支援暗黑模式的流暢 UI。
* **人工智慧**：整合 **Gemini 3.5 Flash API**，利用 Structured Outputs 精準輸出 JSON 結構。
* **地圖生態**：深度整合 **Google Maps JS SDK**、**Places API (New)** 與 **Routes API (New)**。

---

---

## 2. 🔍 mitmproxy 流量分析與 API 逆向技能 (mitmproxy Flow Analysis)
github repo: https://github.com/zenbrian/mitmproxy-Flow-Analysis-AgentSkill/tree/main/mitmproxy-flow-analysis
### 📌 技能概述
透過撰寫專屬技能指南，賦予 AI 代理人解析 `mitmproxy` 錄製之流量檔 (`.mitm`) 的能力，實現全自動的 API 流程分析與逆向工程。

### 🛠️ 技術與工具
*   **核心工具**: `mitmproxy`, Python (`mitmproxy` API)
*   **技能配置**: **[mitmproxy-flow-analysis](file:///C:/Users/zenboen/.gemini/config/skills/mitmproxy-flow-analysis/SKILL.md)**

### 🌟 實作亮點
*   **流量自動結構化**: 將擷取到的加密/明文 HTTP/HTTPS 流量包進行拆解，過濾雜訊後自動輸出為結構化的 API Flow 紀錄。
*   **電商/登入流分析**: 特別針對「需要處理複雜 Cookie、CSRF Token 與驗證流程」的複雜網頁（如電商結帳、登入流程）提供自動化逆向解析路徑。
*   **無縫轉換為自動化指令**: 分析後的 API 結構可直接作為開發高效能 headless 爬蟲（如使用 `net/http` 取代 Puppeteer/Playwright）的規格書，顯著降低開發耗時。

---




## 3. 🎓 Golang select-course (選課與功課表系統)
github repo: https://github.com/zenbrian/select-course
## 專案介紹

本專案是一個基於 **Go (Chi)** 與 **React (TypeScript)** 開發的高性能選課系統。系統模擬高併發場景下的選課（搶課）機制，並透過資料庫行級鎖（`SELECT ... FOR UPDATE`）以及 Redis 緩存預檢機制，在極高負載下維持 0 超賣、0 錯誤率的強一致性，並顯著降低資料庫的壓力與系統延遲。

### 系統基本功能
- **使用者登入與驗證**：支援帳號登入、Session 狀態檢查與安全登出。
- **課程清單瀏覽與篩選**：使用者可依關鍵字（課程名稱、編號）搜尋課程，並能根據分類進行篩選。
- **即時衝堂檢查**：前端與後端均實作時間衝突（相同星期與時段）偵測，自動停用衝突課程的加入按鈕，防止使用者排入衝突課表。
- **即時名額預檢**：即時顯示各課程剩餘名額，當名額為 0 時標示為額滿並限制選課。
- **視覺化課表呈現**：以直觀的週曆時間表（週一至週五，上午/下午/晚上）呈現已選取的課程，並支援在課表上直接一鍵退選。
- **高併發搶課機制**：藉由 Redis 預檢與資料庫事務鎖（Row-Level Locking）的雙重機制，在高負載併發請求下保證數據強一致性。

### 系統使用技術

#### 後端技術棧 (Backend)
- **程式語言**：Go
- **Web 框架**：`go-chi/chi` (輕量高效的 HTTP 路由框架)
- **資料庫**：PostgreSQL
- **資料庫工具**：
  - `sqlc` (從 SQL 查詢自動生成 Go 代碼的工具)
  - `goose` (用於資料庫結構遷移與版控)
- **快取與併發優化**：
  - `Redis` (配合 `HINCRBY` 原子操作進行課程容量前置過濾，攔截無效請求)


## 4. zigbee2mcp_agent
yt link:https://youtu.be/qbWzEjvoQUY

本專案旨在**結合小語言模型（SLM）、Zigbee2MQTT 與 Model Context Protocol（MCP），打造低成本、在地端運行的 AI 語音智慧家居助理解決方案**。

系統基於 **WebSocket 實時雙向音訊串流** 實現端到端語音對話。其核心功能是讓使用者能透過語音直接控制與查詢智慧家居設備：系統在本地端進行高效率的語音活動檢測（VAD）與語音轉文字（ASR），再由地端部署的小語言模型（SLM，如經由 Ollama 運行的輕量模型）或雲端 LLM 處理對話邏輯，並透過 **MCP** 協議動態調用 **Zigbee2MQTT** 等物聯網工具控制家中設備，最後將回答即時合成為語音（TTS）回傳給前端播放，實現低延遲、隱私安全、具備工具調用與記憶能力的實時語音智慧家居交互體驗。
 


