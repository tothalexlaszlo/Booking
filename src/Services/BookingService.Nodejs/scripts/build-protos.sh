#!/usr/bin/env bash
npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:./proto \
    --ts_out=generate_package_definition:./proto \
    --grpc_out=grpc_js:./proto \
    -I ../../Shared/protos \
    ../../Shared/protos/booking.proto

$SHELL
