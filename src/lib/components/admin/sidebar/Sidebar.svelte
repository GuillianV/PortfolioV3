<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { LayoutConfig, LayoutSidebarItem } from '$lib/client/utils/ambiant.js';
	import ButtonDisconnect from '$lib/components/admin/buttons/disconnect/ButtonDisconnect.svelte';

	export let config: LayoutConfig;

	const { admin, sidebar } = config;
	let { active = '' } = $page.data;
	let sidebarHtml = initSidebar(sidebar);

	afterNavigate(() => {
		active = $page.data.active;
		sidebarHtml = initSidebar(sidebar);
	});

	function initSidebar(sidebarItem: LayoutSidebarItem[]) {
		let sidebarItems = sidebarItem
			.map((item) => {
				let local = `<li class='li'><a class="${active == item.linkactive ? 'active ' : ''}${item.items.length > 0 ? 'pointer-events-none' : ''}" ${
					item.slug != null ? `href='${admin.slug}${item.slug}'` : ''
				}>${item.bartitle}</a></li>`;

				if (item.items.length > 0) {
					local += `<ul>`;
					local += initSidebar(item.items);
					local += `</ul>`;
				}

				return local;
			}, [])
			.join('');
		return sidebarItems;
	}
</script>

<div class="relative h-full">
	<nav class="list-nav">
		<ul class="ul-parent">
			{@html sidebarHtml}
		</ul>
	</nav>
	<div class="absolute bottom-0 w-full right-0">
		<ButtonDisconnect class="w-full" />
	</div>
</div>
