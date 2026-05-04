<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	import { fly } from 'svelte/transition';
	import JpgOpenGraph from '$lib/assets/landing/opengraph-home.jpg';
	import BrandMark from '$lib/components/BrandMark.svelte';
	import onderLogoHero from '$lib/assets/brand/onder-logo.svg';
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

<div
	class="min-h-screen bg-[#F5F5F5] flex flex-col justify-between p-8 md:p-16 font-sans text-[#1A1A1B] relative overflow-hidden"
>
	<header class="flex justify-between items-start w-full z-10">
		<div class="flex flex-col gap-2">
			<BrandMark variant="home" />
			<p class="text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase opacity-80 text-[#1A1A1B]">
				İmam Hatipliler Derneği
			</p>
		</div>

		<div class="text-right text-[#1A1A1B]">
			<p class="text-sm md:text-lg font-light leading-tight">KAMU KARİYER</p>
			<p class="text-sm md:text-lg font-light leading-tight">BİLGİLENDİRME</p>
			<p class="text-lg md:text-2xl font-black">PROGRAMI</p>
		</div>
	</header>

	<main class="flex-grow flex flex-col items-center justify-center z-10 py-8 md:py-12">
		<div
			class="text-center max-w-4xl"
			in:fly={{ y: 20, duration: 800, opacity: 0 }}
		>
			<div class="flex justify-center px-2">
				<img
					src={onderLogoHero}
					alt="Önder Ankara"
					class="w-full max-w-2xl md:max-w-4xl h-auto object-contain drop-shadow-sm"
					width="640"
					height="186"
					loading="eager"
					decoding="async"
				/>
			</div>

			<p class="mt-8 text-sm md:text-base font-medium text-[#1A1A1B]/75 max-w-lg mx-auto">
				Canlı bilgi yarışması oluşturun, paylaşın veya oyun PIN’i ile hemen katılın.
			</p>

			<div
				class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto"
			>
				<a
					href="/create"
					class="text-center px-10 py-4 rounded-sm bg-[#C41230] hover:bg-[#a30f28] text-white shadow-md font-bold text-base md:text-lg transition-colors border border-[#C41230]"
				>
					Quiz oluştur
				</a>
				<a
					href="/play"
					class="text-center px-10 py-4 rounded-sm bg-white hover:bg-neutral-100 text-[#1A1A1B] shadow-md font-bold text-base md:text-lg transition-colors border-2 border-[#1A1A1B]/15"
				>
					Quiz’e katıl
				</a>
			</div>
		</div>
	</main>

	<footer class="w-full flex justify-between items-end z-10 gap-4">
		<div class="w-24 h-24 md:w-40 md:h-40 opacity-20 text-[#C41230] shrink-0">
			<svg viewBox="0 0 200 200" fill="currentColor" class="w-full h-full" aria-hidden="true">
				<path
					d="M40,150 Q100,100 160,150 M40,160 Q100,110 160,160 M100,40 L100,120 M80,60 L100,40 L120,60"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
				/>
				<rect x="40" y="150" width="120" height="10" rx="2" />
			</svg>
		</div>
		<p class="text-xs text-[#1A1A1B]/50 text-right max-w-xs leading-relaxed">
			Bu uygulama etkinlik içi canlı soru–cevap oturumları içindir.
		</p>
	</footer>

	<div
		class="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"
		aria-hidden="true"
	></div>
</div>
