# taler

## Setup

* ruby 2.5.1

## Installation

		$ rbenv local 2.5.1
		$ bundle install --path vendor/bundle
		$ bundle exec sequel -m db/migrations sqlite://db/database
		$ bundle exec sequel sqlite://db/database
		 > require_relative './db/models/user'
		 > require_relative './db/models/budget'
		 > require_relative './db/models/entry'
			
