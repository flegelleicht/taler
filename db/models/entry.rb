class Entry < Sequel::Model
  many_to_one :budgets
  
  EXPENSE = "expense"
  INCOME = "income"
  TRANSFER = "transfer"
  
  def before_create
    self.created = Time.now
    self.modified = self.created
  end
  
  def before_update
    self.modified = Time.now
  end
end
