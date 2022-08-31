import Rails from "@rails/ujs";
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "successMessage", "errorMessage"]
  static classes = ["change"]

  submit(event) {
    event.preventDefault();

    if (this.inputTarget.checkValidity()) {
      this.toggle(false);
      this.actionFailedMessage('');

      // get blockchain data
      this.getHashData(this.inputTarget.value);
    } else {
      this.toggle(true);
      this.actionFailedMessage('Please, verify your entry. Only permitted letters and numbers');
    }
  }

  toggle(action){
    action
      ? this.inputTarget.classList.add(this.changeClass)
      : this.inputTarget.classList.remove(this.changeClass)
  }

  actionSuccessfulMessage(msg) {
    this.successMessageTarget.textContent = msg;
  }

  actionFailedMessage(msg) {
    this.errorMessageTarget.textContent = msg
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
        this.actionFailedMessage('');
        this.postData(data);
      }
    })
    .catch(err => {
      this.actionSuccessfulMessage('');
      this.actionFailedMessage(err.message)
    });
  }

  postData(data) {
    var blockchain = {
      blockchain: data
    }

    Rails.ajax({
      type: 'POST',
      dataType: 'json',
      url: this.data.get('url'),
      data: blockchain,
      beforeSend(xhr, options) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        // Workaround: add options.data late to avoid Content-Type header to already being set in stone
        // https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts/rails-ujs/utils/ajax.coffee#L53
        options.data = JSON.stringify(blockchain)
        return true
      },
      success: () => {
        this.inputTarget.value = ''
      }
    })
  }
}
