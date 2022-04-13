import fetch from "../fetch";

const tagEndpoint = "tags?_fields=id,count,name,slug";

/**
 * 获取tag列表
 * 返回数据格式：[{"id":18,"count":1,"name":"php","slug":"php"}]
 */
export default fetch(tagEndpoint);