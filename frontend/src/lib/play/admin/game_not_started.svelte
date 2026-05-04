<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	import ControllerCodeDisplay from '$lib/components/controller/code.svelte';
	import { getLocalization } from '$lib/i18n';
	import { fade } from 'svelte/transition';
	import { SocketGameControls } from '$lib/play/admin/socket_game_controls.ts';
	import type { GameState } from '$lib/play/admin/game_state';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface Props {
		game_pin: string;
		game_state: GameState;
		socket_game_controls: SocketGameControls;
		cqc_code: string | null;
	}

	let {
		game_pin,
		game_state = $bindable(),
		socket_game_controls,
		cqc_code = $bindable()
	}: Props = $props();

	const { t } = getLocalization();

	let fullscreen_open = $state(false);
	let playUrl = $state('');
	let copied_pin = $state(false);
	let copied_link = $state(false);

	if (cqc_code === 'null') {
		cqc_code = null;
	}

	onMount(() => {
		if (!browser) {
			return;
		}
		playUrl = `${window.location.origin}/play`;
	});

	async function copyText(text: string, which: 'pin' | 'link') {
		if (!browser || !text) {
			return;
		}
		try {
			await navigator.clipboard.writeText(text);
			if (which === 'pin') {
				copied_pin = true;
				setTimeout(() => (copied_pin = false), 1600);
			} else {
				copied_link = true;
				setTimeout(() => (copied_link = false), 1600);
			}
		} catch {
			/* yoksay — HTTP veya izin */
		}
	}
</script>

