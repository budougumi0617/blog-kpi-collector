import { KPIList } from "./domain/KPIList";

function slackNotification(slackUrl: string, value: KPIList) {
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
          "fields": value.getSlackArray(),
        }
      ]
    })
  };
  UrlFetchApp.fetch(slackUrl, options);
}