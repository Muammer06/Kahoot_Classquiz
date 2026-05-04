// SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)
//
// SPDX-License-Identifier: MPL-2.0

/** Host/live lobby relies on `/admin`; do not blanket-redirect away from it (breaks quiz start). */

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const game_token = url.searchParams.get('token') ?? '';
	const game_pin = url.searchParams.get('pin') ?? '';
	const auto_connect = url.searchParams.get('connect') === '1';
	return {
		auto_connect,
		game_token,
		game_pin,
		has_host_params: Boolean(game_token && game_pin)
	};
};
