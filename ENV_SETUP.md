# Environment Setup Guide

## PostgreSQL Connection Error Fix

If you're seeing `prisma:error Error in PostgreSQL connection: Error { kind: Closed, cause: None }`, follow these steps:

## 1. Check Your .env File

Your `.env` file should contain a valid `DATABASE_URL`. Here are the correct formats:

### For Local PostgreSQL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

### For Neon (Serverless):
```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

### For Supabase:
```env
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?pgbouncer=true"
```

## 2. Verify PostgreSQL is Running

### For Local PostgreSQL:
```bash
# Windows (check if PostgreSQL service is running)
Get-Service -Name postgresql*

# Start PostgreSQL if not running
Start-Service postgresql-x64-XX
```

### For Cloud Providers:
- Check your dashboard to ensure the database is active
- Verify connection limits haven't been exceeded

## 3. Test Database Connection

Create a test script to verify your connection:

```bash
# Test connection using psql
psql "postgresql://username:password@localhost:5432/database_name"
```

## 4. Regenerate Prisma Client

After fixing your DATABASE_URL:

```bash
# Generate Prisma Client
pnpm prisma generate

# Push schema to database (creates tables)
pnpm prisma db push

# Or run migrations
pnpm prisma migrate dev

# Seed the database (optional)
pnpm db:seed
```

## 5. Common Issues & Solutions

### Issue: Connection pool exhausted
**Solution:** Restart your dev server
```bash
# Stop the dev server (Ctrl+C)
# Then restart
pnpm dev
```

### Issue: DATABASE_URL not found
**Solution:** Ensure `.env` file exists in the root directory with DATABASE_URL defined

### Issue: SSL/TLS errors
**Solution:** Add `?sslmode=require` or `?sslmode=disable` to your connection string

### Issue: Connection timeout
**Solution:** Check firewall settings or use a different port

## 6. Using Neon (Recommended for Development)

1. Sign up at https://neon.tech (free tier available)
2. Create a new project
3. Copy the connection string
4. Add to your `.env` file:
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require"
```

## 7. Verify Setup

Run this command to check if Prisma can connect:
```bash
pnpm prisma db pull
```

If successful, you should see "Introspecting based on datasource..."

## Need Help?

If issues persist:
1. Check the full error logs in your terminal
2. Verify your database credentials
3. Ensure your database server is accessible from your machine
4. Try connecting with a database GUI tool (pgAdmin, DBeaver) to verify credentials
