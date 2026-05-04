<!--
	Vektör wordmark — PNG yükleme hatası / pembe kutu olmadan keskin görünür.
	Kendi logon için bu SVG’yi değiştir veya içeriği <image href={importedPng} /> ile değiştir.
-->
<script lang="ts">
	type Variant = 'hero' | 'header' | 'nav';

	interface Props {
		variant?: Variant;
	}

	let { variant = 'hero' }: Props = $props();

	const svgClass =
		variant === 'hero'
			? 'block h-auto w-[min(88vw,640px)] max-h-[min(28vh,220px)] shrink-0'
			: variant === 'header'
				? 'block h-12 w-auto max-w-[min(72vw,320px)] shrink-0 md:h-16 md:max-w-[380px]'
				: 'block h-9 w-auto max-w-[200px] shrink-0 lg:h-10';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 480 140"
	class={svgClass}
	preserveAspectRatio="xMidYMid meet"
	role="img"
	aria-label="Önder Ankara"
>
	<text
		x="20"
		y="92"
		font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
		font-size="68"
		font-weight="800"
		fill="#C41230"
	>önder</text>
	<text
		x="198"
		y="92"
		font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
		font-size="68"
		font-weight="800"
		fill="#1A1A1B"
	>ankara</text>
</svg>
