<!--
	Logo: `frontend/static/brand/onder-logo.png` dosyasını kendi PNG’nizle değiştirin (aynı dosya adı).
-->
<script lang="ts">
	type Variant = 'home' | 'nav';

	interface Props {
		variant?: Variant;
	}

	let { variant = 'home' }: Props = $props();

	const src = '/brand/onder-logo.png';
	const imgClass =
		variant === 'home'
			? 'h-16 md:h-24 w-auto max-w-[min(100%,320px)] object-contain object-left'
			: 'h-9 lg:h-10 w-auto max-w-[200px] object-contain';
</script>

<a
	href="/"
	class="inline-flex items-center {variant === 'nav' ? 'link-hover rounded-sm' : ''}"
	aria-label="Ana sayfa"
>
	<img {src} alt="" class={imgClass} width="240" height="80" loading="lazy" decoding="async" />
</a>
