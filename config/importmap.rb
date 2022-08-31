# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin "@hotwired/turbo-rails", to: "https://ga.jspm.io/npm:@hotwired/turbo-rails@7.1.3/app/javascript/turbo/index.js"
pin "@rails/ujs", to: "https://ga.jspm.io/npm:@rails/ujs@7.0.3/lib/assets/compiled/rails-ujs.js"
pin "@rails/actioncable/src", to: "https://ga.jspm.io/npm:@rails/actioncable@6.1.6/src/index.js"
pin "@hotwired/turbo", to: "https://ga.jspm.io/npm:@hotwired/turbo@7.1.0/dist/turbo.es2017-esm.js"
pin_all_from "app/javascript/controllers", under: "controllers"
