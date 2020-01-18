
// Data service operations

// Setup
const mongoose = require('mongoose');

// Load the schemas
const personSchema = require('./schema.js');

module.exports = function (mongoDBConnectionString) {

  let Person; // defined on connection to the new db instance

  return {

    connect: function () {
      return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(mongoDBConnectionString);

        db.on('error', (err) => {
          reject(err);
        });

        db.once('open', () => {
          Person = db.model("person", personSchema, "person");
          resolve();
        });
      });
    },

    //Get All
    personGetAll: function () {
      return new Promise(function (resolve, reject) {
        Person.find()
          .sort({lastName: 'asc', firstName: 'asc'})
          .exec()
          .then((persons) => {
            // Found, a collection will be returned
            resolve(persons);
          })
          .catch((err) => {
            reject(err);
          });
          
      })
    },

    //Get One
    personGetById: function (personId) {
      return new Promise(function (resolve, reject) {

        Person.findById(personId)
          .exec()
          .then((person) => {
            // Found, one object will be returned
            resolve(person);
          })
          .catch((err) => {
            // Find/match is not found
            reject(err);
          });
      })
    },


    personAdd: function (newItem) {
      return new Promise(function (resolve, reject) {

        Person.create(newItem, (error, item) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(item);
        });
      })
    },


    //Update existing
    personEditExisting: function(personId, body){
      return new Promise(function (resolve, reject) {

        let person = body;
          //How to filter so that we would be able to update only some properties
      Person.updateOne( {_id:personId},

        {$set:{firstName: person.firstName,
          lastName: person.lastName,
          birthDate: person.birthDate,
          email: person.email,
          creditScore: person.creditScore,
          rating: person.rating}},
          {multi: false}
          )
      .exec()
      .then(() => {
        // Found, one object will be returned
        console.log("Success Update.");
        resolve();
      })
      .catch((err) => {
        // Find/match is not found
        console.log("Update Failed.");
        console.log(err);
        reject();
      });

   })
  },

  personDelete: function (itemId) {
    return new Promise(function (resolve, reject) {

      Person.findByIdAndRemove(itemId, (error) => {
        if (error) {
          // Cannot delete item
          return reject(error.message);
        }
        // Return success, but don't leak info
        return resolve();
      })
    })
  }


  }
}
