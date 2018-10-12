Sequel.migration do
  up do
    create_table(:users) do
      primary_key :id
      DateTime :created
      DateTime :modified
      FalseClass :deleted, default: false
      
      String :login, unique: true
      String :passwd, null: false
      String :salt, null: false
      String :name
    end
  end
  
  down do
    drop_table(:users)
  end
end
