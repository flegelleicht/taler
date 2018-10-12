#!/usr/bin/env bash
JWT_SECRET=huiH9I6k3B8WfCQO1QzFNw JWT_ISSUER=net.taler bundle exec rackup -s thin -p 4567 -o 0.0.0.0
