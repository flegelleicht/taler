class Entry < Sequel::Model
  many_to_one :budget
  
  EXPENSE = "expense"
  INCOME = "income"
  TRANSFER = "transfer"
  
  def before_create
    self.created = Time.now
    self.modified = self.created
    if self.at == nil
      self.at = Time.now
    end
  end
  
  def before_update
    self.modified = Time.now
  end

  def to_api
    {
      id: self.id,
      created: self.created.utc.iso8601,
      modified: self.modified.utc.iso8601,
      at: if self.at then self.at.utc.iso8601 else nil end,
      type: self.type,
      amount: self.amount,
      note: self.note
    }
  end
end
