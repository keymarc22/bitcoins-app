class CreateBlockchains < ActiveRecord::Migration[7.0]
  def change
    create_table :blockchains do |t|
      t.string :hash
      t.string :prev_block
      t.integer :time
      t.integer :bits
      t.boolean :main_chain
      t.integer :ver
      t.string :mrkl_root
      t.integer :nonce
      t.integer :n_tx
      t.integer :size

      t.timestamps
    end
  end
end
