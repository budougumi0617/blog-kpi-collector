namespace googleAnalytics {
  export function getAnalyticsData(viewID: string): string[] {
    const startDate = "7daysAgo";
    const endDate = "yesterday";
    const metrics = "ga:pageviews,ga:bounceRate";

    const resp = Analytics?.Data?.Ga?.get(viewID, startDate, endDate, metrics);
    // return [pv, bounceRate]
    return resp?.rows ? resp.rows[0] : ["0", "0"];
  }
}
