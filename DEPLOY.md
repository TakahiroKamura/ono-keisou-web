# デプロイ手順書（Docker版）

## 概要
このガイドでは、`ono-keisou-web` を Docker と Cloudflare Tunnel を使って `pmksy.org/ono-keisou` で公開する手順を説明します。

**特徴:**
- ✅ Dockerで完全にコンテナ化（Ubuntu環境を汚さない）
- ✅ Nginx + Cloudflare Tunnel を Docker Compose で管理
- ✅ 簡単なデプロイと更新手順
- ✅ ポート開放不要で安全

## 前提条件
- 自宅のUbuntuサーバにSSHでアクセス可能
- Dockerがインストール済み（未インストールの場合は後述の手順参照）
- Cloudflareアカウントを所有
- `pmksy.org` ドメインがCloudflareで管理されている

---

## 1. Dockerのインストール（未インストールの場合）

Ubuntuサーバ上で実行：

```bash
# 古いバージョンの削除
sudo apt remove docker docker-engine docker.io containerd runc

# 必要なパッケージのインストール
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# Docker GPGキーの追加
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Dockerリポジトリの追加
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Dockerのインストール
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# ユーザーをdockerグループに追加（再ログイン必要）
sudo usermod -aG docker $USER

# インストール確認
docker --version
docker compose version
```

---

## 2. プロダクションビルドの作成

ローカル環境で実行：

```bash
cd /home/ono-keisou-web
npm run build
```

ビルド成果物は `dist/` ディレクトリに生成されます。

---

## 3. プロジェクトファイルをサーバに転送

```bash
# プロジェクト全体をサーバに転送
rsync -avz --exclude 'node_modules' --exclude '.git' \
  /home/ono-keisou-web/ user@your-server-ip:~/ono-keisou-web/
```

または、必要なファイルのみ転送：

```bash
# 必要なファイルのみ
scp -r dist docker-compose.yml nginx.conf .env.example user@your-server-ip:~/ono-keisou-web/
```

---

## 4. Cloudflare Tunnel の設定

### 4.1 Cloudflare ダッシュボードでトンネルを作成

1. **Cloudflare Dashboard** にログイン
2. **Zero Trust** → **Access** → **Tunnels** に移動
3. **Create a tunnel** をクリック
4. トンネル名を入力（例: `ono-keisou-tunnel`）
5. **Save tunnel** をクリック
6. **トンネルトークン** をコピー（後で使用）

### 4.2 Public Hostname の設定

Tunnelの設定画面で：

1. **Public Hostname** タブを開く
2. **Add a public hostname** をクリック
3. 以下を設定：
   - **Subdomain**: 空欄（ルートドメインの場合）または `www`
   - **Domain**: `pmksy.org`
   - **Path**: 空欄
   - **Type**: `HTTP`
   - **URL**: `nginx:80`（Docker内のnginxコンテナ名）
4. **Save hostname**

---

## 5. サーバ上でDockerコンテナを起動

Ubuntuサーバ上で実行：

```bash
cd ~/ono-keisou-web

# 環境変数ファイルを作成
cp .env.example .env
nano .env
```

`.env` ファイルに、Cloudflareで取得したトンネルトークンを設定：
```bash
TUNNEL_TOKEN=eyJhIjoiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwIiwidCI6IjEyMzQ1Njc4LWFiY2QtZWZnaC1pamtsLW1ub3BxcnN0dXZ3eCIsInMiOiJhYmNkZWZnaGlqa2xtbm9wIn0=
```

コンテナを起動：
```bash
# コンテナをバックグラウンドで起動
docker compose up -d

# ログを確認
docker compose logs -f

# コンテナの状態確認
docker compose ps
```

---

## 6. 動作確認

ブラウザで以下にアクセス：
```
https://pmksy.org/ono-keisou/
```

ローカルでの確認（Ubuntuサーバ上）：
```bash
curl http://localhost:8080/ono-keisou/
```

---

## 7. コンテナの管理コマンド

### コンテナの起動・停止
```bash
# 起動
docker compose up -d

# 停止
docker compose down

# 再起動
docker compose restart

# ログ確認
docker compose logs -f

# 特定のコンテナのログ
docker compose logs -f nginx
docker compose logs -f cloudflared
```

### コンテナの状態確認
```bash
# 実行中のコンテナ
docker compose ps

# リソース使用状況
docker stats
```

---

