Sequel.migration do
  up do 
    create_table(:budgets) do
      primary_key :id
      foreign_key :user_id, :users
      DateTime :created
      DateTime :modified
      FalseClass :deleted, default: false
      
      String :name
      String :type # weekly, monthly, yearly, onetime, custom
      Date :start
      Date :end
      String :currency # enum EUR, USD, etc.
      Integer :amount # in smallest denomination
    end
  end
  
  down do
    drop_table(:budgets)
  end
end
