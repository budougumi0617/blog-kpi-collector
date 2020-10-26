export class KPIList {
  private kpiList: Array<KPI>;
  constructor() {
    this.kpiList = [];
  }
  public add(kpi: KPI): void {
    this.kpiList.push(kpi);
  }

  public getSpreadSheetArray(): Array<string> {
    return this.kpiList.map(kpi => kpi.getValue());
  }

  public getSlackArray(): any {
    return this.kpiList
      .filter(kpi => kpi.getValue() !== "-1")
      .map(kpi => kpi.toSlackFields());
  }
}

interface iKPI {
  /**
   * valueを取得する。
   */
  getValue(): string;
  /**
   * Slackに通知するためのFieldsを返却する。
   * anyではなく、ガッチリ定義してもよいが、そのためにライブラリを追加したり定義するのは大変なので、anyで見送る。
   */
  toSlackFields(): any;
}

export class KPI implements iKPI {
  constructor(
    private description: string,
    private value: string
  ) { }

  public static Factory = class {
    public static date(value: string): KPI {
      return new KPI("Date", value);
    }

    public static twitterFollower(value: string): KPI {
      return new KPI("Twitter Follower", value);
    }

    public static weeklyPV(value: string): KPI {
      return new KPI("WeeklyPV", value);
    }

    public static weeklyBounceRate(value: string): KPI {
      return new KPI("Weekly Bounce Rate", value);
    }

    public static bookmarks(value: string): KPI {
      return new KPI("Bookmarks", value);
    }

    public static subscribers(value: string): KPI {
      return new KPI("Subscribers", value);
    }

    public static stars(value: string): KPI {
      return new KPI("Stars", value);
    }
  }


  public getValue(): string {
    return this.value;
  }

  public toSlackFields(): any {
    return {
      "title": this.description,
      "value": this.value,
      "short": "true"
    }
  }
}

