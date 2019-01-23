function getBookmarcCount(target) {
  // http://developer.hatena.ne.jp/ja/documents/bookmark/apis/getcount
  const url = `http://api.b.st-hatena.com/entry.total_count?url=${target}`;
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText("UTF-8");
  const resp = JSON.parse(json);
  const tb = "total_bookmarks";
  return resp[tb];
}
