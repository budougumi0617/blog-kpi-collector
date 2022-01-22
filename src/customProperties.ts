/**
 * 個別のプロパティを取得および設定するためのモジュール.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace CustomProperties {
  /**
   * 集計したいシート名
   * 例：シート1
   */
  const SHEET_NAME = "";
  /**
   * TwitterID
   * 例： budougumi0617
   */
  const TWITTER_NAME = "";
  /**
   * GAのID.
   * 例：ga:000000000
   */
  const VIEW_ID = "";
  /**
   * ブログのURL.
   * 例：https://budougumi0617.github.io/
   */
  const BLOG_URL = "";
  /**
   * trueにすると、集計したいブログのURLがはてなブログの場合。はてなブログ読者数とはてなスター数を取得する
   * 
   * 例：false
   */
  const HATENA_BLOG = false;
  /**
   * SlackのIncommingHook
   * 例：https://hooks.slack.com/services/TAH1RHKEW/B01BXA1PYBC/JQ5aIRrqTnAAAAAAAAAAAAA
   */
  const SLACK_URL = "";

  /**
   * "SHEET_NAME"にはDrive上に作成したスプレットシートのシート名を入力しておくこと。
   * 未入力の場合はデフォルトの"シート1"に書き込まれる。
   * 例: シート1
   **/
  export function getSheetName(): string {
    if (SHEET_NAME != "") {
      return SHEET_NAME;
    }

    const sheetName = PropertiesService.getScriptProperties().getProperty(
      "SHEET_NAME"
    );
    if (sheetName == null || sheetName.length === 0) {
      return "シート1";
    }
    return sheetName;
  }

  /**
   * Twitterのフォロワー情報を取得する
   * TWITTER_NAMEにはアカウント名を入力しておくこと(@は不要)
   **/
  export function getTwitterName(): string | null {
    if (TWITTER_NAME != "") {
      return TWITTER_NAME;
    }

    return PropertiesService.getScriptProperties().getProperty(
      "TWITTER_NAME"
    );
  }

  /**
   * Gooogle Analyticsから実行した日の前日から過去7日間のPV数と直帰数を取得する。
   * GA_VIEW_IDには"ga:"から始まるIDを入力しておくこと。
   * IDの取得方法は以下の通り
   * 1. 以下のURLを開く
   *    - https://ga-dev-tools.appspot.com/query-explorer/#report-start
   * 2. Select Viewで集計したいデータを選択する
   * 3. Set the query parametersのidsに自動入力される"ga:000000000"というIDをGA_VIEW_IDとする
   **/
  export function getViewID(): string | null {
    if (VIEW_ID != "") {
      return VIEW_ID;
    }

    return PropertiesService.getScriptProperties().getProperty(
      "GA_VIEW_ID"
    );
  }

  /**
   *「指定した url とそれ以下のパスの url」に対するはてなブックマークの合計数の合計を取得する
   * BLOG_URLには自分のサイトのURLを入力しておくこと。
   * 例: https://budougumi0617.github.io/
   **/
  export function getBlogUrl(): string | null {
    if (BLOG_URL != "") {
      return BLOG_URL;
    }

    return PropertiesService.getScriptProperties().getProperty(
      "BLOG_URL"
    );
  }

  /**
   * 「HATENA_BLOGがtrue」だった場合、「指定した url のブログ」に対する読者数・スター数を取得する
   **/
  export function getHatenaBlog(): string | null {
    if (HATENA_BLOG) {
      return "true";
    }

    return PropertiesService.getScriptProperties().getProperty(
      "HATENA_BLOG"
    );
  }

  /**
   * 通知先のURLを取得する
   */
  export function getSlackUrl(): string | null {
    if (SLACK_URL != "") {
      return SLACK_URL;
    }

    return PropertiesService.getScriptProperties().getProperty(
      "SLACK_URL"
    );
  }
}