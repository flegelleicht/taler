# taler

## Setup

* ruby 2.5.1
* sinatra 2.0.4
* sequel 5.13.0

## Installation

		$ rbenv local 2.5.1
		$ bundle install --path vendor/bundle
		$ bundle exec sequel -m db/migrations sqlite://db/database
		$ bundle exec sequel sqlite://db/database
		$ DEFAULT_USER_NAME='user' DEFAULT_USER_PASS='pass' \
		bundle exec ruby scripts/make_default_data.rb
		$ ./start.sh
