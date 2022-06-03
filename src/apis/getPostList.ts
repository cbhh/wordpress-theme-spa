import wpAppConfig from "@wpAppConfig";
import appFetch from "@/utils/appFetch";
import PostListArguments from "@/context/post-list/postListArguments";
import PostListResponse from "@/context/post-list/postListResponse";
import { YearMonthDay } from "@/common/date";

const baseEndpoint = `posts${
    wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
}_fields=author,id,excerpt,title,categories,tags,date,featured_media,featured_image_url`;

function checkDate1 (date: YearMonthDay) {
    if (
        date[0] > 2007 &&
        date[1] > 0 &&
        date[1] < 13 &&
        date[2] > 0 &&
        date[2] < 32
    ) {
        const d: (number | string)[] = [date[0], date[1], date[2]];
        if (date[1] < 10) {
            d[1] = "0" + date[1];
        }
        if (date[2] < 10) {
            d[2] = "0" + date[2];
        }
        return d.join("-");
    }
}
function checkDate2 (dateStart: YearMonthDay, dateEnd: YearMonthDay) {
    if (dateEnd[0] > dateStart[0]) {
        return true;
    } else if (dateEnd[0] === dateStart[0]) {
        if (dateEnd[1] > dateStart[1]) {
            return true;
        } else if (dateEnd[1] === dateStart[1]) {
            if (dateEnd[2] >= dateStart[2]) {
                return true;
            }
        }
    }
}
function throwError () {
    throw new Error("invalid params");
}
/**
 * 获取文章列表
 * @param query 查询参数
 * @see [wordpress-rest-api-posts-args](https://developer.wordpress.org/rest-api/reference/posts/#arguments)
 */
export default async function (query?: PostListArguments) {
    let ep = baseEndpoint;
    if (query) {
        if (query.start) {
            const d = checkDate1(query.start);
            d ? (ep += `&after=${d}T00:00:00`) : throwError();
        }
        if (query.end) {
            if (query.start && !checkDate2(query.start, query.end)) {
                throwError();
            } else {
                const d = checkDate1(query.end);
                d ? (ep += `&before=${d}T23:59:59`) : throwError();
            }
        }
        if (query.author) {
            ep += `&author=${query.author}`;
        }
        if (query.categories) {
            ep += `&categories=${query.categories.join(",")}`;
        }
        if (query.tags) {
            ep += `&tags=${query.tags.join(",")}`;
        }
    }
    return await appFetch<PostListResponse>(ep);
}
