class SubmissionsController < ApplicationController

	def show
		@sub = Submission.find(params[:id].to_s)
		@comment = @sub.stack_items.new
	end
	
end