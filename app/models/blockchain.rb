class Blockchain < ApplicationRecord

  validates :hash, :prev_block, :bits, :block_index, :time, presence: true

  after_create_commit { broadcast_prepend_to "blockchains" }
  after_destroy_commit { broadcast_remove_to "blockchains"}
end
