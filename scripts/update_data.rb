require 'sequel'
Sequel.sqlite('db/database')

require_relative '../db/models/user'
require_relative '../db/models/budget'
require_relative '../db/models/entry'

user = User.find(login: 'flgl')

budget = Budget.create do |b|
  b.name = "Spiele"
  b.type = Budget::MONTHLY
  b.start = Date.today - Date.today.mday + 1 # start of current month
  b.end = nil
  b.currency = "EUR"
  b.amount = 10000
end

entry = Entry.create do |e|
  e.type = Entry::EXPENSE
  e.amount = 1999
  e.at = DateTime.now
  e.note = "Switch"
end
budget.add_entry(entry)

entry = Entry.create do |e|
  e.type = Entry::EXPENSE
  e.amount = 1295
  e.at = DateTime.now
  e.note = "PS4"
end
budget.add_entry(entry)

user.add_budget(budget)
