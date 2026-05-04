<!--
SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)

SPDX-License-Identifier: MPL-2.0
-->

<script lang="ts">
	import { QuizQuestionType } from '$lib/quiz_types';
	import { getLocalization } from '$lib/i18n';
	import { SocketGameControls } from '$lib/play/admin/socket_game_controls.ts';
	import type { GameState } from '$lib/play/admin/game_state.ts';

	interface Props {
		bg_color: string;
		socket_game_controls: SocketGameControls;
		game_token: string;
		game_state: GameState;
	}

	let { bg_color, socket_game_controls, game_token, game_state = $bindable() }: Props = $props();

	const { t } = getLocalization();

	const show_solutions = () => {
		socket_game_controls.show_solutions();
		game_state.timer_res = '0';
	};

	let progressPct = $derived.by(() => {
		const n = game_state.quiz_data?.questions?.length ?? 1;
		const cur =
			game_state.selected_question < 0 ? 0 : Math.min(game_state.selected_question + 1, n);
		return Math.round((cur / n) * 100);
	});
</script>

<div
	class="host-toolbar text-[#1A1A1B] dark:text-neutral-100"
	style={bg_color ? `background-color:${bg_color}EE` : undefined}
>
	<div class="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
		<div class="flex flex-col gap-1">
			{#if game_state.selected_question < 0}
				<p class="text-lg font-black tracking-tight sm:text-xl">
					{$t('admin_page.start_by_showing_first_question')}
				</p>
			{:else}
				<p class="text-lg font-black tabular-nums sm:text-xl">
					{$t('admin_page.host_question_label', {
						current: game_state.selected_question + 1,
						total: game_state.quiz_data.questions.length
					})}
				</p>
			{/if}
			<p class="text-xs font-medium opacity-70 sm:text-sm">
				{$t('admin_page.host_keyboard_hint')}
			</p>
		</div>
		<div class="hidden min-h-2 min-w-0 flex-1 max-w-md rounded-full bg-black/15 sm:block dark:bg-white/15">
			<div
				class="h-full rounded-full bg-[#C41230] transition-[width] duration-300"
				style="width: {progressPct}%"
			></div>
		</div>
	</div>

	<div class="flex w-full flex-wrap items-stretch justify-end gap-2 sm:w-auto sm:items-center">
		{#if game_state.selected_question + 1 === game_state.quiz_data.questions.length && ((game_state.timer_res === '0' && game_state.question_results !== null) || game_state.quiz_data?.questions?.[game_state.selected_question]?.type === QuizQuestionType.SLIDE)}
			{#if JSON.stringify(game_state.final_results) === JSON.stringify([null])}
				<button
					type="button"
					onclick={() => socket_game_controls.get_final_results()}
					class="host-toolbar-btn-indigo w-full sm:w-auto"
				>
					{$t('admin_page.get_final_results')}
				</button>
			{/if}
		{:else if game_state.timer_res === '0' || game_state.selected_question === -1}
			{#if (game_state.selected_question + 1 !== game_state.quiz_data.questions.length && game_state.question_results !== null) || game_state.selected_question === -1}
				<button
					type="button"
					onclick={() => {
						socket_game_controls.set_question_number(game_state.selected_question + 1);
					}}
					class="host-toolbar-btn-green w-full sm:w-auto"
				>
					{$t('admin_page.next_question_short', {
						question: game_state.selected_question + 2
					})}
				</button>
			{/if}
			{#if game_state.question_results === null && game_state.selected_question !== -1}
				{#if game_state.quiz_data.questions[game_state.selected_question].type === QuizQuestionType.SLIDE}
					<button
						type="button"
						onclick={() => {
							socket_game_controls.set_question_number(game_state.selected_question + 1);
						}}
						class="host-toolbar-btn-green w-full sm:w-auto"
					>
						{$t('admin_page.next_question_short', {
							question: game_state.selected_question + 2
						})}
					</button>
				{:else if game_state.quiz_data.questions[game_state.selected_question]?.hide_results === true}
					<button
						type="button"
						onclick={() => {
							socket_game_controls.get_question_results(
								game_token,
								game_state.shown_question_now
							);
							setTimeout(() => {
								socket_game_controls.set_question_number(
									game_state.selected_question + 1
								);
							}, 200);
						}}
						class="host-toolbar-btn-green w-full sm:w-auto"
					>
						{$t('admin_page.next_question_short', {
							question: game_state.selected_question + 2
						})}
					</button>
				{:else}
					<button
						type="button"
						onclick={() =>
							socket_game_controls.get_question_results(
								game_token,
								game_state.shown_question_now
							)}
						class="host-toolbar-btn-amber w-full sm:w-auto"
					>
						{$t('admin_page.show_answers_scores')}
					</button>
				{/if}
			{/if}
		{:else if game_state.selected_question !== -1}
			{#if game_state.quiz_data.questions[game_state.selected_question].type === QuizQuestionType.SLIDE}
				<button
					type="button"
					onclick={() => {
						socket_game_controls.set_question_number(game_state.selected_question + 1);
					}}
					class="host-toolbar-btn-green w-full sm:w-auto"
				>
					{$t('admin_page.next_question_short', {
						question: game_state.selected_question + 2
					})}
				</button>
			{:else}
				<button type="button" onclick={show_solutions} class="host-toolbar-btn-amber w-full sm:w-auto">
					{$t('admin_page.show_answers_scores')}
				</button>
			{/if}
		{/if}
	</div>
</div>
