class SubmissionsController < ApplicationController

	def show
		@sub = Submission.find(params[:id].to_s)
	end

	def new
		@sub = Submission.new
	end

	def create
		@reviewer = User.where(first_name: "#{params[:submission][:reviewer_tokens]}").first
		@sub = Submission.create!(name: params[:submission][:name], author_id: current_user.id, reviewer_id: @reviewer.id)

		redirect_to @sub
	end
	
end