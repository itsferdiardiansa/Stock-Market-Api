#!/usr/bin/env sh

rm -rf node_modules pnpm-lock.yaml &&
pnpm store prune &&
pnpm install