'use strict'

class UserController {
    * login (request, response) {
        const email = request.input('email')
        const password = request.input('password')
        const login = yield request.auth.attempt(email, password) (1)
    
        if (login) {
          response.send('Logged In Successfully')
          return
        }
    
        response.unauthorized('Invalid credentails')
      }
}

module.exports = UserController
