function getBookmarcCount(target) {
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
