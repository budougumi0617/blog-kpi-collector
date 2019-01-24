// main
// 紐付けられたスプレットシートにKPIを記録していく関数
// 使い方はREADME参照のこと
function main() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // "SHEET_NAME"にはDrive上に作成したスプレットシートのシート名を入力しておくこと。
  // 未入力の場合はデフォルトの"シート1"に書き込まれる。
  // 例: シート1
  let sheetName = PropertiesService.getScriptProperties().getProperty(
    "SHEET_NAME"
  );
  if (sheetName == null || sheetName.length === 0) {
    sheetName = "シート1";
  }
  const sheet = spreadsheet.getSheetByName(sheetName);

  const today = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd");

  // Twitterのフォロワー情報を取得する
  // TWITTER_NAMEにはアカウント名を入力しておくこと(@は不要)
  let followers = -1;
  const twitterName = PropertiesService.getScriptProperties().getProperty(
    "TWITTER_NAME"
  );
  if (twitterName != null) {
    followers = getTwitterFollowers(twitterName);
  } else {
    console.log("Twitter情報は取得しませんでした");
  }

  // Gooogle Analyticsから実行した日の前日から過去7日間のPV数と直帰数を取得する。
  // GA_VIEW_IDには"ga:"から始まるIDを入力しておくこと。
  // IDの取得方法は以下の通り
  // 1. 以下のURLを開く
  //    - https://ga-dev-tools.appspot.com/query-explorer/#report-start
  // 2. Select Viewで集計したいデータを選択する
  // 3. Set the query parametersのidsに自動入力される"ga:000000000"というIDをGA_VIEW_IDとする
  const viewID = PropertiesService.getScriptProperties().getProperty(
    "GA_VIEW_ID"
  );
  let pv = -1;
  let bounceRate = -1;
  if (viewID != null) {
    const gaResults = getAnalyticsData(viewID);
    pv = gaResults[0];
    bounceRate = gaResults[1];
  } else {
    console.log("GoogleAnalytics情報は取得しませんでした");
  }

  // 「指定した url とそれ以下のパスの url」に対するはてなブックマークの合計数の合計を取得する
  // BLOG_URLには自分のサイトのURLを入力しておくこと。
  // 例: https://budougumi0617.github.io/
  let bookmarks = -1;
  const blogUrl = PropertiesService.getScriptProperties().getProperty("BLOG_URL");
  if (blogUrl != null) {
    bookmarks = getBookmarkCount(blogUrl);
  } else {
    console.log("はてなブックーマーク数は取得しませんでした");
  }

  // 「指定した url のブログ」に対する読者数を取得する
  // BLOG_URLには自分のサイトのURLを入力しておくこと。
  // 例: https://budougumi0617.github.io/
  let numOfSubscribers = -1;
  if (blogUrl != null) {
    numOfSubscribers = getNumOfSubscribers(blogUrl);
  } else {
    console.log("読者数は取得しませんでした");
  }

  console.log([today, followers, pv, bounceRate, bookmarks, numOfSubscribers]);
  sheet.appendRow([today, followers, pv, bounceRate, bookmarks, numOfSubscribers]);
}
