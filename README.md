# “梦回长安” WordPress 主题 SPA（单页应用）版本

与[PHP 版本](https://gitee.com/vbzxc/wordpress-theme)保持 UI 一致。SPA 版本使用 WordPress 自身提供的[Rest API](https://developer.wordpress.org/rest-api/)来获取数据，并使用应用程序密码来执行身份验证，需要 WordPress 版本在 **5.6** 以上。

**本项目还处于初步开发中，不可用于真实服务器环境部署。**

## 使用方法

使用前需要克隆仓库至本地，安装必要依赖后，填写配置文件，自行编译构建生产版本。

1. 在[仓库首页](https://gitee.com/vbzxc/wordpress-theme-spa)克隆仓库，或直接下载 zip 压缩包至本地。

2. 在项目根目录运行 `npm install` 来安装 NPM 依赖包。请注意：本项目采用[vite](https://cn.vitejs.dev)打包构建，需要 Node.js 在 12.0.0 版本以上。

3. 按照提示填写配置文件 `wp-app.config.js`，该文件位于项目根目录。

4. 运行 `npm run build` 来构建生产版本，生成的文件会存放在 dist 目录下，直接将生成的文件用于静态网站根目录即可。

### 一些必要操作

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

## 更新日志

### dev-0.1(2022-04-25)

基础查看文章、分类、标签、作者功能已完成。

### dev-0.12(2022-05-09)

添加了当月日历、文章目录、回到顶部按钮三大功能组件。
