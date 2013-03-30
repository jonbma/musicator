class SubmissionsController < ApplicationController

	def show
		@sub = Submission.find(params[:id].to_s)
	end

	def new
		@sub = Submission.new
	end

	def create
		render :text => params

	end
	
end