#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)
#
# SPDX-License-Identifier: MPL-2.0
set -euo pipefail
cd "$(dirname "$0")/.."

PUBLIC_HTTP_PORT="${PUBLIC_HTTP_PORT:-8080}"

mkdir -p uploads .docker-state
if [[ ! -f .docker-state/secret_key ]]; then
	if ! command -v openssl >/dev/null 2>&1; then
		echo "Hata: kalici JWT anahtari icin 'openssl' gerekli." >&2
		exit 1
	fi
	openssl rand -hex 48 >.docker-state/secret_key
	chmod 600 .docker-state/secret_key || true
fi
export SECRET_KEY="${SECRET_KEY:-$(cat .docker-state/secret_key)}"

if [[ -z "${ROOT_ADDRESS:-}" ]]; then
	pick=""
	# Prefer first non-loopback IPv4 from hostname -I (typical VPS / LAN IP).
	while read -r ip; do
		[[ "$ip" == 127.* ]] && continue
		[[ "$ip" == ::1 ]] && continue
		[[ "$ip" == fe80:* ]] && continue
		[[ "$ip" == "" ]] && continue
		pick="$ip"
		break
	done < <(hostname -I 2>/dev/null | tr ' ' '\n')

	root_suffix=""
	if [[ "${PUBLIC_HTTP_PORT}" != "80" ]]; then
		root_suffix=":${PUBLIC_HTTP_PORT}"
	fi
	if [[ -n "$pick" ]]; then
		export ROOT_ADDRESS="http://${pick}${root_suffix}"
	else
		export ROOT_ADDRESS="http://127.0.0.1${root_suffix}"
	fi
fi

docker compose build --parallel
docker compose up -d

echo ""
echo "ClassQuiz ayakta."
echo "  Adres (ROOT_ADDRESS): ${ROOT_ADDRESS}"
echo "  Dis HTTP port (proxy): ${PUBLIC_HTTP_PORT}"
echo ""
echo "Farklı port / adres:"
echo "  PUBLIC_HTTP_PORT=80 ROOT_ADDRESS=http://ALAN_ADI ./docker/run.sh"
echo "  (Port 80 icin genelde ROOT_ADDRESS'de :80 yazmayin.)"
echo ""
