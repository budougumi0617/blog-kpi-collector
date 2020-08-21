import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

// https://yurilog.cc/3375
function getTwitterFollowers(accoutName: string): number {
  const url: string = `https://mobile.twitter.com/${accoutName}`;
  const postheader: Object = {
    timeout: "50000",
  };
  const parameters: URLFetchRequestOptions = {
    headers: postheader,
    method: "get",
    muteHttpExceptions: true,
  };
  let html: string = UrlFetchApp.fetch(url, parameters).getContentText("UTF-8");
  const counts = html.match(/\/followers\">[<>\w\s=/"]*statnum\">(\d+)<\/div>/);
  if (counts === null) {
    Logger.log("failed parse twitter");
    return -1;
  } else if (counts.length < 2) {
    Logger.log("failed parse twitter %s", counts);
    return -1;
  }
  return Number(counts[1]);
}
