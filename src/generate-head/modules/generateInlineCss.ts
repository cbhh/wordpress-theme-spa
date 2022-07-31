import { stylePre } from "../../../app.config.json";

function generateStyle (body: string) {
    return `<style>${body}</style>`;
}

/**
 * 生成内联CSS
 */
function generateInlineCss () {
    const styles: string[] = [];
    const settings = stylePre.background,
        isXPosValid = ["left", "center", "right"].includes(
            settings.position.horizontal
        ),
        isYPosValid = ["top", "center", "bottom"].includes(
            settings.position.vertical
        ),
        isSizeValid = ["unset", "contain", "cover"].includes(settings.size);
    if (settings.image) {
        styles.push(
            generateStyle(
                `body{background-image:url(${
                    settings.image
                });background-position:${
                    isXPosValid ? settings.position.horizontal : "unset"
                } ${
                    isYPosValid ? settings.position.vertical : "unset"
                };background-size:${
                    isSizeValid ? settings.size : "unset"
                };background-repeat:${
                    settings.repeat ? "repeat" : "no-repeat"
                };background-attachment:${
                    settings.scroll ? "scroll" : "fixed"
                }}`
            )
        );
    }
    const prism = stylePre.codeHighlight;
    if (prism.showLineNumber) {
        styles.push(
            generateStyle(
                "pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.8em;text-align:right}"
            )
        );
    }
    if (prism.showLanguage || prism.showCopyButton) {
        styles.push(
            generateStyle(
                "div.code-toolbar{position:relative}div.code-toolbar>.toolbar{position:absolute;z-index:10;top:.3em;right:.2em;transition:opacity .3s ease-in-out;opacity:0}div.code-toolbar:hover>.toolbar{opacity:1}div.code-toolbar:focus-within>.toolbar{opacity:1}div.code-toolbar>.toolbar>.toolbar-item{display:inline-block}div.code-toolbar>.toolbar>.toolbar-item>a{cursor:pointer}div.code-toolbar>.toolbar>.toolbar-item>button{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}div.code-toolbar>.toolbar>.toolbar-item>a,div.code-toolbar>.toolbar>.toolbar-item>button,div.code-toolbar>.toolbar>.toolbar-item>span{color:#bbb;font-size:.8em;padding:0 .5em;background:#f5f2f0;background:rgba(224,224,224,.2);box-shadow:0 2px 0 0 rgba(0,0,0,.2);border-radius:.5em}div.code-toolbar>.toolbar>.toolbar-item>a:focus,div.code-toolbar>.toolbar>.toolbar-item>a:hover,div.code-toolbar>.toolbar>.toolbar-item>button:focus,div.code-toolbar>.toolbar>.toolbar-item>button:hover,div.code-toolbar>.toolbar>.toolbar-item>span:focus,div.code-toolbar>.toolbar>.toolbar-item>span:hover{color:inherit;text-decoration:none}"
            )
        );
    }
    return styles.join("");
}
export default generateInlineCss();
