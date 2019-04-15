class Api::V1::GamesController < ApplicationController
  # before_action :find_game, only: [:update]
    def index
      @games = Game.all
      render json: @games
    end

    def create
      byebug
    @game = Game.create(game_params)
    render json: @game

    end    
      #once a game ends (collision detected), create game instance with user_id + timer score
      #this logic should find or create user_id


      # @game.update(note_params)
      # if @game.save
      #   render json: @note, status: :accepted
      # else
      #   render json: { errors: @note.errors.full_messages }, status: :unprocessible_entity
      # end
    
    private

    def game_params
      params.permit(:user_id, :timer)
    end
    #
    # def find_game
    #   @game = Game.find(params[:id])
    # end
  end
