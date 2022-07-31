# “梦回长安” WordPress 主题 SPA（单页应用）版本

与[PHP 版本](https://github.com/cbhh/wordpress-theme)保持基本 UI 一致。SPA 版本使用 WordPress 自身提供的[Rest API](https://developer.wordpress.org/rest-api/)来获取数据，并使用应用程序密码来执行身份验证，需要 WordPress 版本在 **5.6** 以上。

🍪 效果演示：[https://spa.littlemeteor.xyz/](https://spa.littlemeteor.xyz/)

**本项目还处于初步开发中，不可用于真实服务器环境部署。**

## 🍜 使用方法

使用前需要克隆仓库至本地，安装必要依赖后，填写配置文件，自行编译构建生产版本。

1. 在[仓库首页](https://github.com/cbhh/wordpress-theme-spa)克隆仓库，或直接下载 zip 压缩包至本地。

2. 在项目根目录运行 `npm install` 或 `pnpm install` 来安装 NPM 依赖包。请注意：本项目采用[vite](https://cn.vitejs.dev)打包构建，需要 Node.js 在 12.0.0 版本以上。

3. 参考下方**配置文件选项**自行修改示例配置文件 `app.config.sample.json`，该文件位于项目根目录，完成后需要将该文件名称改为 `app.config.json`。或者单独创建一个名为 `app.config.json` 的文件用来填写真实的配置信息。

4. 运行 `npm run build` 来构建生产版本，生成的文件会存放在 dist 目录下，直接将生成的文件用于静态网站根目录即可。

### 🌰 配置文件选项

- **`site` 站点相关**
  - `icon` 站点图标（显示在浏览器标签上）图片链接
  - `logo` 站点 LOGO（显示在页头）图片链接
  - `url` 站点地址

---

- **`api` API 相关**
  - `baseUrl` API 基准 URL
  - `backendPrettyUrlEnabled` 布尔值。API 端是否启用易于识别的 URL，WordPress 设置-固定链接中，如果启用了朴素型 URL，则将该项置为 false，否则填写 true。
  - `user` API 用户
  - `applicationPassword` 应用程序密码，用来授权对 WordPress Rest API 的访问，一个有效的应用程序密码长这样：`gxYX wxyy aSQJ tAEI 5NyB AarZ`。

---

- **`stylePre` 预处理样式，将添加进 index.html 文件中**

  - `gutenbergEditorStylesheet` 古腾堡编辑器（区块编辑器）样式表文件 URL，格式为：`http(s)://wordpress网站地址/wp-includes/css/dist/block-library/style.min.css`。如果若在 wordpress 后台写文章时采用的是旧版富文本编辑器，则将该项置为空字符串。
  - `background` 背景图片设置

    - `image` 图片地址
    - `position` 图片位置
      - `horizontal` 图片在水平方向的位置，可选值：left，center，right。
      - `vertical` 图片在垂直方向的位置，可选值：top，center，bottom。
    - `size` 图片尺寸，可选值：unset（原始）、contain（适合屏幕）、cover（填满屏幕）。
    - `repeat` 布尔值。重复背景图片，重复填写 true，否则 false。
    - `scroll` 布尔值。图片随页面滚动，滚动填写 true，否则 false。

  - `codeHighlight`: 代码语法高亮（prism.js）设置

    - `theme` 默认值："default"，即默认主题，使用Prism官方主题时只需填写主题名称，使用其它主题时需提供一个css文件URL。
    - `showLineNumber` 布尔值。是否显示行数。
    - `showLanguage` 布尔值。是否显示语言名称。
    - `showCopyButton` 布尔值。是否显示拷贝代码按钮。

---

- **`styleRuntime` 运行时样式**
  - `hideEmptyCategory` 布尔值。隐藏无内容的分类，隐藏填写 true，否则 false。
  - `hideEmptyTag` 布尔值。隐藏无内容的标签，隐藏填写 true，否则 false。
  - `tagFontSize` 标签文字尺寸
    - `min` 数字。标签文字尺寸最小值，不小于 0.4。
    - `max` 数字。标签文字尺寸最大值，不大于 2.0。

---

- **`seo` SEO 相关**
  - `searchEngineValidate` 搜索引擎站点认证，填写搜索引擎站长工具提供的 meta 字符串（一串字母数字的组合）
    - `google`
    - `bing`
    - `baidu`
  - `siteAnalytics` 网站统计/流量分析，填写分析工具提供的 html 字符串，不要换行，部分引号需要添加转义符
    - `google`
    - `cnzz`
    - `cloudflare`
  - `title` 本站点标题（显示在浏览器标签上的）
  - `description` 关于此站点的一些描述
  - `keywords` 关于此站点的一些关键词，逗号隔开

---

- **`footer` 页脚内容**
  - `needFiling` 布尔值。是否需要备案，需要填写 true，否则填写 false。
  - `footerContent` 页脚内容，如果需要备案，则该项需要填写备案号，否则填写其它内容。

### 🥚 一些必要操作

1. 为减少加载文章列表时的 HTTP 请求次数，请求文章列表数据时，会将文章特色图片 URL 一同返回。为实现这一功能，需要在 WordPress 当前所使用的主题中找到 `functions.php` 文件，将以下代码加入：

```php
add_action("rest_api_init", function () {
    register_rest_field("post", "featured_image_url", array(
        "get_callback" => function ($post_arr) {
            return wp_get_attachment_image_url($post_arr["featured_media"], "full");
        },
        "update_callback" => null,
        "schema" => null
    ));
});
```

## 🍭 更新日志

### dev-0.1(2022-04-25)

基础查看文章、分类、标签、作者功能已完成。

### dev-0.12(2022-05-09)

添加了当月日历、文章目录、回到顶部按钮三大功能组件。

### dev-0.14(2022-05-16)

添加了文章图片画廊功能组件，为所有视图的数据加载添加了等待动画。

### dev-0.2(2022-05-23)

typescript 重构完成。

### dev-0.21(2022-05-31)

1. 控制台输出应用程序版本号。
2. 该版本以优化及代码规范为主。

### dev-0.3(2022-06-05)

pinia 重构完成。

### dev-0.31(2022-07-19)

1. 用 transition 组件升级了过渡效果
2. tag 和 category 页面采用 ID 参数取代了之前的 slug
3. 使用 json 站点配置文件取代了之前的 js 配置文件
4. 其它一些改进

### dev-0.31.2(2022-08-01)

该版本带来了代码语法高亮功能，由 prism.js 提供支持
