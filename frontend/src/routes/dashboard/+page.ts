// SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)
//
// SPDX-License-Identifier: MPL-2.0

import type { PageLoad } from './$types';

function asList(body: unknown): unknown[] {
	return Array.isArray(body) ? body : [];
}

export const load = (async ({ fetch }) => {
	const [quiz_res, quiztivity_res] = await Promise.all([
		fetch('/api/v1/quiz/list?page_size=100'),
		fetch('/api/v1/quiztivity/')
	]);
	const quizzes = quiz_res.ok ? asList(await quiz_res.json()) : [];
	const quiztivities = quiztivity_res.ok ? asList(await quiztivity_res.json()) : [];
	return { quizzes, quiztivities };
}) satisfies PageLoad;
