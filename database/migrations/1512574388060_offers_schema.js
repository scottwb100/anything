'use strict'

const Schema = use('Schema')

class OffersSchema extends Schema {
  up () {
    this.create('offers', (table) => {
      table.increments()
      table.string('name', 50).notNullable().unique()
      table.double('price', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('offers')
  }
}

module.exports = OffersSchema
