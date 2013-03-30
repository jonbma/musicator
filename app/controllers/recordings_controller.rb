class RecordingsController < ApplicationController

	def new
	end

	def upload
		File.open('internal_tools/recorded_song.wav', 'wb') do |f| 
			f.write(request.raw_post) 
		end
	end
end