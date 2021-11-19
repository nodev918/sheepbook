
# 懶惰是人學習的開始

雖然透過 `Create React App` 能快速建立 React 開發環境，但每次要刪除多餘的內容幾次下來人就開始懶了，而懶就是開始學習找方式偷懶的最好時候，這次就來紀錄 Facebook 官方支援的 Custom Template 設置方式

## 前置作業

- [npm 帳號註冊](https://www.npmjs.com/)
- 使用`CRA` 創建一個新的空專案
- 打開 [Facebook CRA Template](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)

## 設置

```zsh
   npx create-react-app react-template
   cd react-template
```

進到專案後新增兩個檔案

```zsh
   mkdir template // create a new folder
   touch template.json // description file
```

新增後點開 `template.json` 以及 前置作業提到的 [Facebook CRA Template](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)，複製網頁上的 template.json 的內容，貼到專案內的`template.json`

```json
{
	"package": {
		"dependencies": {
			"@testing-library/jest-dom": "^5.14.1",
			"@testing-library/react": "^12.0.0",
			"@testing-library/user-event": "^13.2.1",
			"web-vitals": "^2.1.0"
		},
		"eslintConfig": {
			"extends": ["react-app", "react-app/jest"]
		}
	}
}
```

這時候就可以開始將想加入 Custom Template 的 `library` 加入`template.json`的 `dependencies` 內，如果不確定要使用的版本也可以透過安裝 ex: `React Router`, `Material-UI`, `Redux` ...etc ，再從`package.json`複製過去

安裝完後回到[Facebook CRA Template](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)，找到 `package.json` 將內容複製回專案內的`package.json`，再改寫成自己的設定   

```zsh
   {
  "name": "Template Name",
  "version": "1.0.0",
  "keywords": [
    "react",
    "create-react-app",
    "template"
  ],
  "description": "package 描述",
  "license": "MIT",
  "engines": {
    "node": ">=14"
  },
  "bugs": {
    "url": "https://github.com/facebook/create-react-app/issues"
  },
  "files": [
    "template",
    "template.json"
  ]
}
```
如果有需要也可以打開 `src` 對資料夾內的文件對內部檔案刪改

## 打包

當一切設置都處理好之後，將 `.gitignore`檔名更名為`gitignore`，最後把`public`、`src`、`gitignore`、想要額外挾帶的檔案一起放入`template`資料夾內

最終的檔案結構應該要是這個樣子
```zsh
.
├── package.json
├── README.md
├── template
│  ├── gitignore
│  ├── public
│  │  ├── favicon.ico
│  │  ├── index.html
│  │  ├── manifest.json
│  │  └── robots.txt
│  └── src
│     ├── App.js
│     ├── index.css
│     └── index.js
├── template.json
└── yarn.lock
```
## 上傳到 npm

打開 Terminal 輸入

```zsh
   npm login
   npm publish
```

> 如果出現類似下面的失敗警告，通常原因都是命名重複，回到`package.json`改名就好，建議選用`cra-template-命名`比較不會撞到

```zsh
403 Forbidden - PUT https://registry.npmjs.org/* - You do not have permission to publish * . Are you logged in as the correct user?
```

回到 `npm` 的官網確認 package 成功上傳

## 使用

到這裡一切順利的話，之後只需要在CRA後面帶上 `--template` 就可以了

```zsh
   npx create-react-app projectName --template templateName
```
