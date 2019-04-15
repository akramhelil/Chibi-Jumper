class Api::V1::GamesController < ApplicationController
  # before_action :find_game, only: [:update]
    def index
      @games = Game.all
      render json: @games
    end

    def create

      #once a game ends (collision detected), create game instance with user_id + timer score
      #this logic should find or create user_id


      # @game.update(note_params)
      # if @game.save
      #   render json: @note, status: :accepted
      # else
      #   render json: { errors: @note.errors.full_messages }, status: :unprocessible_entity
      # end
    end

    # def create_or_find_player
    #   Player.find || Player.create
    # end
    #
    private

    def game_params
      params.permit(:title, :content)
    end
    #
    # def find_game
    #   @game = Game.find(params[:id])
    # end
  end
