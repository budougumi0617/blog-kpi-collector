// main
// 紐付けられたスプレットシートにKPIを記録していく関数
// 使い方はREADME参照のこと
//
// claspではimport/exportが利用できないため、外部ファイルの関数定義はnamespaceを利用して利用して参照している。
// ref: https://github.com/google/clasp/blob/e851215b8abe4de282c62c4d61076c85e89a56ba/docs/typescript.md
function main() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // "SHEET_NAME"にはDrive上に作成したスプレットシートのシート名を入力しておくこと。
  // 未入力の場合はデフォルトの"シート1"に書き込まれる。
  // 例: シート1
  const sheetName = CustomProperties.getSheetName();
  const sheet = spreadsheet.getSheetByName(sheetName);

  const today = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd");

  // Twitterのフォロワー情報を取得する
  // TWITTER_NAMEにはアカウント名を入力しておくこと(@は不要)
  let followers = -1;
  const twitterName = CustomProperties.getTwitterName();
  if (twitterName != null) {
    followers = twitter.getTwitterFollowers(twitterName);
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
  const viewID = CustomProperties.getViewID();
  let pv = -1;
  let bounceRate = -1;
  if (viewID != null) {
    const gaResults = googleAnalytics.getAnalyticsData(viewID);
    pv = Number(gaResults[0]);
    bounceRate = Number(gaResults[1]);
  } else {
    console.log("GoogleAnalytics情報は取得しませんでした");
  }

  // 「指定した url とそれ以下のパスの url」に対するはてなブックマークの合計数の合計を取得する
  // BLOG_URLには自分のサイトのURLを入力しておくこと。
  // 例: https://budougumi0617.github.io/
  let bookmarks = -1;
  const blogUrl = CustomProperties.getBlogUrl();
  if (blogUrl != null) {
    bookmarks = hatena.getBookmarkCount(blogUrl);
  } else {
    console.log("はてなブックマーク数は取得しませんでした");
  }

  // 「HATENA_BLOGがtrue」だった場合、「指定した url のブログ」に対する読者数・スター数を取得する
  let numOfSubscribers = -1;
  let stars = -1;
  const hatenaBlog = CustomProperties.getHatenaBlog();
  if (hatenaBlog === "true" && blogUrl != null) {
    numOfSubscribers = hatena.getNumOfSubscribers(blogUrl);
    stars = hatena.getStarCount(blogUrl);
  } else {
    console.log("読者数・スター数は取得しませんでした");
  }

  const kpiList = new domain.KPIList();
  kpiList.add(domain.KPI.Factory.date(today));
  kpiList.add(domain.KPI.Factory.twitterFollower(followers.toString()));
  kpiList.add(domain.KPI.Factory.weeklyPV(pv.toString()));
  kpiList.add(domain.KPI.Factory.weeklyBounceRate(bounceRate.toString()));
  kpiList.add(domain.KPI.Factory.bookmarks(bookmarks.toString()));
  kpiList.add(domain.KPI.Factory.subscribers(numOfSubscribers.toString()));
  kpiList.add(domain.KPI.Factory.stars(stars.toString()));

  // スプレッドシートに追記する
  console.log(kpiList.getSpreadSheetArray());
  sheet?.appendRow(kpiList.getSpreadSheetArray());

  // Slackへの通知を行う。
  const slackUrl = CustomProperties.getSlackUrl();
  if (slackUrl != null) {
    slackNotification(slackUrl, kpiList);
  } else {
    console.log("Slack通知URLは取得しませんでした");
  }
}

// FIXME: なぜかslack.tsだけclasp上で RefferenceError: slackClient is not definedとなってmaint.tsから見えないので直接記述している。
function slackNotification(slackUrl: string, value: domain.KPIList): void {
  const options: URLFetchRequestOptions = {
    method: "post",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    payload: JSON.stringify({
      attachments: [
        {
          fallback: "今週のブログKPIを取得しました！",
          color: "#36a64f",
          title: "今週のブログKPIを取得しました！",
          title_link:
            "https://docs.google.com/spreadsheets/d/" +
            SpreadsheetApp.getActiveSpreadsheet().getId(),
          fields: value.getSlackArray(),
        },
      ],
    }),
  };
  UrlFetchApp.fetch(slackUrl, options);
}
