class SubmissionsController < ApplicationController

	def show
		@sub = Submission.find(params[:id].to_s)
	end

	def new
		@sub = Submission.new
	end

	def create
		@sub = Submission.create!(name: params[:submission][:name], author_id: current_user.id)
		redirect_to @sub
	end

  def update_annotations
    @sub = Submission.find(params[:submission][:submission_id])
    @sub.set(:annotations, params[:submission][:annotations])
    render :nothing => true, :status => :ok
  end

end
