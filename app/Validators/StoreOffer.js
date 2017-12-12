'use strict'

class StoreOffer {
  get rules () {
    return {
      name: 'required',
      price: 'required',
    }
  }
}

module.exports = StoreOffer
