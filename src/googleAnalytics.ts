function getAnalyticsData(viewID) {
  const startDate = "7daysAgo";
  const endDate = "yesterday";
  const metrics = "ga:pageviews,ga:bounceRate";

  const resp = Analytics.Data.Ga.get(viewID, startDate, endDate, metrics);
  // return [pv, bounceRate]
  return resp.getRows()[0];
}
