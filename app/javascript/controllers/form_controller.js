import Rails from "@rails/ujs";
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "successMessage", "errorMessage"]
  static classes = ["change"]

  submit(event) {
    event.preventDefault();

    if (this.inputTarget.checkValidity()) {
      this.toggle(false);
      this.success('');

      // get blockchain data
      this.getHashData(this.inputTarget.value);
    } else {
      this.toggle(true);
      this.error('Please, verify your entry. Only permitted letters and numbers');
    }
  }

  toggle(action){
    action
      ? this.inputTarget.classList.add(this.changeClass)
      : this.inputTarget.classList.remove(this.changeClass)
  }

  error(msg) {
    this.errorMessageTarget.textContent = msg;
    this.successMessageTarget.textContent = "";
  }

  success(msg) {
    this.successMessageTarget.textContent = msg;
    this.errorMessageTarget.textContent = "";
  }

  getHashData(block_hash) {
    fetch(
      `https://blockchain.info/rawblock/${block_hash}`,
    )
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.message)
      } else {
        this.success('');
        this.postData(data);
      }
    })
    .catch(err => {
      this.error(err.message);
    });
  }

  postData({
    hash,
    ver,
    prev_block,
    mrkl_root,
    time,
    bits,
    nonce,
    n_tx,
    size,
    block_index,
    main_chain,
    height
  }) {

    Rails.ajax({
      type: 'POST',
      url: this.data.get('url'),
      beforeSend: (xhr, options) => {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        options.data = JSON.stringify({
          block_hash: hash,
          ver: ver,
          prev_block: prev_block,
          mrkl_root: mrkl_root,
          time: time,
          bits: bits,
          nonce: nonce,
          n_tx: n_tx,
          size: size,
          block_index: block_index,
          main_chain: main_chain,
          height: height,
        })

        return true
      },
      success: ({message}) => {
        this.inputTarget.value = ''
        this.success(message)
      },
      error: ({message}) => {
        this.error(message)
      }
    })
  }
}
