class SubmissionsController < ApplicationController

	def show
		@sub = Submission.find(params[:id].to_s)
	end
	
end