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
  
  def to_api
    {
      id: self.id,
      created: self.created,
      name: self.name,
      type: self.type,
      start: self.start,
      end: self.end,
      currency: self.currency,
      amount: self.amount
    }
  end
end
