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

class KPI {
  constructor(
    private description: string,
    private value: string
  ) { }

  public getValue() {
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

export class KPIDate extends KPI {
  constructor(
    value: string
  ) {
    super("Date", value);
  }
}

export class KPITwitterFollower extends KPI {
  constructor(
    value: string
  ) {
    super("Twitter Follower", value);
  }
}

export class KPIWeeklyPV extends KPI {
  constructor(
    value: string
  ) {
    super("WeeklyPV", value);
  }
}

export class KPIWeeklyBounceRate extends KPI {
  constructor(
    value: string
  ) {
    super("Weekly Bounce Rate", value);
  }
}

export class KPIBookmarks extends KPI {
  constructor(
    value: string
  ) {
    super("Bookmarks", value);
  }
}

export class KPISubscribers extends KPI {
  constructor(
    value: string
  ) {
    super("Subscribers", value);
  }
}

export class KPIStars extends KPI {
  constructor(
    value: string
  ) {
    super("Stars", value);
  }
}