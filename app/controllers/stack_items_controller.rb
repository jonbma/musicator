class StackItemsController < ApplicationController
	
	def create
		@sub = Submission.find(params[:stack_item][:sub_id].to_s)
		@sub.stack_items.create(comment: params[:stack_item][:comment],
                            author_id: params[:stack_item][:author_id])
		redirect_to @sub
	end


	def new
    @sub = Submission.find(params[:submission_id])
		@comment = @sub.stack_items.build()
	end
end
