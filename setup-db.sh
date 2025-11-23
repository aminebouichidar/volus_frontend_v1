#!/bin/bash

echo "🔍 Checking PostgreSQL status..."
echo ""

# Check if PostgreSQL is running
if pg_isready -q; then
    echo "✅ PostgreSQL is running"
    echo ""
    echo "📊 Attempting to push database schema..."
    npx prisma db push
else
    echo "❌ PostgreSQL is not running or not installed"
    echo ""
    echo "📝 Please start PostgreSQL first:"
    echo ""
    echo "macOS (Homebrew):"
    echo "  brew services start postgresql@14"
    echo ""
    echo "macOS (Postgres.app):"
    echo "  Open Postgres.app and click 'Start'"
    echo ""
    echo "Linux:"
    echo "  sudo systemctl start postgresql"
    echo ""
    echo "Docker:"
    echo "  docker run --name volus-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres"
fi
