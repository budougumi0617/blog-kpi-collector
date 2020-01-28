function getBookmarkCount(target) {
  // http://developer.hatena.ne.jp/ja/documents/bookmark/apis/getcount
  const url = `http://api.b.st-hatena.com/entry.total_count?url=${target}`;
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText("UTF-8");
  const resp = JSON.parse(json);
  const tb = "total_bookmarks";
  return resp[tb];
}

function getNumOfSubscribers(target) {
  const url = `https://blog.hatena.ne.jp/api/init?blog=${target}`;
  const headers={"X-Requested-With": "XMLHttpRequest"};
  const options = {
    "method" : "GET",
    "headers" : headers,
    "followRedirects" : false
  };
  const response = UrlFetchApp.fetch(url, options).getContentText("UTF-8");
  const parsedResponse = JSON.parse(response);
  const numOfSubscribers = parsedResponse["subscribes"];
  return numOfSubscribers;
}

function getStarCount(target) {
  // http://developer.hatena.ne.jp/ja/documents/star/apis/count
  // '/'終わりでないURLの場合404エラーとなってしまうのを避ける
  // String.prototype.endsWith()が利用できないのでsubstringで実装
  const uri = target.substring(target.length - 1, target.length) === '/' ? target : target + '/';
  const url = `https://s.hatena.ne.jp/blog.json?uri=${uri}`;
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText("UTF-8");
  const resp = JSON.parse(json);
  const starCount = resp['star_count'];
  return starCount;
}