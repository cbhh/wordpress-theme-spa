import { reactive } from "vue";
import { WindowScrollValues } from "@/context/common/provide-inject";

let timer = 0;

export default function () {
    const winScrollValues = reactive<WindowScrollValues>({
        x: 0,
        y: 0,
        w: 0,
        h: 0,
    });

    const callback = function () {
        if (!timer) {
            timer = window.setTimeout(function () {
                winScrollValues.x = window.scrollX;
                winScrollValues.y = window.scrollY;
                winScrollValues.w = window.innerWidth;
                winScrollValues.h = window.innerHeight;
                timer = 0;
            }, 100);
        }
    };

    const startListener = function () {
        window.addEventListener("scroll", callback);
    };

    const stopListener = function () {
        window.removeEventListener("scroll", callback);
    };

    return {
        winScrollValues,
        startListener,
        stopListener,
    };
}
