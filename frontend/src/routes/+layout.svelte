<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/navbar.svelte';
	import { pathname } from '$lib/stores';
	import { navbarVisible } from '$lib/stores.svelte';

	import { initLocalizationContext } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import CommandPalette from '$lib/components/commandpalette.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	const plausible_data_url = import.meta.env.VITE_PLAUSIBLE_DATA_URL;

	const hideNavbar = $derived(page.url.pathname === '/');

	if (browser) {
		pathname.set(window.location.pathname);
		localStorage.setItem('language', 'tr');
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
	initLocalizationContext('tr');
</script>

<svelte:head>
	{#if plausible_data_url}
		<script
			defer
			data-domain={plausible_data_url}
			src="https://plausible.nexus.mawoka.eu/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js"
		></script>
		<script>
			window.plausible =
				window.plausible ||
				function () {
					(window.plausible.q = window.plausible.q || []).push(arguments);
				};
		</script>
	{/if}
</svelte:head>

<div class="flex min-h-dvh flex-col bg-inherit">
	{#if navbarVisible.visible && !hideNavbar}
		<Navbar />
		<div class="pt-16">
			<div class="z-40"></div>
		</div>
	{/if}
	<main class="relative z-0 flex min-h-0 flex-1 flex-col">
		{@render children?.()}
	</main>
	<footer
		class="relative z-20 w-full shrink-0 border-t border-neutral-300 bg-[#F5F5F5] py-3 text-center text-xs font-medium text-[#1A1A1B] dark:border-neutral-600 dark:bg-[#252526] dark:text-neutral-200"
	>
		© 2026 Önder TechTeam
	</footer>
</div>
<CommandPalette />

<style lang="scss">
	:global(html:not(.dark)) {
		background-color: #f5f5f5;
		background-size: cover;
		color: #1a1a1b;
	}

	:global(html.dark) {
		background-color: #252526;
		background-size: cover;
		color: #f5f5f5;

		:global(#pips-slider) {
			--pip: white;
			--pip-active: white;
		}
	}

	@keyframes background_animation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
