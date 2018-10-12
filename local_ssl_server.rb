require './server'

class LocalServer < Server
  configure do
    enable :logging
  end
  
  def self.run!
    super do |server|
      server.ssl = true
      server.ssl_options = {
        :cert_chain_file  => File.dirname(__FILE__) + "/ssl/server.crt",
        :private_key_file => File.dirname(__FILE__) + "/ssl/server.key",
        :verify_peer      => false
      }
    end
  end

  run! if __FILE__ == $0
end
