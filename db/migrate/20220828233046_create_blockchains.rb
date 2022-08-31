class CreateBlockchains < ActiveRecord::Migration[7.0]
  def change
    create_table :blockchains do |t|
      t.string :block_hash, index: true, unique: true
      t.string :ver
      t.string :prev_block
      t.string :mrkl_root
      t.string :time
      t.string :bits
      t.string :nonce
      t.string :n_tx
      t.string :size
      t.string :block_index
      t.boolean :main_chain
      t.string :height

      t.timestamps
    end
  end
end
