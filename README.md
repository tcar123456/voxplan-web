# VoxPlan 產品官網

語音行事曆 App [VoxPlan](https://github.com/tcar123456/AI-Calendar) 的產品官網與必要法律頁面。

**狀態**：App 未上架，官網保留作為記錄。

---

## 技術棧

原生 HTML / CSS / JavaScript，無框架、無建置流程。

## 內容

| 檔案 | 用途 |
|------|------|
| `index.html` | 產品首頁（功能介紹、示範影片、下載按鈕） |
| `privacy.html` | 隱私權政策 |
| `terms.html` | 使用條款 |
| `delete-account.html` | 帳號刪除說明 |

後三者是 App Store 與 Google Play 上架的必要頁面。

## 設計重點

**不用框架，因為這是一個純展示頁。** 沒有互動狀態也沒有資料來源，加上框架只會讓首屏變慢。

**SEO 與分享預覽做完整。** Open Graph、Twitter Card、canonical、`sitemap.xml`、`robots.txt`，以及 schema.org 的 `MobileApplication` JSON-LD 結構化資料。

**示範影片直接放 MP4。** 三段功能演示以原生 `<video>` 播放，不依賴外部嵌入服務。

## 本機預覽

```bash
python3 -m http.server 8000     # 或任何靜態伺服器
```

## 已知限制

- 商店下載按鈕指向尚未存在的上架頁面
- `assets/` 中的影片未壓縮，首頁載入量偏大