<div class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-28 pt-8 text-[#1A1A1B] md:gap-14">
	<div class="text-center">
		<h1 class="text-3xl font-black tracking-tight text-[#1A1A1B] md:text-4xl">
			{$t('play_page.lobby_heading')}
		</h1>
		<p class="mx-auto mt-3 max-w-2xl text-base opacity-80 md:text-lg">
			{$t('play_page.join_step_visit')} · {$t('play_page.join_step_pin')}
		</p>
	</div>

	<div class="grid gap-8 lg:grid-cols-2 lg:items-start">
		<section
			class="flex flex-col items-center rounded-2xl border-2 border-[#C41230]/20 bg-white p-6 shadow-lg lg:p-10 dark:border-neutral-600 dark:bg-[#2d2d30]"
		>
			<p class="text-sm font-semibold uppercase tracking-widest text-[#C41230] dark:text-[#ff6b6b]">
				{$t('play_page.pin_game_code')}
			</p>
			<button
				type="button"
				class="font-mono mt-4 select-all text-[clamp(3rem,12vw,5.5rem)] font-black tracking-[0.2em] text-[#C41230] transition hover:opacity-90"
				onclick={() => copyText(game_pin, 'pin')}
				title={$t('play_page.copy_pin')}
			>
				{game_pin}
			</button>
			<button
				type="button"
				class="mt-4 rounded-lg border-2 border-[#C41230] bg-transparent px-5 py-2 text-sm font-bold text-[#C41230] transition hover:bg-[#C41230] hover:text-white dark:border-[#ff6b6b] dark:text-[#ff6b6b] dark:hover:bg-[#ff6b6b] dark:hover:text-[#1A1A1B]"
				onclick={() => copyText(game_pin, 'pin')}
			>
				{copied_pin ? $t('play_page.copied_clipboard') : $t('play_page.copy_pin')}
			</button>

			<div class="mt-10 w-full border-t border-black/10 pt-8 dark:border-white/15">
				<p class="text-center text-xs font-semibold uppercase tracking-wide opacity-70">
					{$t('play_page.join_step_visit')}
				</p>
				<p class="mx-auto mt-2 break-all text-center font-mono text-sm font-medium opacity-90 md:text-base">
					{playUrl || '/play'}
				</p>
				<button
					type="button"
					disabled={!playUrl}
					class="mx-auto mt-4 block rounded-lg bg-[#1A1A1B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-black disabled:opacity-40 dark:bg-neutral-700 dark:hover:bg-neutral-600"
					onclick={() => copyText(playUrl, 'link')}
				>
					{copied_link ? $t('play_page.copied_clipboard') : $t('play_page.copy_invite_link')}
				</button>
			</div>
		</section>

		<section
			class="flex flex-col items-center rounded-2xl border border-black/10 bg-neutral-50 p-6 shadow-inner lg:p-8 dark:border-neutral-600 dark:bg-[#252526]"
		>
			<img
				onclick={() => (fullscreen_open = true)}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') fullscreen_open = true;
				}}
				role="button"
				tabindex="0"
				alt="Katılım için QR kod"
				src="/api/v1/utils/qr/{game_pin}"
				class="aspect-square w-[min(100%,260px)] cursor-pointer rounded-xl bg-white p-4 shadow-xl transition hover:ring-4 hover:ring-[#C41230]/30"
			/>
			<p class="mt-4 text-center text-sm opacity-70">QR’ye tıklayarak büyütün</p>
		</section>
	</div>

	<section
		class="rounded-xl border border-black/10 bg-white px-6 py-5 dark:border-neutral-600 dark:bg-[#2d2d30]"
	>
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div>
				{#if game_state.players.length <= 1}
					<h2 class="text-xl font-bold md:text-2xl">
						{$t('play_page.players_waiting', {
							count: game_state.players.length ?? 0
						})}
					</h2>
				{:else}
					<h2 class="text-xl font-bold md:text-2xl">
						{$t('play_page.players_waiting_plural', {
							count: game_state.players.length ?? 0
						})}
					</h2>
				{/if}
				<p class="mt-1 text-sm opacity-70">Oyuncunun üzerine tıklayıp odadan çıkarabilirsiniz</p>
			</div>
			{#if cqc_code}
				<div class="flex flex-col items-end gap-1 text-right">
					<span class="text-xs font-semibold uppercase opacity-70">
						{$t('play_page.join_by_entering_code')}
					</span>
					<ControllerCodeDisplay code={cqc_code} />
				</div>
			{/if}
		</div>
		<div class="mt-5 flex min-h-[3rem] flex-wrap gap-2">
			{#if game_state.players.length > 0}
				{#each game_state.players as player}
					<button
						type="button"
						class="rounded-full border border-[#C41230]/25 bg-[#C41230]/10 px-4 py-2 text-sm font-semibold tracking-tight text-[#1A1A1B] hover:bg-[#C41230]/20 dark:bg-white/10 dark:text-neutral-100"
						onclick={() => {
							socket_game_controls.kick_player(player.username, game_state.players);
						}}
					>
						{player.username}
					</button>
				{/each}
			{:else}
				<p class="text-sm italic opacity-55">Oyuncular katılınca burada listelenir.</p>
			{/if}
		</div>
	</section>

	<div class="flex justify-center pt-2 pb-8">
		<button
			type="button"
			disabled={game_state.players.length < 1}
			class="w-full max-w-xl rounded-xl bg-emerald-600 px-10 py-5 text-xl font-black text-white shadow-[0_8px_0_rgb(21,128,61)] transition enabled:hover:bg-emerald-500 enabled:active:translate-y-1 enabled:active:shadow-[0_4px_0_rgb(21,128,61)] disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:opacity-65 disabled:shadow-none sm:text-2xl"
			onclick={() => {
				socket_game_controls.start_game();
			}}
		>
			{$t('admin_page.start_game')}
		</button>
	</div>
	{#if game_state.players.length < 1}
		<p class="text-center text-sm text-amber-800 dark:text-amber-200">
			{$t('play_page.start_needs_players')}
		</p>
	{/if}
</div>

{#if fullscreen_open}
	<button
		type="button"
		class="fixed top-0 left-0 z-50 flex size-full cursor-default items-center justify-center bg-black/70 p-4"
		transition:fade|global={{ duration: 80 }}
		onclick={() => (fullscreen_open = false)}
		aria-label="QR iletişim kutusunu kapat"
	>
		<img
			alt="QR kod tam ekran"
			src="/api/v1/utils/qr/{game_pin}"
			class="max-h-[min(90vh,90vw)] w-auto max-w-full rounded-xl bg-white p-6 shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		/>
	</button>
{/if}
