import { stylePre } from "../../../app.config.json";
import { dependencies } from "../../../package.json";
import getPackageVersion from "../getPackageVersion";

const isPro = process.env.NODE_ENV === "production";

function generateScript (verAndName: string) {
    return `<script src="https://cdn.staticfile.org/${verAndName}.min.js"></script>`;
}
/**
 * cdn加载依赖脚本
 */
function loadExternalDependencies () {
    if (isPro) {
        const deps = [
            generateScript(
                `vue/${getPackageVersion(
                    dependencies.vue
                )}/vue.runtime.global.prod`
            ),
            generateScript(
                `vue-router/${getPackageVersion(
                    dependencies["vue-router"]
                )}/vue-router.global.prod`
            ),
            generateScript("vue-demi/0.13.1/index.iife"),
            generateScript(
                `pinia/${getPackageVersion(dependencies.pinia)}/pinia.iife.prod`
            ),
        ];
        const prism = stylePre.codeHighlight,
            prismVer = getPackageVersion(dependencies.prismjs);
        deps.push(generateScript(`prism/${prismVer}/components/prism-core`));
        deps.push(
            generateScript(
                `prism/${prismVer}/plugins/autoloader/prism-autoloader`
            )
        );
        if (prism.showLineNumber) {
            deps.push(
                generateScript(
                    `prism/${prismVer}/plugins/line-numbers/prism-line-numbers`
                )
            );
        }
        if (prism.showLanguage || prism.showCopyButton) {
            deps.push(
                generateScript(
                    `prism/${prismVer}/plugins/toolbar/prism-toolbar`
                )
            );
            if (prism.showLanguage) {
                deps.push(
                    generateScript(
                        `prism/${prismVer}/plugins/show-language/prism-show-language`
                    )
                );
            }
            if (prism.showCopyButton) {
                deps.push(
                    generateScript(
                        `prism/${prismVer}/plugins/copy-to-clipboard/prism-copy-to-clipboard`
                    )
                );
            }
        }
        return deps.join("");
    } else {
        return "";
    }
}
export default loadExternalDependencies();
