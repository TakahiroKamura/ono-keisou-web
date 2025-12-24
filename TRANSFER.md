# WSLからUbuntuサーバへの転送手順

## 前提条件の確認

### 1. SSH接続のテスト
まず、Ubuntuサーバに接続できるか確認：

```bash
# 接続テスト
ssh user@サーバのIPアドレス

# 例：
# ssh ubuntu@192.168.1.100
```

接続できたら `exit` で戻ります。

---

## 方法1: rsync を使った転送（推奨）

### rsyncのインストール確認
```bash
# WSL上で実行
rsync --version

# インストールされていない場合
sudo apt update
sudo apt install rsync -y
```

### プロジェクト全体を転送
```bash
cd /home/ono-keisou-web

# 転送実行（初回）
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  . user@サーバIP:~/ono-keisou-web/

# 例：
# rsync -avz --progress \
#   --exclude 'node_modules' \
#   --exclude '.git' \
#   --exclude '.env' \
#   . ubuntu@192.168.1.100:~/ono-keisou-web/
```

### 更新時の転送（差分のみ）
```bash
# ビルド後に実行
npm run build

# distディレクトリのみ転送
rsync -avz --progress --delete \
  dist/ user@サーバIP:~/ono-keisou-web/dist/
```

---

## 方法2: scp を使った転送

### プロジェクト全体を転送
```bash
cd /home

# ディレクトリごと転送
scp -r ono-keisou-web user@サーバIP:~/

# 例：
# scp -r ono-keisou-web ubuntu@192.168.1.100:~/
```

### 特定のファイルのみ転送
```bash
cd /home/ono-keisou-web

# 必要なファイルを個別に転送
scp docker-compose.yml user@サーバIP:~/ono-keisou-web/
scp nginx.conf user@サーバIP:~/ono-keisou-web/
scp .env.example user@サーバIP:~/ono-keisou-web/
scp -r dist user@サーバIP:~/ono-keisou-web/
```

---

## 方法3: SSH鍵認証の設定（パスワード入力を省略）

毎回パスワードを入力するのが面倒な場合：

### 1. SSH鍵の生成（WSL上）
```bash
# 鍵がない場合のみ生成
ssh-keygen -t ed25519 -C "your-email@example.com"

# Enterを3回押す（デフォルト設定）
```

### 2. 公開鍵をサーバに転送
```bash
ssh-copy-id user@サーバIP

# 例：
# ssh-copy-id ubuntu@192.168.1.100
```

### 3. 接続確認
```bash
# パスワード不要で接続できるはず
ssh user@サーバIP
```

---

## 便利なエイリアス設定（オプション）

転送コマンドを短縮するため、`.bashrc` にエイリアスを追加：

```bash
# WSL上で編集
nano ~/.bashrc

# 以下を追加（サーバIPとユーザー名を変更）
alias deploy-ono='cd /home/ono-keisou-web && npm run build && rsync -avz --progress --delete dist/ ubuntu@192.168.1.100:~/ono-keisou-web/dist/'

# 保存して反映
source ~/.bashrc
```

これで `deploy-ono` コマンドだけで、ビルドと転送が完了します。

---

## 完全なデプロイ手順（まとめ）

### WSL側での作業

```bash
# 1. プロジェクトディレクトリに移動
cd /home/ono-keisou-web

# 2. ビルド
npm run build

# 3. 初回転送（全ファイル）
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  . user@サーバIP:~/ono-keisou-web/

# または、更新時（distのみ）
rsync -avz --progress --delete \
  dist/ user@サーバIP:~/ono-keisou-web/dist/
```

### Ubuntuサーバ側での作業

```bash
# 1. サーバにSSH接続
ssh user@サーバIP

# 2. プロジェクトディレクトリに移動
cd ~/ono-keisou-web

# 3. .envファイルを作成（初回のみ）
cp .env.example .env
nano .env
# TUNNEL_TOKEN を設定

# 4. Dockerコンテナ起動
docker compose up -d

# 5. ログ確認
docker compose logs -f
```

---

## トラブルシューティング

### "Permission denied" エラー
```bash
# サーバ側でディレクトリの権限を確認
ssh user@サーバIP "mkdir -p ~/ono-keisou-web && chmod 755 ~/ono-keisou-web"
```

### "Host key verification failed" エラー
```bash
# known_hostsから削除して再接続
ssh-keygen -R サーバIP
ssh user@サーバIP
```

### WSLからWindowsのファイルにアクセス
```bash
# Windowsのファイルは /mnt/c/ 以下にマウントされています
cd /mnt/c/Users/YourUsername/Documents/
```

### 転送速度が遅い場合
```bash
# 圧縮を無効化（ローカルネットワークの場合）
rsync -av --no-compress --progress dist/ user@サーバIP:~/ono-keisou-web/dist/
```

---

## ワンライナーでデプロイ

すべてを1つのコマンドで実行：

```bash
cd /home/ono-keisou-web && \
npm run build && \
rsync -avz --progress --delete dist/ user@サーバIP:~/ono-keisou-web/dist/ && \
ssh user@サーバIP "cd ~/ono-keisou-web && docker compose restart nginx"
```

このコマンドで：
1. ビルド
2. 転送
3. Nginxコンテナの再起動

まで自動で完了します。
