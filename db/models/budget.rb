require 'date'

class Budget < Sequel::Model
  many_to_one :user
  one_to_many :entries
  
  MONTHLY = "monthly"
  
  def before_create
    self.created = Time.now
    self.modified = self.created
  end
  
  def before_update
    self.modified = Time.now
  end
  
  def start_of_month(time)
    Date.civil(time.year, time.month, 1).to_time
  end
  
  def end_of_month(time)
    Date.civil(time.year, time.month + 1, 1).to_time
  end
  
  def start_of_day(time)
    time.to_date.to_time
  end
  
  def end_of_day(time)
    (time.to_date + 1).to_time
  end
  
  def statistics_in_interval(start_time, now, end_time)
    entries_in_interval = self.entries.select{ |e| 
      e.at >= start_time && e.at < now
    }
    spent_total = entries_in_interval.reduce(0){|sum, e| sum + e.amount}
    puts "==> entries_in_interval: #{entries_in_interval.count}"
    puts "==> spent_total: #{spent_total}"

    entries_in_day = entries_in_interval.select{ |e|
      e.at >= start_of_day(end_time) && e.at < now
    }
    spent_on_day = entries_in_day.reduce(0){|sum, e| sum + e.amount}
    
    remaining_total = self.amount - spent_total
    
    # FIXME: Depends on MONTHLY and does not work for others yet
    remaining_days = (end_of_month(now).to_date - now.to_date).to_i
    
    remaining_on_day = 
      (self.amount - spent_total + spent_on_day) / remaining_days - spent_on_day
  
    remaining_daily_afterwards = 
      (self.amount - spent_total) / (remaining_days - 1)
    
    # FIXME: Depends on MONTHLY and does not work for others yet
    result = {
      spentTotal: spent_total,
      spentToday: spent_on_day,
      remainingTotal: remaining_total,
      remainingToday: remaining_on_day,
      remainingTomorrow: remaining_daily_afterwards
    }
    pp result
    result
  end
  
  def statistics
    if self.type == MONTHLY
      now = Time.now
      return statistics_in_interval(start_of_month(now), now, end_of_month(now))
    end
  end
  
  def to_api
    s = self.statistics
    {
      id: self.id,
      created: self.created,
      name: self.name,
      type: self.type,
      start: self.start,
      end: self.end,
      currency: self.currency,
      amount: self.amount,
      entries: self.entries.map{|e| e.to_api},
      spentTotal: s[:spentTotal],
      spentToday: s[:spentToday],
      remainingTotal: s[:remainingTotal],
      remainingToday: s[:remainingToday],
      remainingTomorrow: s[:remainingTomorrow]
    }
  end
end
