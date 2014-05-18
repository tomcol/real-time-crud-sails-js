/**
 * Person
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

// Person.js
var Person = {
  adapter: 'myLocalMySQLDatabase',
  attributes: {
    firstName: 'STRING',
    lastName: 'STRING',
    age: {
      type: 'INTEGER',
      max: 150,
      //required: true
    },
    birthDate: 'DATE',
    phoneNumber: {
      type: 'STRING',
      defaultsTo: '111-222-3333'
    },
    emailAddress: {
      type: 'email', // Email type will get validated by the ORM
      //required: true
    }
  }
};

module.exports = Person;
