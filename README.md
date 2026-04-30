# 志太泉酒造 商品カタログ

静岡県藤枝市・志太泉酒造の営業用デジタルカタログWebアプリです。

## 開発・起動手順

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開くとカタログが表示されます。

---

## Googleスプレッドシートとの連携手順

### 1. スプレッドシートを作成する

1行目をヘッダー行として、以下の列を作成してください。

| 列 | ヘッダー名 | 内容 | 例 |
|----|-----------|------|----|
| A | id | 商品ID（重複不可） | 001 |
| B | name_ja | 商品名（日本語） | 志太泉 純米大吟醸 |
| C | name_en | 商品名（英語） | Shidaizumi Junmai Daiginjo |
| D | category | 種別 | 純米大吟醸 |
| E | rice | 原料米 | 山田錦 |
| F | yeast | 酵母 | 静岡酵母（HD-1） |
| G | seimaibuai | 精米歩合（数字のみ） | 40 |
| H | alcohol | アルコール度数（数字のみ） | 16 |
| I | nihonshu_do | 日本酒度 | +3 |
| J | acidity | 酸度（数字のみ） | 1.4 |
| K | price_720 | 720ml価格（数字のみ、空欄可） | 3520 |
| L | price_1800 | 1800ml価格（数字のみ、空欄可） | 7040 |
| M | description_ja | 商品説明（日本語） | 山田錦を40%まで磨いた... |
| N | description_en | 商品説明（英語） | Carefully polished... |
| O | tasting_ja | テイスティングノート（日本語） | フルーティな吟醸香... |
| P | tasting_en | テイスティングノート（英語） | Fruity ginjo aroma... |
| Q | pairing_ja | フードペアリング（日本語） | 刺身、白身魚... |
| R | pairing_en | フードペアリング（英語） | Sashimi, white fish... |
| S | image_url | 商品画像URL（空欄可） | https://... |

> **価格について**: 720ml・1800mlどちらも空欄の場合は「お問い合わせください」と表示されます。カップ酒など規格外の商品に使えます。

### 2. スプレッドシートをウェブに公開する

1. Googleスプレッドシートを開く
2. メニュー「ファイル」→「共有」→「ウェブに公開」をクリック
3. 「リンク」タブで「シート1」「カンマ区切りの値（.csv）」を選択
4. 「公開」ボタンをクリック
5. 表示されたURLをコピーする

URLの形式：
```
https://docs.google.com/spreadsheets/d/XXXXXXXXXX/pub?gid=0&single=true&output=csv
```

### 3. 環境変数を設定する

プロジェクトのルートに `.env` ファイルを作成し、コピーしたURLを設定します。

```bash
# .env.example をコピーして .env を作成
cp .env.example .env
```

`.env` を編集：

```
VITE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/XXXXXXXXXX/pub?gid=0&single=true&output=csv
```

### 4. 動作確認

```bash
npm run dev
```

データが取得できない場合は、サンプルデータが自動的に表示されます。

---

## GitHub Pages へのデプロイ

```bash
npm run build
```

`dist/` フォルダの内容をGitHub Pagesに配置してください。

### GitHub Actions を使う場合

`.github/workflows/deploy.yml` を以下の内容で作成します：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
        env:
          VITE_SHEET_CSV_URL: ${{ secrets.VITE_SHEET_CSV_URL }}
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

GitHub リポジトリの「Settings」→「Secrets」に `VITE_SHEET_CSV_URL` を登録してください。

---

## 技術スタック

- **React 18** + **Vite** — UIフレームワーク
- **Tailwind CSS** — スタイリング
- **PapaParse** — CSV解析
- フォント: Noto Serif JP / Noto Sans JP / Playfair Display / Lato
