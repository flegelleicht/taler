Sequel.migration do
  up do
    create_table(:entries) do
      primary_key :id
      foreign_key :budget_id, :budgets
      DateTime :created
      DateTime :modified
      
      String :type # expense, income, transfer
      Integer :amount # in smallest denomination
      DateTime :at
      String :note
    end
  end
  
  down do
    drop_table(:entries)
  end
end
      