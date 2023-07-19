# Expense Tracker ( AC 3 A3 )
![image](https://github.com/muco0521/AC-expense-tracker/blob/main/public/image/expense_traker_image.png)

## About - 介紹
使用 Node.js + Express + MongoDB 記帳網站。 使用者可以註冊帳號、登入，並查看、新增、編輯或刪除專屬該用戶的記帳。

## Features - 功能

1. 可以註冊帳號，登入，登出
3. 可以瀏覽專屬使用者的支出清單
4. 可以依分類排序支出清單
6. 可以新增支出資訊
7. 可以編輯支出資訊
8. 可以刪除支出資訊


## Development Tools - 開發工具

* Node.js
* MongoDB
* express @4.17.1
* express-handlebars @4.0.4
* express-session @1.17.1
* express-validator @7.0.1
* mongoose @5.13.17
* method-override @3.0.0
* passport @0.4.1
* passport-local @1.0.0
* connect-flash @0.1.1
* bcryptjs @2.4.3


## Installation and execution - 安裝與執行步驟

1.開啟Terminal, Clone此專案至本機:
```
git clone https://github.com/muco0521AC-expense-tracker.git
```

2.進入專案資料夾，安裝 npm 套件
```
npm install
```

3.安裝 nodemon 
```
npm install nodemon
```

4.設置 .env 檔

填寫`.env.example`所需資料，新增成`.env` 檔案

5.製作種子資料
```
npm run seed
```

6.啟動伺服器
```
npm run dev 
```

7.出現以下字樣表示伺服器連線成功
```
App is running on http://localhost:3000
mongodb connected!
```
