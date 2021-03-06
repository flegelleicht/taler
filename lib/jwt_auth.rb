class JWTAuth
  def initialize app
    @app = app
  end

  def decode_bearer_in_env(bearer, env)
    options = { algorithm: 'HS256', iss: ENV['JWT_ISSUER'] }
    payload, header = JWT.decode bearer, ENV['JWT_SECRET'], true, options
    env[:user] = payload['user']
  end

  def call env
    if env.fetch('REQUEST_METHOD', 'GET') != 'OPTIONS'
      begin
        if env.fetch('PATH_INFO', '') =~ /^\/api\/v1/
          # Only handle api routes
          if env.fetch('PATH_INFO', '') =~ /^\/api\/v1\/public/
            # Do nothing for public routes
          # elsif env.fetch('PATH_INFO', '') =~ /\/updatestream$/
          #   bearer = CGI.parse(env.fetch('QUERY_STRING', ''))['token'][0]
          #   decode_bearer_in_env(bearer, env)
          else
            bearer = env.fetch('HTTP_AUTHORIZATION', '').slice(7..-1)
            decode_bearer_in_env(bearer, env)
          end
        end
      
        # After succesful decoding, call app with enhanced env
        @app.call env

      rescue JWT::DecodeError
        [401, { 'Content-Type' => 'text/plain' }, ['A token must be passed.']]
      rescue JWT::ExpiredSignature
        [403, { 'Content-Type' => 'text/plain' }, ['The token has expired.']]
      rescue JWT::InvalidIssuerError
        [403, { 'Content-Type' => 'text/plain' }, ['The token does not have a valid issuer.']]
      rescue JWT::InvalidIatError
        [403, { 'Content-Type' => 'text/plain' }, ['The token does not have a valid "issued at" time.']]
      end
    else
      @app.call env
    end
  end
end
