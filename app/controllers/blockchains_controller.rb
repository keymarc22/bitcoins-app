class BlockchainsController < ApplicationController
  include Pagy::Backend
  before_action :find_block, only: :destroy

  def index
    @pagy, @blockchains = pagy_countless(Blockchain.all)

    render "scrollable_list" if params[:page]
  end

  def create
    @blockchain = Blockchain.new(blockchain_params)

    respond_to do |format|
      if @blockchain.save
        format.json { render status: :ok, json: { message: "Blockchain was successfully created." } }
        format.turbo_stream
      else
        format.json { render status: :unprocessable_entity, json: { message: @blockchain.errors.full_messages.join(',') } }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @blockchain.destroy
        format.json { render status: :ok, json: { message: "Blockchain was successfully destroyed." } }
        format.turbo_stream
      else
        format.json { render status: :unprocessable_entity, json: { message: @blockchain.errors.full_messages.join(',') } }
      end
    end
  end

  private
    def blockchain_params
      params.require(:blockchain).permit(
        :block_hash,
        :ver,
        :prev_block,
        :mrkl_root,
        :time,
        :bits,
        :nonce,
        :n_tx,
        :size,
        :block_index,
        :main_chain,
        :height,
      )
    end

    def find_block
      @blockchain = Blockchain.find(params[:id])
    end
end