## 8. サイトの更新手順

サイトを更新する際は以下を実行：

### ローカルで作業
```bash
cd /home/ono-keisou-web

# コードを編集

# ビルド
npm run build

# サーバへ転送
rsync -avz --delete dist/ user@your-server-ip:~/ono-keisou-web/dist/
```

### サーバ側で作業
```bash
cd ~/ono-keisou-web

# Nginxコンテナを再起動（設定変更がない場合は不要）
docker compose restart nginx
```

**注意**: Nginxは `dist` ディレクトリをボリュームマウントしているため、ファイルを転送するだけで自動的に反映されます。

---

## トラブルシューティング

### Nginxエラーの確認
```bash
# Nginxコンテナのログ
docker compose logs nginx

# Nginxコンテナ内に入る
docker compose exec nginx sh

# 設定ファイルのテスト
docker compose exec nginx nginx -t
```

### Cloudflaredの確認
```bash
# Cloudflaredのログ
docker compose logs cloudflared

# トンネルの接続状態
docker compose exec cloudflared cloudflared tunnel info
```

### コンテナが起動しない場合
```bash
# 詳細なログを確認
docker compose logs

# コンテナを削除して再作成
docker compose down
docker compose up -d --force-recreate
```

### ポート競合の確認
```bash
# ポート8080を使用しているプロセスを確認
sudo lsof -i :8080
sudo netstat -tulpn | grep 8080
```

ポート8080が使用中の場合、`docker-compose.yml` のポート設定を変更：
```yaml
ports:
  - "8081:80"  # 8080 → 8081 に変更
```

---

## 9. 自動起動の設定

Docker Composeで起動したコンテナは、サーバ再起動後も自動で起動します（`restart: unless-stopped` 設定済み）。

Dockerサービス自体の自動起動を確認：
```bash
# Docker自動起動の確認
sudo systemctl is-enabled docker

# 自動起動を有効化（未設定の場合）
sudo systemctl enable docker
```

---

## 10. バックアップとリストア

### バックアップ
```bash
# プロジェクトディレクトリ全体をバックアップ
tar -czf ono-keisou-backup-$(date +%Y%m%d).tar.gz ~/ono-keisou-web/
```

### リストア
```bash
# バックアップから復元
tar -xzf ono-keisou-backup-20250123.tar.gz -C ~/
cd ~/ono-keisou-web
docker compose up -d
```

---

## 補足：Cloudflare の設定最適化

### SSL/TLS設定
Cloudflare Dashboard → SSL/TLS → Overview
- 暗号化モード: `Flexible` に設定（HTTP接続のため）

### キャッシュ設定
Cloudflare Dashboard → Caching → Configuration
- ブラウザキャッシュTTL: 4時間

### Page Rules（オプション）
Cloudflare Dashboard → Rules → Page Rules
- URL: `pmksy.org/ono-keisou/*`
- Settings: 
  - Cache Level: Standard
  - Browser Cache TTL: 4 hours

### セキュリティ設定
- Cloudflare Dashboard → Security → WAF で基本的な保護を有効化
- Bot Fight Mode を有効化

---

## プロジェクト構成

```
ono-keisou-web/
├── docker-compose.yml    # Docker Compose設定
├── nginx.conf            # Nginx設定
├── .env                  # 環境変数（トンネルトークン）
├── .env.example          # 環境変数のサンプル
└── dist/                 # ビルド済みファイル
    ├── index.html
    └── assets/
```

---

## 注意事項

- ✅ Dockerで完全にコンテナ化されているため、Ubuntu環境は汚れません
- ✅ Cloudflare Tunnel は外部からのポート開放が不要（セキュアな構成）
- ✅ トンネルはすべてアウトバウンド接続のみ使用
- ⚠️ `.env` ファイルのトンネルトークンは厳重に管理してください
- ⚠️ `.env` は `.gitignore` に追加してGitにコミットしないこと

---

## よくある質問

### Q: コンテナを完全に削除したい
```bash
docker compose down -v
docker system prune -a
```

### Q: nginx設定を変更したい
1. `nginx.conf` を編集
2. `docker compose restart nginx` で反映

### Q: トンネルトークンを変更したい
1. `.env` ファイルを編集
2. `docker compose up -d` で再起動

### Q: ログを永続化したい
`docker-compose.yml` にボリュームを追加：
```yaml
volumes:
  - ./logs:/var/log/nginx
```
