class Api::V1::PlayersController < ApplicationController

   def create
      @player = Player.find_or_create_by(name: params[:name])
      render json: @player
   end

   private 

   # def player_params
   #    params.require(:player).permit(:name)
   # end
   
end
