require 'sinatra/base'
require 'sequel'
require 'json'
require 'jwt'
require_relative './lib/jwt_auth'

class Server < Sinatra::Base
  configure :development do
    require 'sinatra/reloader'
    register Sinatra::Reloader
  end
  
  configure do
    set :port, 4567
    set :bind, "0.0.0.0"
    set :server, :thin
    
    set :db, Sequel.sqlite('db/database')
    require_relative './db/models/user'
		require_relative './db/models/budget'
		require_relative './db/models/entry'
    
    # Create route condition, filtering on http method
    set(:method) do |method|
      method = method.to_s.upcase
      condition { request.request_method == method}
    end
  end
  
  use JWTAuth
  
  before '/api/v1/*', :method => :post do
    begin
      request.body.rewind
      @rawJsonBody = request.body.read
      @jsonBody = JSON.parse @rawJsonBody
    rescue JSON::ParserError
      halt 400, "Malformed JSON"
    end
  end
  
  before /.*\.js/ do
    content_type :javascript
  end
  
  before '*' do
    headers "Access-Control-Allow-Origin"   => "http://localhost:3000"
  end
  
  def make_token(user)
    JWT.encode(make_payload(user), ENV['JWT_SECRET'], 'HS256')
  end
  
  def make_payload(user)
    {
      exp: Time.now.to_i + 60 * 60 * 24,
      iat: Time.now.to_i,
      iss: ENV['JWT_ISSUER'],
      user: {
        id: user.id
      }
    }
  end

  options '*' do
    headers "Allow" => "GET, POST, OPTIONS"
    headers "Access-Control-Allow-Headers"  => "access-control-allow-origin, authorization"
    headers "Access-Control-Allow-Origin"   => "http://localhost:3000"
    headers "Access-Control-Allow-Methods"  => "all"
    halt 200
  end

  post '/api/v1/public/login' do
    login = @jsonBody['user']
    passw = @jsonBody['pass']

    user = User.find(login: login)

    if user and user.authenticate?(passw)
      content_type :json
      { token: make_token(user), user: user.to_api }.to_json
    else
      halt 401
    end
  end

  get '/api/v1/private/budgets' do
    user_id = request.env[:user]['id']
    user = User.find(id: user_id)
    if user
      content_type :json
      {budgets: user.budgets.map{|b| b.to_api}}.to_json
    else
      halt 400
    end
  end
  
  get '/api/v1/private/budgets/:id' do
    begin
      user_id = request.env[:user]['id']
      user = User.find(id: user_id)
      budget_id = params['id'].to_i
      budget = user.budgets.find{|b| b.id == budget_id}
      
      content_type :json
      {budget: budget.to_api}.to_json
    rescue StandardError => e
      halt 400, {message: "Error during processing: #{e}"}.to_json
    end
  end
  
  get '/api/v1/private/budgets/:id/entries' do
    begin
      user_id = request.env[:user]['id']
      user = User.find(id: user_id)
      budget_id = params['id'].to_i
      budget = user.budgets.find{|b| b.id == budget_id}
    
      content_type :json
      {entries: budget.entries.map{|e| e.to_api}}.to_json
    rescue
      halt 400
    end
  end
    
  get '/api/v1/private' do
    user_id = request.env[:user]['id']
    user = User.find(id: user_id)
    if user
      [200, {message: "Hello #{user.name}!"}.to_json]
    else
      # Something has hooribly gone wrong if an unknown user
      # has a valid token
    end
  end
end
