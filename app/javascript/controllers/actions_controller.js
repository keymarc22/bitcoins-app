import Rails from "@rails/ujs";
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ["dropdown", "up", "down"]
  static classes = ["change", "display"]

  showData() {
    if (this.dropdownTarget.classList.contains(this.changeClass)) {
      this.toggleDown();
    } else {
      this.toggleUp();
    }
  }

  delete(e) {
    e.preventDefault()
    let dialog = document.getElementById("turbo-confirm")
    dialog.showModal()

    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'confirm') this.deleteBlock()
    }, {once: true})
  }

  deleteBlock(id) {
    Rails.ajax({
      type: 'DELETE',
      dataType: 'json',
      url: this.data.get('url')
    })
  }

  toggleDown() {
    this.dropdownTarget.classList.remove(this.changeClass)
    this.upTarget.classList.add(this.displayClass)
    this.downTarget.classList.remove(this.displayClass)
  }

  toggleUp() {
    this.dropdownTarget.classList.add(this.changeClass)
    this.downTarget.classList.add(this.displayClass)
    this.upTarget.classList.remove(this.displayClass)
  }
}