class RecordingsController < ApplicationController

	def new
	end

	def upload
		@sub = Submission.find(params[:submission_id])
		@sub.set(:audio, 1)
		File.open('public/' + @sub.id.to_s + '.wav', 'wb') do |f| 
			f.write(request.raw_post) 
		end
		redirect_to root_path
	end
end