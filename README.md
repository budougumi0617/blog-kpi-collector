# blog-kpi-collector
Collect KPIs for blog

Googleスプレットシートで定期的にブログの情報を集計するためのApps Scriptを生成するスターターキットです。

![完成図](./img/result.png)

このリポジトリを使ってApps Scriptとスプレットシートを作成すると、以下のKPI情報をシートに書き込んでいきます。  
未設定にしておけば取得もしないので、全てサービスからの情報が不要な方でも利用できます。 
後述するトリガーを設定しておくことで定期的にデータを集計できます。 

```
~Twitter~ | ~フォロワー数~
Google Analytics | 前日までの週間PV数、 前日までの週間直帰率
はてなブックマーク | はてなブックマーク総数
はてなブログ | はてなブログ読者総数
はてなスター | はてなスター総数
```

2022年1月現在、twitterのフォロワー数は取得できません。  
https://github.com/budougumi0617/blog-kpi-collector/issues/18

# 使い方
# 初期設定
自分のPCで`clasp`コマンドを利用する準備をします。以下のページを参考に`clasp login`まで済ませておきます。

- GAS のGoogle謹製CLIツール clasp
    - https://qiita.com/HeRo/items/4e65dcc82783b2766c03

このリポジトリをローカルに持ってきて、パッケージ群をインストールします。

```bash
git clone git@github.com:budougumi0617/blog-kpi-collector.git
cd blog-kpi-collector

npm install
```


`clasp create`コマンドでAdd-on script（Apps Scriptプロジェクト）と紐付けるスプレットシートを作成します。
```bash
$ clasp create --title "KPI Sheet" --type sheets --rootDir ./src
Created new Google Sheet: https://drive.google.com/open?id=....
Created new Google Sheets Add-on script: https://script.google.com/d/..../edit
Cloned 1 file.
└─ ./src/appsscript.json
$ mv ./src/.clasp.json ./.clasp.json
```

出力されたAdd-on scriptとSpread SheetのURLをメモしておきます。その後、一度`clasp pull`して連携したあと、`clasp push`コマンドでコードをDriveに送ります。

```bash
$ clasp pull
Cloned 2 files.
└─ ./src/appsscript.json
└─ ./src/Code.js

$ clasp push
└─ src/Code.js
└─ src/appsscript.json
└─ src/googleAnalytics.ts
└─ src/hatena.ts
└─ src/main.ts
└─ src/slack.ts
└─ src/twitter.ts
Pushed 6 files.
```



Add-on scriptのURLを開きます(`clasp open`コマンドでも開きます)。
`main.gs`ファイルを選択し、`main`関数を実行します。

![main関数を実行する](./img/execute_main.png)

「承認が必要です」と出てくるので「許可を確認」→アカウントを選択→「詳細」→「KPI Sheet（安全ではないページ）に移動」→「許可」とクリックしていきます。

実行後、スプレットシートを開き、以下の状態になっていたら初期設定は終了です。
![実行後のSheetの状態](./img/executed_result.png)

スクリプトのプロパティにアカウントIDなどを入力すれば実行のたびに最後の行に新しい情報が追加されていきます。
（必要に応じて最初の行に列情報を書いておくといいでしょう）

![行タイトルをつけておく](./img/rows_labels.png)


## 「スクリプトのプロパティ」を設定する
Web上でAdd-on script（Apps Scriptプロジェクト）を開いたあと、スクリプトのプロパティに以下の変数を設定します。
なお、未入力の場合は対応するサービスから値が取得されません。

|    変数名   | 値 | 説明 | 例 | 
|---|---|---|---|
| `SHEET_NAME` | 集計したいシートの名前 | 未設定の場合は「シート1」に集計する| master |
| `TWITTER_NAME` | Twitter ID | フォロワー数を取得する | budougumi0617
| `GA_VIEW_ID` | GA ID | 一週間のPV数と直帰率を集計する | ga:000000000 |
| `BLOG_URL` | ブログのURL | はてなブックマーク数を取得する | https://budougumi0617.github.io/ |
 | `HATENA_BLOG` | true or another | `BLOG_URL`が設定済みであることがであることが前提。はてなブログ読者数とはてなスター数を取得する、未設定もしくはtrue以外の設定は未入力と同じく値を取得しない | true |
 | `SLACK_URL` | SlackのIncommingHook | Slackの通知先のIncommingHookを設定する | https://hooks.slack.com/services/TAH1RHKEW/B01BXA1PYBC/JQ5aIRrqTnAAAAAAAAAAAAA |


## スクリプトのプロパティの設定方法
2022年1月現在、下記手順は「旧エディタ」でないとできません。  
添付画像とエディタの外見が異なる場合は「以前のエディタを使用」をクリックして旧エディタを開きます。

https://8bees.net/gas%e3%81%ae%e3%83%97%e3%83%ad%e3%83%91%e3%83%86%e3%82%a3%e8%a8%ad%e5%ae%9a

