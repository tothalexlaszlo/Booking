#!/usr/bin/env bash
ghz --proto=booking.proto \
 --call=booking.GrpcBookingService.GetActiveBookingsByUser \
 --skipTLS \
 --async \
 --concurrency=1 \
 --total=10000 \
 --data='{ "userId": 1548477993 }' \
0.0.0.0:5001

$SHELL
