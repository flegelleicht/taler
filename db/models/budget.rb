class Budget < Sequel::Model
  many_to_one :user
  one_to_many :entries
  
  def before_create
    self.created = Time.now
    self.modified = self.created
  end
  
  def before_update
    self.modified = Time.now
  end
end
