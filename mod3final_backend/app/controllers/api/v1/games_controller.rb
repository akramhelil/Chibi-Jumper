class Api::V1::GamesController < ApplicationController
  # before_action :find_game, only: [:update]
    def index
      @games = Game.all
      render json: @games
    end

    def create
      @game = Game.create(game_params)
      render json: @game
    end    
    private

    def game_params
      params.permit(:player_id, :timer)
    end
    #
    # def find_game
    #   @game = Game.find(params[:id])
    # end
  end
