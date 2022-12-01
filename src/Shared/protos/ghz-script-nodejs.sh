#!/usr/bin/env bash
ghz --proto=booking.proto \
 --call=booking.GrpcBookingService.GetActiveBookingsByUser \
 --insecure \
 --async \
 --concurrency=100 \
 --total=10000 \
 --data='{ "userId": 1548477993 }' \
0.0.0.0:3000

$SHELL
