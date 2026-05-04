// SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)
//
// SPDX-License-Identifier: MPL-2.0

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_GOOGLE_AUTH_ENABLED?: string;
	readonly VITE_GITHUB_AUTH_ENABLED?: string;
	readonly VITE_CAPTCHA_ENABLED?: string;
	readonly VITE_CUSTOM_OAUTH_NAME?: string;
	readonly VITE_REGISTRATION_DISABLED?: string;
	/** When not set to `'false'`, hides login/register and shows a minimal home flow. */
	readonly VITE_ANONYMOUS_MODE?: string;
	readonly VITE_HCAPTCHA?: string;
	readonly VITE_RECAPTCHA?: string;
	readonly VITE_SENTRY?: string;
	readonly VITE_PLAUSIBLE_DATA_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
