# SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)
#
# SPDX-License-Identifier: MPL-2.0

"""Ensure a configurable guest user exists for anonymous quiz flows."""

import os
import uuid
from datetime import datetime

import asyncpg.exceptions

from classquiz.auth import get_password_hash
from classquiz.cache import clear_cache_for_account
from classquiz.config import settings
from classquiz.db.models import User, UserAuthTypes
from classquiz.helpers.avatar import gzipped_user_avatar

_settings = settings()


async def ensure_guest_user() -> User:
    existing = await User.objects.get_or_none(email=_settings.guest_email)
    if existing is not None:
        return existing

    verify_key = os.urandom(16).hex()
    user = User(
        id=uuid.uuid4(),
        email=_settings.guest_email,
        username=_settings.guest_username,
        password=get_password_hash(os.urandom(32).hex()),
        verified=True,
        verify_key=verify_key,
        created_at=datetime.now(),
        auth_type=UserAuthTypes.LOCAL,
        avatar=gzipped_user_avatar(),
        require_password=False,
    )
    try:
        await user.save()
    except asyncpg.exceptions.UniqueViolationError:
        got = await User.objects.get_or_none(email=_settings.guest_email)
        if got is None:
            raise
        return got
    await clear_cache_for_account(user)
    return user
