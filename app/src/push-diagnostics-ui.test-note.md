# Push diagnostics UI

The notification settings screen loads `/api/push/diagnostics` with the current Bearer token and displays only sanitized fields: subscription count, last HTTP status, success/failure, timestamp, endpoint host, and sanitized error. It never displays VAPID private keys, subscription endpoint URLs, p256dh, auth values, or session tokens.
