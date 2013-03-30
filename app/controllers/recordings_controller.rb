class RecordingsController < ApplicationController
	
	def new
    File.open('internal_tools/recorded_song.wav', 'wb') do |f| 
      f.write(request.raw_post) 
    end

	end
end