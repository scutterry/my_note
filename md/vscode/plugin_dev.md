# vscode 插件开发基础
### 开发笔记
1. 安装 yo
```sh
npm install -g yo generator-code
```
<br>
2. 生成模版
```sh
yo code
```
<br>
3. 填写项目信息

### 遇到问题
1. 这个增强型 markdown 是 html 页面，js引用放在 &lt;body/&gt; 时候会加载不到；<font color="red">一定要在放在 &lt;head/&gt; 里面</font>
<br>
<br>
2. extension.js require() 依赖的 js 库在 node_modules 里面，没有的也不会报错，这样会不知道什么原因导致。（找了半天）

### mac 路径
/Users/scutterry/Library/Application\ Support/EgretWing/User/extensions