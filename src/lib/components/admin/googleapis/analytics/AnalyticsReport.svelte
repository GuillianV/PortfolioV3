<script lang="ts">
	import type { google } from '@google-analytics/data/build/protos/protos';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { dateFrom_yyyyMMdd } from '$lib/client/utils/convert';

	let analytics_report: google.analytics.data.v1beta.IRunReportResponse;
	let reportElement: HTMLCanvasElement;
	let error: boolean = false;

	onMount(async () => {
		fetch('/api/googleapis/analytics/report')
			.then(async (result) => {
				if (result.status !== 200) {
					error = true;
					return;
				}
				const json_data = await result.json();
				if (json_data.type !== 'success') {
					error = true;
					return;
				}

				analytics_report = json_data.data as google.analytics.data.v1beta.IRunReportResponse;
				doReportChart();
			})
			.catch(() => {
				error = true;
			});
	});

	function doReportChart() {
		try {
			const dark = document.documentElement.className == 'dark';
			Chart.defaults.color = dark ? '#fff' : '#000';

			if (
				analytics_report == null ||
				analytics_report.rows == null ||
				analytics_report.rowCount == 0
			) {
				error = true;
				return;
			}

			let data = analytics_report.rows.map((row) => {
				if (
					row.dimensionValues != null &&
					row.metricValues != null &&
					row.dimensionValues.length > 0 &&
					row.metricValues.length > 0
				) {
					return {
						date: row.dimensionValues[0].value as string,
						count: row.metricValues[0].value as string
					};
				} else {
					return {
						date: '0',
						count: '0'
					};
				}
			});

			data.sort((a, b) => {
				return a.date < b.date ? -1 : 1;
			});

			data = data.map((row) => {
				let date = dateFrom_yyyyMMdd(row.date);
				let stringDate = '';
				if (date != null) {
					stringDate = date.toLocaleDateString('fr-FR', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					});
				}
				return {
					date: stringDate,
					count: row.count
				};
			});

			new Chart(reportElement, {
				type: 'line',

				data: {
					labels: data.map((row) => row.date),
					datasets: [
						{
							label: 'Utilisateurs par jour',
							data: data.map((row) => row.count),
							backgroundColor: 'rgba(151, 185, 254, 0.8)',
							borderColor: 'rgba(151, 185, 254, 0.2)'
						}
					]
				}
			});
		} catch (e) {
			console.error(e);
			error = true;
		}
	}
</script>

<div class="w-full p-4 rounded-container-token">
	{#if error}
		<div class="w-full h-full flex justify-center items-center text-center">
			<p>Une erreur est survenue lors de la récupération des données.</p>
		</div>
	{:else}
		<div class="w-full h-full"><canvas bind:this={reportElement} id="report"></canvas></div>
	{/if}
</div>
