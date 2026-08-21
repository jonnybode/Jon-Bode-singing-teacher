# Tracking test plan

- Open Rhythm Pizza in a fresh session and confirm the visit counter increases once.
- Press Play twice in the same session and confirm the play counter increases only once.
- Open with `?utm_source=facebook` and confirm the source category resolves to facebook.
- Open with `?utm_source=teacherspayteachers` and confirm the source category resolves to tpt.
- Confirm country lookup stores only the two-letter country code in aggregate counter names.
- Confirm no IP address, name, email address, city, or exact location is stored.
- Confirm the last-play event code can be decoded using `TRACKING.md`.