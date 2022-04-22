#!/bin/ash
cp /var/pgconfigs/* /var/lib/postgresql/data
psql -U postgres --command 'SELECT pg_reload_conf();'