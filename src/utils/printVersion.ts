export default function () {
    const av = import.meta.env.VITE_APP_VERSION,
        ab = import.meta.env.VITE_APP_BUILD;
    console.log(
        `%c梦回长安 WordPress SPA 主题%cversion:${av},build:${ab}`,
        "display:inline-block;color:#96655c;background:#f7f1e5;padding:1px 3px;border-top-left-radius:3px;border-bottom-left-radius:3px",
        "display:inline-block;color:#f7f1e5;background:#96655c;padding:1px 3px;border-top-right-radius:3px;border-bottom-right-radius:3px"
    );
}
