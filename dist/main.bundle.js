module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=17)}([function(e,t,n){const o=n(20);e.exports={info:function(e){console.log(o.green(e))},error:function(e){"object"==typeof e&&(e=JSON.stringify(e)),console.log(o.red(e))}}},function(e,t){e.exports=require("path")},function(e,t,n){const o=n(4),r=n(0),i=n(6),s=n(21),a=n(22),c=n(23);const l=a.promisify(s);e.exports={makeGithubUrlForTbTemplate:function(e){return`https://github.com/honeyfed/template-${e}.git`},loadJson:function(e){const t=o.readFileSync(e,"utf-8");try{return JSON.parse(t)}catch(e){r.error(e)}return null},isValidName:function(e){return/^[a-zA-Z0-9-_]+$/.test(e)},isValidLibName:function(e){return/^[a-z0-9-]+$/.test(e)},doCmd:function(e,t,n={stdio:"inherit"}){return new Promise((o,r)=>{const s=i(e,t,n);n.stdio?s.on("close",e=>{o({code:e})}):(s.stdout.on("data",e=>{o({data:e})}),s.stdout.on("close",e=>{o({data:e})}))})},rm:l,readFile:function(e){return o.readFileSync(e,"utf8")},writeFile:function(e,t){o.writeFileSync(e,t,"utf8")},getFiles:function(e){return new Promise((t,n)=>{c(e,(e,o)=>{e?n(e):t(o)})})}}},function(e,t,n){const o=n(24),{loadJson:r}=n(2),i=n(1),s=n(10);const a={src:"./src",dist:"./dist",entry:"index.js",template:"index.html",static:"",isLib:!1,dev:{port:8080,proxy:[],mock:""}};e.exports={loadTemplates:async function(){try{const e=await o.get("https://raw.githubusercontent.com/honeyfed/config/master/templates.json");return JSON.parse(e)}catch(e){console.error(e)}return null},loadHoneyConfig:function(){const e=r("./package.json"),t={};return s.merge(t,a),e&&e.honeyConfig?s.merge(t,e.honeyConfig):print.info("no config found"),t.src=i.resolve(process.cwd(),t.src),t.dist=i.resolve(process.cwd(),t.dist),t.static&&(t.static=i.resolve(process.cwd(),t.static)),e.name&&(t.packageName=e.name),t}}},function(e,t){e.exports=require("fs")},function(e,t,n){(function(t){const o=n(1);e.exports={getEslintrc:function(){return'\n  module.exports = {\n    env: {\n      browser: true,\n    },\n    extends: ["plugin:vue/essential", \'eslint-config-tencent\'],\n    plugins: ["vue"],\n  };\n  '},getEsLintOptions:function(){return{fix:!0,extensions:[".js",".jsx",".vue"],useEslintrc:!1,overrideConfigFile:o.resolve(t,"./eslintrc.js")}}}}).call(this,"/")},function(e,t){e.exports=require("cross-spawn")},function(e,t,n){n(6);const{GitError:o}=n(8),{doCmd:r}=n(2),i=n(0),s=process.cwd(),a="win32"===process.platform;e.exports={gitClone:async function(e,t=""){const n=await r("git",["clone",e,t,"--depth",1],{stdio:"inherit"});if(0===n.code)return n.code;new o("git clone failed")},isGitRepo:async function(e){try{return 0===(await r("git",["rev-parse","--git-dir"],{cwd:e,stdio:"inherit"})).code}catch(e){return!1}},getStatus:async function(e){const t=await r("git",["status","--short",e||"."],{cwd:s});if(!t||!t.data)return i.info("当前没有需要提交的记录"),"";let n=Buffer.from(t.data);return n=n.toString(),n.trim()?(n=n.split("\n").filter(e=>e.trim()),a&&(n=n.map(e=>e.slice(3))),await async function(e){await r("git",["status","--short",e||"."],{cwd:s,stdio:"inherit"})}(),n):void 0},gitPush:async function(e){return await r("git",["push",e||""],{cwd:s,stdio:"inherit"})},getUnpushedCommits:async function(){const e=await r("git",["cherry","-v"],{cwd:s});if(e.data){return Buffer.from(e.data).toString()}return e.data},gitAdd:async function(e){return await r("git",["add",e],{cwd:s,stdio:"inherit"})}}},function(e,t){class n extends Error{constructor(e){super(e)}}e.exports={GitError:n}},function(e,t){e.exports=require("inquirer")},function(e,t){e.exports=require("lodash")},function(e,t,n){const{loadHoneyConfig:o}=n(3),{getFiles:r,readFile:i,writeFile:s}=n(2),a=n(0),{getPrettierrc:c}=n(12),l=n(31),u=n(1);e.exports={formatCmd:async function(){const e=o();let t=await r(e.src+"/**/*.js");const n=await r(e.src+"/**/*.vue");t=[...t,...n];const d=c();t.forEach(async e=>{a.info(`格式化 ${e}...`);const t=i(e),n=u.extname(e);d.parser=".vue"===n?"vue":"babel";const o=l.format(t,d);s(e,(o||"").replaceAll("\r\n","\n"))})}}},function(e,t){e.exports={getPrettierrc:function(){return{arrowParens:"always",bracketSpacing:!0,endOfLine:"lf",htmlWhitespaceSensitivity:"css",insertPragma:!1,jsxBracketSameLine:!1,jsxSingleQuote:!0,printWidth:80,proseWrap:"preserve",quoteProps:"as-needed",requirePragma:!1,semi:!0,singleQuote:!0,tabWidth:2,trailingComma:"es5",useTabs:!1,vueIndentScriptAndStyle:!1,parser:"babel"}}}},function(e,t,n){const o=n(1),r=n(33),i=n(34),{generateBasicWebpackConfig:s}=n(14);function a(e){const t=e.dev.proxy,r={};return Array.isArray(t)&&t.length&&t.forEach(t=>{if(t.from&&t.to&&(r[t.from]={target:t.to,changeOrigin:!0,cookieDomainRewrite:"localhost"},e.dev.mock)){const i=n(38)(o.resolve(process.cwd(),e.dev.mock));r[t.from].bypass=i}}),r}e.exports={generateWebpackConfig:function(e,t="production"){const n=s(e,t);return n.output={path:e.dist,filename:"production"===t?"js/[name].[hash:6].js":"js/[name].js",publicPath:"production"===t&&e.cdn||"/"},n.optimization={splitChunks:{chunks:"all"}},n.devServer={port:e.port,hot:!0,historyApiFallback:{rewrites:[{from:/.*/,to:"/index.html"}]},proxy:a(e)},n.plugins.push(new r({template:o.resolve(e.src,e.template)})),e.static&&n.plugins.push(new i({patterns:[{from:e.static,to:e.dist}]})),n}}},function(e,t,n){(function(t){const o=n(1),{VueLoaderPlugin:r}=n(35),i=n(36),s=n(37),{getEsLintOptions:a}=n(5);e.exports={generateBasicWebpackConfig:function(e,n="production"){return{mode:n,entry:o.resolve(e.src,e.entry),resolve:{extensions:[".js",".vue",".json"],alias:{"@":e.src}},resolveLoader:{modules:[o.resolve(t,"../../node_modules")]},module:{rules:[{test:/\.js$/,loader:"babel-loader",options:{cwd:o.resolve(t,"../../"),presets:[["@babel/preset-env",{useBuiltIns:"usage",corejs:3,targets:"> 0.25%, not dead"}]]},exclude:/node_modules/},{test:/\.vue$/,loader:"vue-loader"},{test:/\.css$/,use:["style-loader","css-loader"]},{test:/\.less$/,use:["style-loader","css-loader","less-loader"]},{test:/\.(ttf|woff)$/,use:[{loader:"url-loader",options:{name:"production"===n?"fonts/[name]-[hash:6].[ext]":"fonts/[name].[ext]",limit:8092,esModule:!1}}]},{test:/\.(gif|png|jpg|jpeg|svg)$/,use:[{loader:"url-loader",options:{name:"production"===n?"imgs/[name]-[hash:6].[ext]":"imgs/[name].[ext]",limit:8092,esModule:!1}}]}]},devtool:"production"===n?"none":"eval-source-map",plugins:[new r,new i,new s(a())]}}}}).call(this,"/")},function(e,t){e.exports=require("webpack")},function(e,t,n){const{CdnUploader:o}=n(40),{loadHoneyConfig:r}=n(3),{getFiles:i}=n(2),s=n(0),a=n(1);function c(e,t,n){return a.join(e,a.relative(t,n)).replaceAll("\\","/")}e.exports={cdnCmd:async function(){const e=new o;if(!e.init())return void s.error("cos初始化失败");const t=r(),n=t.dist;let a=await i(n+"/js/**/*.js"),l=await i(n+"/style/**/*.css"),u=await i(n+"/imgs/**/*"),d=await i(n+"/fonts/**/*");a=a.map(e=>({cdnPath:c(t.packageName,t.dist,e),filePath:e})),l=l.map(e=>({cdnPath:c(t.packageName,t.dist,e),filePath:e})),u=u.map(e=>({cdnPath:c(t.packageName,t.dist,e),filePath:e})),d=d.map(e=>({cdnPath:c(t.packageName,t.dist,e),filePath:e})),a.forEach(async t=>{try{await e.uploadFile(t.cdnPath,t.filePath),s.info("已上传"+t.filePath)}catch(e){s.error(e),s.error(t.filePath+"上传失败")}}),l.forEach(async t=>{try{await e.uploadFile(t.cdnPath,t.filePath),s.info("已上传"+t.filePath)}catch(e){s.error(e),s.error(t.filePath+"上传失败")}}),u.forEach(async t=>{try{await e.uploadFile(t.cdnPath,t.filePath),s.info("已上传"+t.filePath)}catch(e){s.error(e),s.error(t.filePath+"上传失败")}}),d.forEach(async t=>{try{await e.uploadFile(t.cdnPath,t.filePath),s.info("已上传"+t.filePath)}catch(e){s.error(e),s.error(t.filePath+"上传失败")}})}}},function(e,t,n){const o=n(18),{newCmd:r}=n(19),{serve:i}=n(27),{gitCommit:s,gitPushCmd:a,generateChangeLog:c}=n(28),{buildCmd:l}=n(32),{devCmd:u}=n(42),{formatCmd:d}=n(11),{lintCmd:p}=n(44),{cdnCmd:f}=n(16),m=n(0);e.exports={main:function(){m.info("honey cli"),o.version("1.0.0").command("new").alias("n").description("创建新的项目").action(r),o.command("commit").alias("c").description("提交代码").action(e=>{s()}),o.command("push").alias("p").description("推送代码").action(e=>{a()}),o.command("changelog").alias("log").description("生成changelog").action(e=>{c()}),o.command("build").alias("b").description("构建代码").action(e=>{l()}),o.command("cdn").description("资源上传cdn").action(e=>{f()}),o.command("dev").alias("d").description("启动本地开发").action(e=>{u()}),o.command("lint").alias("l").description("代码检查").action(e=>{p()}),o.command("format").alias("fmt").description("代码格式化").action(e=>{d()}),o.command("extend <command>").alias("e").description("run an extend command").action(e=>{m.info(e)}),o.command("serve").alias("s").description("run dev serve").action(e=>{i()}),o.parse(process.argv)}}},function(e,t){e.exports=require("commander")},function(e,t,n){const{makeGithubUrlForTbTemplate:o,isValidName:r,rm:i,getFiles:s}=n(2),{gitClone:a}=n(7),{GitError:c}=n(8),l=n(9),{loadTemplates:u}=n(3),d=n(0),p=n(4),f=n(1),{renderInPlaceSync:m}=n(26);e.exports={newCmd:async function(e){try{const e=await u();if(!e)throw new Error("未找到模板");const t=await l.prompt([{type:"input",name:"projectName",message:"project name",validate:e=>e?!!r(e)||"invalid project name(only alphabet number _ - were allowed)":"project name should not be empty"},{type:"list",name:"template",message:"choose template",choices:()=>e.map(e=>({name:`${e.name} (${e.description}) - ${e.valid?"valid":"invalid"}`,value:e}))}]);if(!t.template.valid)throw new Error("invalid template: "+t.template.name);{const e=o(t.template.name);await a(e,t.projectName),await i(t.projectName+"/.git");(await s(t.projectName+"/**/*")).forEach(e=>{if(p.lstatSync(e).isFile()){d.info("正在写入"+e);const n=f.extname(e);/\.(txt|markdown|md|js|jsx|vue|html|json|less|css|scss|styl)$/i.test(n)&&m(e,{name:t.projectName})}})}}catch(e){e instanceof c?d.error(e.message):d.error(e)}}}},function(e,t){e.exports=require("chalk")},function(e,t){e.exports=require("rimraf")},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("glob")},function(e,t,n){const o=n(25);e.exports={get:async function(e){const t=await o.get(e);return t&&200===t.status?t.text:""}}},function(e,t){e.exports=require("superagent")},function(e,t,n){const{readFile:o,writeFile:r}=n(2);e.exports={renderInPlaceSync:function(e,t){let n=o(e);Object.keys(t).forEach(e=>{n=n.replaceAll(new RegExp(`{{{${e}}}}`,"gi"),t[e])}),r(e,n)}}},function(e,t,n){const o=n(4),r=n(1),{doCmd:i}=n(2);e.exports={serve:async function(){const e=r.resolve("./"),t=o.readdirSync(e);if(t.length<=0)return void console.error("当前文件夹为空");if(!t.filter(e=>e.indexOf("package.json")>-1))return void console.error("当前文件夹不存在package.json文件，请添加");if(0!==await i("npm",["install"]))return void console.error("install error");let n=o.readFileSync(e+"/package.json");JSON.parse(n).scripts.dev?await i("npm",["run","dev"]):console.error("当前package.json文件中不存在dev命令")}}},function(e,t,n){(function(t){const o=n(9),{getStatus:r,gitPush:i,getUnpushedCommits:s,gitAdd:a}=n(7),c=n(1),l=n(29),u=n(30).bootstrap,d=n(0),{formatCmd:p}=n(11);e.exports={gitCommit:async function(){await p();const e=await r(),n=await s();if(n&&console.log(` (${n.split("\n").filter(e=>e).length} commits unpushed)`),Array.isArray(e)){const n=await o.prompt({type:"checkbox",name:"files",message:"请选择要提交的文件:",choices:e.map(e=>({name:e})),pageSize:20});if(n&&n.files&&n.files.length>0){const o=n.files.length===e.length?".":n.files.join(" ");return 0===(await a(o)).code&&await u({cliPath:c.join(t,"../node_modules/commitizen"),config:{path:c.resolve(t,"../3rd/cz-conventional-changelog")}},""),!0}}},gitPushCmd:async function(){if(await s()){(await o.prompt({type:"confirm",name:"pushCommits",message:"Do you want to push now?",default:!1})).pushCommits&&await i("-u")}},generateChangeLog:async function(){l({noVerify:!0,infile:"docs/CHANGELOG.md",silent:!0}).then(()=>{d.info("changelog 生成成功，位于docs/CHANGELOG.md文件中")}).catch(e=>{d.error("standard-version failed with message: "+e.message)})}}}).call(this,"/")},function(e,t){e.exports=require("standard-version")},function(e,t){e.exports=require("commitizen/dist/cli/git-cz")},function(e,t){e.exports=require("prettier")},function(e,t,n){const{doCmd:o,rm:r,isValidLibName:i}=n(2),s=n(0),a=n(10),{generateWebpackConfig:c}=n(13),{generateWebpackLibConfig:l}=n(39),{loadHoneyConfig:u}=n(3),d=n(15),{cdnCmd:p}=n(16);e.exports={buildCmd:async function(){try{await o("npm i --save core-js@3"),await o("npm i")}catch(e){s.error(e)}const e=u();try{await r(e.dist);let t=null;if(e.isLib){if(!e.libName)return void s.error("请在package.json的honeyConfig里配置libName");if(!i(e.libName))return void s.error("libName必须遵循蛇形命名");e.umdName||(e.umdName=a.camelCase(e.libName)),t=l(e)}else t=c(e);await function(e){return new Promise((t,n)=>{d(e,(e,o)=>{e?n(e):(process.stdout.write(o.toString({colors:!0,modules:!1,children:!1,chunks:!1,chunkModules:!1})+"\n\n"),o.hasErrors()&&(s.error("  Build failed with errors.\n"),process.exit(1)),s.info("  Build complete.\n"),t())})})}(t),e.cdn&&await p()}catch(e){s.error(e)}}}},function(e,t){e.exports=require("html-webpack-plugin")},function(e,t){e.exports=require("copy-webpack-plugin")},function(e,t){e.exports=require("vue-loader")},function(e,t){e.exports=require("progress-bar-webpack-plugin")},function(e,t){e.exports=require("eslint-webpack-plugin")},function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=38},function(e,t,n){const{generateBasicWebpackConfig:o}=n(14);e.exports={generateWebpackLibConfig:function(e){const t=o(e,"production");return t.output={path:e.dist,filename:e.libName+".min.js",library:e.umdName,libraryTarget:"umd"},t}}},function(e,t,n){const o=n(41),r=n(0),i=n(4);e.exports={CdnUploader:class{constructor(){}init(){return process.env.cdnId&&process.env.cdnKey?(this.cos=new o({SecretId:process.env.cdnId,SecretKey:process.env.cdnKey}),!0):(r.error("请在环境变量中设置cdnId及cdnKey"),this.cos=null,!1)}uploadFile(e,t){return new Promise((n,o)=>{this.cos.putObject({Bucket:"static-1258919571",Region:"ap-guangzhou",Key:"honeyfed/"+e,Body:i.readFileSync(t)},(function(e,t){e?(r.error(e),o(e)):n(t)}))})}}}},function(e,t){e.exports=require("cos-nodejs-sdk-v5")},function(e,t,n){const{doCmd:o,rm:r,writeFile:i}=n(2),s=n(0),{getEslintrc:a}=n(5),{getPrettierrc:c}=n(12),l=n(1),{generateWebpackConfig:u}=n(13),{loadHoneyConfig:d}=n(3),p=n(15),f=n(43);e.exports={devCmd:async function(){try{await o("npm i --save core-js@3"),await o("npm i --save-dev --force eslint eslint-plugin-vue eslint-config-tencent"),await o("npm i"),r(l.resolve(process.cwd(),".eslintrc.js")),r(l.resolve(process.cwd(),".eslintrc.json")),r(l.resolve(process.cwd(),".eslintrc")),r(l.resolve(process.cwd(),".prettierrc")),i(l.resolve(process.cwd(),".eslintrc.js"),a()),i(l.resolve(process.cwd(),".prettierrc"),JSON.stringify(c()))}catch(e){s.error(e)}const e=d();try{const t=u(e,"development");new f(p(t),t.devServer).listen(e.dev.port,"0.0.0.0",()=>{s.info("Starting server on http://localhost:"+e.dev.port)})}catch(e){s.error(e)}}}},function(e,t){e.exports=require("webpack-dev-server")},function(e,t,n){const{ESLint:o}=n(45),{getEsLintOptions:r}=n(5),{loadHoneyConfig:i}=n(3);e.exports={lintCmd:async function(){const e=i(),t=new o(r()),n=await t.lintFiles([e.src+"/**/*.vue",e.src+"/**/*.js"]);await o.outputFixes(n);const s=(await t.loadFormatter("stylish")).format(n);console.log(s)}}},function(e,t){e.exports=require("eslint")}]);