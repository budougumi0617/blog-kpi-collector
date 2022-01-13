import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

namespace hatena {
  export function getBookmarkCount(target: string): number {
    // https://b.hatena.ne.jp/help/entry/bcounter
    const url = `https://b.hatena.ne.jp/bc/${target}`;
    const ops: URLFetchRequestOptions = { followRedirects: false };
    const response = UrlFetchApp.fetch(url, ops);

    interface LocationObject {
      Location: string;
    }
    const hs = response.getAllHeaders() as LocationObject;
    const buf: string = hs["Location"].replace(".gif", "");
    const result = buf.slice(buf.lastIndexOf("/") + 1);
    return parseInt(result, 10);
  }

  export function getNumOfSubscribers(target: string): number {
    const url = `https://blog.hatena.ne.jp/api/init?blog=${target}`;
    const headers = { "X-Requested-With": "XMLHttpRequest" };
    const options: URLFetchRequestOptions = {
      method: "get",
      headers: headers,
      followRedirects: false,
    };
    const response = UrlFetchApp.fetch(url, options).getContentText("UTF-8");
    const parsedResponse = JSON.parse(response);
    const numOfSubscribers = parsedResponse["subscribes"];
    return numOfSubscribers;
  }

  export function getStarCount(target: string): number {
    // http://developer.hatena.ne.jp/ja/documents/star/apis/count
    // '/'終わりでないURLの場合404エラーとなってしまうのを避ける
    // String.prototype.endsWith()が利用できないのでsubstringで実装
    const uri =
      target.substring(target.length - 1, target.length) === "/"
        ? target
        : target + "/";
    const url = `https://s.hatena.ne.jp/blog.json?uri=${uri}`;
    const response = UrlFetchApp.fetch(url);
    const json = response.getContentText("UTF-8");
    const resp = JSON.parse(json);
    const starCount = resp["star_count"];
    return starCount;
  }
}
