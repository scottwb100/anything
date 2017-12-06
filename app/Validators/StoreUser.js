'use strict'

class StoreUser {
  get rules () {
    return {
      username: 'required|unique:users',
      password: 'required',
      email: 'required|unique:users|email'
    }
  }
}
module.exports = StoreUser
