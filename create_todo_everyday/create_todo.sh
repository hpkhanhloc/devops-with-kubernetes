#!/bin/bash
source .env

todo=$(curl 'https://en.wikipedia.org/wiki/Special:Random' -si | grep 'location:' | sed 's/^.*: //')
echo "new todo:"$todo

PGPASSWORD="$POSTGRES_PASSWORD" psql -t -A \
-h "$POSTGRES_HOST" \
-p "$POSTGRES_PORT" \
-d "$POSTGRES_DATABASE" \
-U "$POSTGRES_USERNAME" \
-c "INSERT INTO todos (to_do) VALUES ($todo)"
