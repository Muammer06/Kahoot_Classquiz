<!--
	Ana marka: vektör `OnderLogoMark` (PNG yolu / kırık görsel yok).
-->
<script lang="ts">
	import OnderLogoMark from '$lib/components/OnderLogoMark.svelte';

	type Variant = 'home' | 'nav';

	interface Props {
		variant?: Variant;
	}

	let { variant = 'home' }: Props = $props();

	const markVariant = variant === 'nav' ? 'nav' : 'header';
</script>

<a
	href="/"
	class="inline-flex items-center {variant === 'nav' ? 'link-hover rounded-sm' : ''}"
	aria-label="Ana sayfa"
>
	<OnderLogoMark variant={markVariant} />
</a>
