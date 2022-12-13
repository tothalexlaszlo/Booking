#!/usr/bin/env bash

bombardier --method=GET \
--insecure \
--timeout=20s
--requests=10000 \
--connections=100 \
http://localhost:3000/booking?userId=1548477993

$SHELL
