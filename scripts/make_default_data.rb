if ENV['DEFAULT_USER_NAME'] == nil or ENV['DEFAULT_USER_PASS'] == nil
  puts "Please give default user credentials:"
  puts "DEFAULT_USER_NAME='user' DEFAULT_USER_PASS='pass' bundle exec ruby #{$0}"
  exit -1
end

require 'sequel'
Sequel.sqlite('db/database')

require_relative '../db/models/user'
require_relative '../db/models/budget'
require_relative '../db/models/entry'

if User.find(login: ENV['DEFAULT_USER_NAME']) == nil
  puts "Did not find default user. Creating default data..."
  user = User.create do |u|
    u.login = ENV['DEFAULT_USER_NAME']
    u.pass = ENV['DEFAULT_USER_PASS']
    u.name = "Erik Hebisch"
  end
  
  budget = Budget.create do |b|
    b.name = "Ausgaben"
    b.type = Budget::MONTHLY
    b.start = Date.today - Date.today.mday + 1 # start of current month
    b.end = nil
    b.currency = "EUR"
    b.amount = 40000
  end
  
  entry = Entry.create do |e|
    e.type = Entry::EXPENSE
    e.amount = 1000
    e.at = DateTime.now
    e.note = "Zeitschriften"
  end
  
  budget.add_entry(entry)
  user.add_budget(budget)
  puts "... done."
end
