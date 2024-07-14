#!/bin/sh

echo "Apply database migrations"

npx prisma generate
npx prisma db push

npx ts-node prisma/seeds/user.seed.ts
npx ts-node prisma/seeds/image.seed.ts

exec "$@"