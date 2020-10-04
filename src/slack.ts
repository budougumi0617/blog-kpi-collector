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
          'text': value.join(','),
        }
      ]
    })
  };
  UrlFetchApp.fetch(slackUrl, options);
}