export default function (npmVerStr: string) {
    return isNaN(parseInt(npmVerStr.charAt(0)))
        ? npmVerStr.substring(1)
        : npmVerStr;
}