1. このリポジトリで作成したApps Scriptのプロジェクトを開く
  - https://script.google.com/u/1/home
2. メニューの中の「ファイル」→「プロジェクトのプロパティ」をクリックする
![プロパティを設定する](./img/open_project_properties.png)
3. 「プロジェクトのプロパティ」ウインドウの「スクリプトのプロパティ」タブをクリックする
4. 設定するプロパティの名前と値を入力していく
![スクリプトのプロパティ](./img/properties.png)

### 直接プロパティを入力する場合

スクリプトのプロパティが「旧エディタ」でないとできなくなっていますので、直接値を設定する方法を取る場合の設定箇所を記載します。
  
- 対象ファイル
  - CustomProperties.ts

次の定数（const）に「スクリプトのプロパティ」を設定してください。
  
```ts
namespace CustomProperties {
  const SHEET_NAME = "";
  const TWITTER_NAME = "";
  const VIEW_ID = "";
  const BLOG_URL = "";
  const HATENA_BLOG = false;
  const SLACK_URL = "";
}
```

# Google Analyticsとの連携方法
Google Analyticsとの連携には`GA_VIEW_ID`の他にAnalytics APIを有効にする必要があります。

## GA_VIEW_IDの調べ方
まず、Google Analyticsの情報を取得するためのIDの取得方法は以下の通りです。

1. 以下のURLを開く
   - https://ga-dev-tools.appspot.com/query-explorer/#report-start
2. `Select View`で集計したいデータを選択する
3. `Set the query parameters`の`ids`に自動入力される`ga:000000000`というIDをGA_VIEW_IDとする


## Analytics APIを有効にする
1. Add-on scriptのメニューから「リソース」→「Google の拡張サービス」を選択し、Google Analytics APIを有効にします。


![拡張サービス](./img/expansion_services.png)
![Add-on プロジェクト上でAPIを有効にする](./img/enable_statics_api.png)

2. Google Cloud Platform API ダッシュボード へのリンクがあるのでクリックすると、別のウインドウが開きます。
3. APIを有効にするボタンをクリックして「Analitycs API」を探し、有効にします。
![APIとサービスを有効にする](./img/open_api_project.png)
![Analytics APIを有効にする](./img/analitics_api.png)
4. もう一度Add-on scriptに戻り`main`関数を実行すると、最初に出てきた認可ウインドウが表示されるので、最初と同じように「許可」をします。

## ローカルで実行する
`clasp run`コマンドで実行できます。別途認証情報などが必要になるので、以下のページを参考に追加の設定をしてください。

- https://github.com/google/clasp/blob/master/docs/run.md
- [Google Apps ScriptをローカルPCで開発する方法][localdev]

[localdev]:https://officeforest.org/wp/2019/04/07/google-apps-script%E3%82%92%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%ABpc%E3%81%A7%E9%96%8B%E7%99%BA%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/

# 定期的に実行する（トリガーを設定する）
Add-on scriptの時計のアイコンからトリガーを設定することができます。
メニューの中の「編集」→「現在のプロジェクトのトリガー」から定期的に`main`関数を実行するようにします。
![トリガーを設定して定期的に実行する](./img/trigger.png)
## トリガーが時間どおりに動かない場合
タイムゾーンがずれているかもしれません。
メニューの中の「ファイル」→「プロジェクトのプロパティ」をクリックし、「プロジェクトのプロパティ」ウインドウ内の「情報」タブの中に「タイムゾーン」の設定があるのでそちらを確認してください。

# Slackに通知する
通知先チャンネルを設定したIncommingHookを設定する。  
https://my.slack.com/services/new/incoming-webhook/  
  
下記のWebhook URLを```SLACK_URL```に設定する。
![SlackのwebHookUrlを取得する](./img/slack_webhookUrl.png)
  
なお、トリガーで深夜に起動する場合は、Slack側で深夜の通知が来ないようにする等の設定をしてください。

# 更新する。
最新のスクリプトを利用したい場合は、次のコマンドで実行できます。
```bash
$ git pull
$ clasp push
```

# Docker環境を利用する場合

ローカルに直接Claspを導入せずにDockerを使用する場合は、こちらの手順を参考にしてください。

```bash
# コンテナへのログイン
docker-compose run clasp bash

cd /usr/src/app
# Googleへのログイン
clasp login --no-localhost
# npm install
npm install
# KPIシート作成
clasp create --title "KPI Sheet" --type sheets --rootDir ./src
# .clasp.jsonの移動
mv ./src/.clasp.json ./.clasp.json
clasp pull
clasp push
```

<!--
参考URL：
https://zenn.dev/marusho/scraps/3579309aabf5eb
 -->

# 要望など
Issueでお願いします。

https://github.com/budougumi0617/blog-kpi-collector/issues/new

# 製作者
@budougumi0617

# ライセンス
MIT
