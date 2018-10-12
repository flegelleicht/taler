#!/usr/bin/env bash
JWT_SECRET= JWT_ISSUER= bundle exec rackup -s thin -p 4567 -o 0.0.0.0
