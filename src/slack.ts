function slackNotification(slackUrl: string, value: Array<any>) {
  const options: any = {
    'method': 'post',
    'headers': { 'Content-type': 'application/x-www-form-urlencoded' },
    'payload': JSON.stringify({
      'attachments': [
        {
          'fallback': '今週のブログKPIを取得しました！',
          'color': '#36a64f',
          'title': '今週のブログKPIを取得しました！',
          'title_link': 'https://docs.google.com/spreadsheets/d/' + SpreadsheetApp.getActiveSpreadsheet().getId(),
          "fields": [
            {
              "title": "Date",
              "value": value[0],
              "short": "true"
            },
            {
              "title": "Twitter Follower",
              "value": value[1],
              "short": "true"
            },
            {
              "title": "WeeklyPV",
              "value": value[2],
              "short": "true"
            },
            {
              "title": "Weekly Bounce Rate",
              "value": value[3],
              "short": "true"
            },
            {
              "title": "Bookmarks",
              "value": value[4],
              "short": "true"
            },
            {
              "title": "Subscribers",
              "value": value[5],
              "short": "true"
            },
            {
              "title": "Stars",
              "value": value[6],
              "short": "true"
            }
          ]
        }
      ]
    })
  };
  UrlFetchApp.fetch(slackUrl, options);
}