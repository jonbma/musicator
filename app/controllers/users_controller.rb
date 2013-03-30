class UsersController < ApplicationController

	def show
	end

	def reviewers
		@users = User.where("first_name" => /.*#{params[:q]}.*/i)
		respond_to do |format|
			format.html { redirect_to root_path }
			format.json { render :json => @users }
		end
					
	end
	

	
end