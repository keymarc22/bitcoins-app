class BlockchainsController < ApplicationController
  include Pagy::Backend
  before_action :find_block, only: :destroy

  def index
    @blockchain = Blockchain.new
    # @pagy, @blockchains = pagy(Blockchain.all)
    @blockchains = Blockchain.all
  end

  def create
    @blockchain = Blockchain.create(blockchain_params)

    respond_to do |format|
      format.turbo_stream
    end
  end

  def destroy
    @blockchain.destroy

    respond_to do |format|
      # format.html { redirect_to blockchains_url, notice: "Blockchain was successfully destroyed." }
      format.turbo_stream
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
      ).merge(block_hash: params[:blockchain][:hash])
    end

    def find_block
      @blockchain = Blockchain.find(params[:id])
    end
end
