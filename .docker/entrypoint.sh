#!/bin/sh

if [ ! -f ".env" ]; then
   cp .env_example .env
fi

yarn

yarn start:dev