import { BetaAnalyticsDataClient } from '@google-analytics/data';
import dotenv from 'dotenv';
import type { google } from '@google-analytics/data/build/protos/protos';
import { logger } from '../logs';
dotenv.config();

export const ReportsDateRanges = {
	Weekly: '7daysAgo',
	Monthly: '30daysAgo',
	Yearly: '365daysAgo'
};

/**
 * @description Run a report on Google Analytics for active users between the specified date range and today
 * @param {string} reportsDateRange
 * @returns {Promise<null | google.analytics.data.v1beta.IRunReportResponse>}
 *
 * @example AnalyticsRunReport(ReportsDateRanges.Weekly)
 */
export async function AnalyticsRunReport(
	reportsDateRange: string = ReportsDateRanges.Weekly
): Promise<null | google.analytics.data.v1beta.IRunReportResponse> {
	const { PRIVATE_ANALYTICS_GA4_PROPERTY_ID, PRIVATE_GOOGLE_APPLICATION_CREDENTIALS_ENABLED } =
		process.env;

	if (
		PRIVATE_GOOGLE_APPLICATION_CREDENTIALS_ENABLED != 'true' ||
		!PRIVATE_ANALYTICS_GA4_PROPERTY_ID
	) {
		logger.info({}, 'Google Analytics is disabled');
		return null;
	}

	try {
		const analyticsDataClient = new BetaAnalyticsDataClient();

		const [response] = await analyticsDataClient.runReport({
			property: `properties/${PRIVATE_ANALYTICS_GA4_PROPERTY_ID}`,
			dimensions: [
				{
					name: 'date'
				}
			],
			dateRanges: [
				{
					startDate: reportsDateRange,
					endDate: 'today'
				}
			],
			metrics: [
				{
					name: 'activeUsers'
				}
			]
		});

		return response;
	} catch (e) {
		logger.error({}, 'Error running Google Analytics report', e);
		return null;
	}
}
