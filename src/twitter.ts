import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

// https://yurilog.cc/3375
function getTwitterFollowers(accoutName: string) {
  const url = `https://twitter.com/${accoutName}`;
  const postheader = {
    timeout: "50000",
  };
  const parameters: URLFetchRequestOptions = {
    headers: postheader,
    method: "get",
    muteHttpExceptions: true,
  };
  let html = UrlFetchApp.fetch(url, parameters).getContentText("UTF-8");
  const searchTag = "followers";
  let index = html.indexOf(searchTag);

  let result = -1;
  if (index !== -1) {
    html = html.substring(index + searchTag.length);
    const titleKey = 'title="';
    index = html.indexOf(titleKey);
    if (index !== -1) {
      html = html.substring(index + titleKey.length);
      index = html.indexOf(' Followers"');
      if (index !== -1) {
        result = html.substring(0, index);
      }
    }
  }
  return result;
}
