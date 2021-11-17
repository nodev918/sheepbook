module.exports = {
	types: [
		{ value: 'init', name: 'init: 初始化' },
		{ value: 'feat', name: 'feat: 增加' },
		{ value: 'fix', name: 'fix: bug fix' },
		{ value: 'ui', name: 'ui: 更新UI' },
		{ value: 'refactor', name: 'refactor: 重構' },
		{ value: 'release', name: 'release: 發布' },
		{ value: 'deploy', name: 'deploy: 部署' },
		{ value: 'docs', name: 'docs: 修改文件' },
		{ value: 'test', name: 'test: 新增或修改現有的測試' },
		{ value: 'chore', name: 'chore: 修改建置流程、包管理、構建過程或輔助工具的變動。不包含修改測試檔、src 裡的檔案' },
		{ value: 'style', name: 'style: 樣式修改(不影響)' },
		{ value: 'revert', name: 'revert: 版本回退' },
		{ value: 'add', name: 'add: 新增library' },
		{ value: 'del', name: 'del: 刪除' }
	],
	scopes: [
		{ name: 'Components' },
      { name: 'HTML' },
		{ name: 'Utils' },
		{ name: 'Styles(CSS)' },
		{ name: 'deps' },
		{ name: 'other' }
	],
	messages: {
		type: '選擇更改類型:\n',
		// 如果allow custom scopes为true，则使用
		scope: '選擇 scope（Options）：\n',
		customScope: '請輸入自定義的 scope：',
		subject: '簡述:\n',
		body: '詳細描述. 使用"|"換行:\n',
		breaking: 'Breaking Changes列表:\n',
		footer: '關閉的issues列表. E.g.: #31, #34:\n',
		confirmCommit: '確定送出?'
	},
	allowCustomScopes: true,
	allowBreakingChanges: ['feat', 'fix']
}
