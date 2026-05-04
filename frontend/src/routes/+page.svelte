<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	import JpgOpenGraph from '$lib/assets/landing/opengraph-home.jpg';
	import BrandMark from '$lib/components/BrandMark.svelte';
	import OnderLogoMark from '$lib/components/OnderLogoMark.svelte';
</script>

<svelte:head>
	<title>Önder Ankara — Kamu Kariyer Bilgilendirme Programı | Canlı Quiz</title>
	<meta
		name="description"
		content="Gelenekten geleceğe: canlı bilgi yarışması oluşturun veya PIN ile katılın. İmam Hatipliler Derneği Kamu Kariyer bilgilendirme programı."
	/>
	<meta property="og:title" content="Önder Ankara — Kamu Kariyer Bilgilendirme Programı" />
	<meta
		property="og:description"
		content="Gelenekten geleceğe: canlı bilgi yarışması oluşturun veya PIN ile katılın."
	/>
	<meta property="og:image" content={JpgOpenGraph} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- Tek ekran (100dvh), iç kaydırma yok; layout alt bilgisi ana sayfada gizli -->
<div
	class="box-border flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[#F5F5F5] px-4 py-3 font-sans text-[#1A1A1B] sm:px-6 sm:py-4 md:px-8 md:py-5"
>
	<header class="flex shrink-0 items-start justify-between gap-3">
		<div class="min-w-0 flex-1">
			<BrandMark variant="home" />
			<p class="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-[#1A1A1B]/75 sm:text-[10px]">
				İmam Hatipliler Derneği
			</p>
		</div>
		<div class="shrink-0 text-right text-[#1A1A1B] leading-tight">
			<p class="text-[10px] font-light sm:text-xs md:text-sm">KAMU KARİYER</p>
			<p class="text-[10px] font-light sm:text-xs md:text-sm">BİLGİLENDİRME</p>
			<p class="text-xs font-black sm:text-sm md:text-base">PROGRAMI</p>
		</div>
	</header>

	<main class="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 py-2 sm:gap-4">
		<div class="flex min-h-0 w-full max-w-3xl flex-col items-center justify-center text-center">
			<OnderLogoMark variant="hero" />
			<p class="mt-1 max-w-md px-1 text-xs font-medium text-[#1A1A1B]/80 sm:text-sm">
				Canlı bilgi yarışması oluşturun, paylaşın veya oyun PIN’i ile hemen katılın.
			</p>
			<div class="mt-3 flex w-full max-w-md flex-col gap-2 sm:mt-4 sm:flex-row sm:justify-center sm:gap-3">
				<a
					href="/create"
					class="flex-1 rounded-sm border border-[#C41230] bg-[#C41230] py-3 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-[#a30f28] sm:py-3.5 sm:text-base"
				>
					Quiz oluştur
				</a>
				<a
					href="/play"
					class="flex-1 rounded-sm border-2 border-[#1A1A1B]/15 bg-white py-3 text-center text-sm font-bold text-[#1A1A1B] shadow-md transition-colors hover:bg-neutral-100 sm:py-3.5 sm:text-base"
				>
					Quiz’e katıl
				</a>
			</div>
		</div>
	</main>

	<footer
		class="flex shrink-0 items-end justify-between gap-3 border-t border-black/5 pt-2 text-[10px] text-[#1A1A1B]/55 sm:text-xs"
	>
		<p class="max-w-[55%] leading-snug">
			Bu uygulama etkinlik içi canlı soru–cevap oturumları içindir.
		</p>
		<p class="shrink-0 font-medium text-[#1A1A1B]/65">© 2026 Önder TechTeam</p>
	</footer>

	<div
		class="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"
		aria-hidden="true"
	></div>
</div>
