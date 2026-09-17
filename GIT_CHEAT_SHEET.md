# Git & GitHub 核心實戰手冊

---

## 1. 核心觀念釐清

* **Git**：安裝在本地電腦的版本控制**工具**，離線也能完整使用（Commit、分支）。
* **GitHub**：微軟旗下的**雲端代管平台**，用於團隊協作與遠端備份。
* **Git 三大區域**：
  $$\text{工作目錄 (Working Tree)} \xrightarrow{\text{git add}} \text{暫存區 (Staging Area)} \xrightarrow{\text{git commit}} \text{版本庫 (Repository)}$$

---

## 2. 日常開發工作流 (日常必備)

```powershell
# 1. 檢視當前狀態
git status

# 2. 將修改加入暫存區
git add app.js       # 單一檔案
git add .            # 所有變更

# 3. 提交版本點
git commit -m "feat: 你的改動說明"

# 4. 推送到 GitHub（可累積多次 commit 後一次 push）
git push
```

---

## 3. 版本撤銷與還原 (後悔藥)

### A. 未 Commit 前的撤銷
| 指令 | 作用 |
| :--- | :--- |
| `git restore <file>` | **放棄工作目錄的修改**，打回上次暫存/commit 的狀態（代碼會消失） |
| `git restore --staged <file>` | **取消 `git add`**，將檔案移出暫存區，但保留程式碼 |

### B. Commit 後的撤銷 (`git reset`)
> **`HEAD~1` 意思**：當前版本的前 1 代祖先（`HEAD` = 最新，`~1` = 往前推 1 個 Commit）。

| 指令 | 效果 | 適用情境 |
| :--- | :--- | :--- |
| `git reset --soft HEAD~1` | 拆掉 Commit，程式碼**留在暫存區** | 想改 Commit 訊息或補檔案 |
| `git reset HEAD~1` | 拆掉 Commit，程式碼**退回未暫存** | 想重新改寫邏輯再提交 |
| `git reset --hard HEAD~1` | 拆掉 Commit，程式碼**全部刪除** | 徹底放棄這次改動 |

> **救命符**：若不小心 `reset --hard` 誤刪，輸入 `git reflog` 查出 Commit ID，再用 `git reset --hard <ID>` 即可跳回！

---

## 4. 本地專案結合與上傳 GitHub

### A. 第一次推送（專案剛建立時的綁定步驟）：
```powershell
# 1. 確保分支名稱為現代標準 main
git branch -M main

# 2. 綁定遠端倉庫網址
git remote add origin https://github.com/<帳號>/<專案名稱>.git

# 3. 第一次推送並綁定上游 (-u)
git push -u origin main
```

### B. 平時寫完程式碼 / 修改檔案後「上傳到 GitHub」的日常 3 步驟：
```powershell
# 1. 加入本次修改的所有檔案
git add .

# 2. 提交版本備註說明
git commit -m "feat: 你的修改說明"

# 3. 推送到 GitHub（因為第一次已設定 -u，之後只要打 git push）
git push
```

---

## 5. 常見雷區：`Repository not found` 排查

如果你在 GitHub 已經建了 Repo，但 `git push` 依然報 `Repository not found`：

* **原因**：GitHub 上的 Private 倉庫需要權限。若電腦內快取的帳號不是 Repo 擁有者，GitHub 會出於安全考量直接回傳「找不到 (404)」。
* **解法（Windows 多帳號切換）**：
  1. 按 `Win + S` 搜尋並開啟 **「認證管理員」** (Credential Manager)。
  2. 點選 **「Windows 認證」**。
  3. 刪除 `git:https://github.com` 與 `git:https://<舊帳號>@github.com`。
  4. 回到終端機重新執行 `git push`，點選瀏覽器登入新帳號授權即可。
---

## 6. PR (Pull Request) 是什麼？如何使用？

### 核心定義
* **PR（Pull Request）**：是你向專案管理者或團隊提出的一項請求——**「我寫好了一個新功能，請審核並把你那邊的主分支拉取（Pull）我這個分支合併」**。
* **作用**：避免直接改動 `main` 分支引發災難、提供 **Code Review（程式碼審查）** 與 CI/CD 自動化測試檢驗的機制。

### PR 標準工作流 (6 步驟)：

```powershell
# 1. 切換並建立一個新的功能分支
git switch -c feat/login-page

# 2. 開發寫 Code、存檔並提交
git add .
git commit -m "feat: implement login page"

# 3. 推送該分支到 GitHub
git push -u origin feat/login-page
```

4. **到 GitHub 網頁建立 PR**：
   - GitHub 專案首頁會跳出綠色按鈕 **`Compare & pull request`**，點進去。
   - 檢查改動無誤後，填寫標題與說明，點 **Create pull request**。
5. **團隊 Review 與合併**：
   - 審查者看完代碼後按 **Merge pull request** $\rightarrow$ **Confirm merge**。
6. **本地同步最新主線**：
   ```powershell
   git switch main
   git pull
   # 刪除已合併的本地分支
   git branch -d feat/login-page
   ```

---

## 7. 如何回到某個版本？ (本地時光倒流)

首先查詢歷史紀錄取得 Commit 雜湊碼（ID）：
```powershell
git log --oneline
```

| 目的 | 指令 | 說明 |
| :--- | :--- | :--- |
| **只看一眼 / 測試 (最安全)** | `git checkout <Commit-ID>` | 進入該版本狀態，不破壞歷史。看完了輸入 `git switch main` 即可回來 |
| **以此版本為起點開新分支** | `git switch -c fix-branch <Commit-ID>` | 在過去的時間點另闢新分支開發，不影響原本的 `main` |
| **只還原特定檔案** | `git restore --source=<Commit-ID> app.js` | 只有指定檔案變回舊版，其餘檔案維持現狀 |
| **強制時光倒流 (危險)** | `git reset --hard <Commit-ID>` | 當前分支強制退回到該版本，**該版本之後的所有 Commit 會被丟棄** |

---

## 8. 如何在「另一個資料夾」下載某個特定版本？

### 做法 1：Clone 下來後切換版本（最推薦）
```powershell
# 1. Clone 專案到自訂的新資料夾（例如 my-old-version）
git clone https://github.com/dahlih040905-source/test-git.git my-old-version

# 2. 進入該資料夾
cd my-old-version

# 3. 切換到指定的 Commit 版本
git checkout <Commit-ID>
```

---

### 做法 2：如果該版本有「分支名」或「Tag (標籤)」
只想下載特定的分支或 Tag，不下載其他分支：
```powershell
git clone -b <分支名或Tag名> --single-branch https://github.com/dahlih040905-source/test-git.git my-folder
```

---

### 做法 3：純下載壓縮檔（完全不用打指令）
1. 打開 GitHub 該專案網頁，點選 **Commits**（歷史紀錄清單）。
2. 找到你要的版本，點擊右側的 **`< >` (Browse repository at this point in the history)**。
3. 畫面會停留在該歷史時空，點綠色按鈕 **`Code`** $\rightarrow$ **`Download ZIP`** 下載解壓縮即可。


