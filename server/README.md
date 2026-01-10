## MongoDB index and username fix

If you see `E11000 duplicate key error ... username: null` during registration, there are likely legacy documents or a legacy index causing uniqueness collisions on `username`.

Steps to inspect and fix:

1. Ensure you have `MONGO_URI` in `server/.env`:

```env
MONGO_URI="your-mongodb-uri"
```

2. Dry-run the script to inspect indexes and problematic users:

```bash
cd server
npm run fix-indexes
```

3. To drop legacy `username_1` index and remove users with null/empty `userName`:

```bash
# drop legacy index only
node scripts/fix-user-index.js --drop-username-index

# drop index and delete users with missing/null/empty userName
node scripts/fix-user-index.js --drop-username-index --remove-null-users
```

Notes:
- The script will create a partial unique index on `userName` so that null/missing values won't conflict.
- Prefer to back up your database before removing documents.
