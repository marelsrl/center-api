/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
console.log("setting up central api server...")

const nano = require('nano')({
    url: 'http://super:314159@localhost:5984', // Replace username and password with your credentials
    parseUrl: false // Prevents nano from parsing the authentication details from the URL
  });

// Function to create databases and views
async function setupCouchDB() {
    try {
      // Use nano.db.use to get a reference to the 'users' database
      const users2DB = nano.db.use('users2');
  
      // Check if the 'users2' database exists, create it if not
      try {
        await nano.db.get('users2');
      } catch (error) {
        if (error.statusCode === 404) {
          await nano.db.create('users2');
        } else {
          throw error;
        }
      }
  
      // Define and save view for 'users2' database
      await users2DB.insert({
        _id: '_design/users2',
        updates: {
            create: create.toString(),
            update: update.toString(),
            delete: deleteDoc.toString()
          },
        views: {
          all: {
            map: function(doc) {
              emit(doc._id, doc);
            }.toString()
          }
        }
      }, '_design/users2'); // Use the document ID '_design/users' to update existing design document
  
      // Use nano.db.use to get a reference to the 'prices2' database
      const prices2DB = nano.db.use('prices2');
  
      // Check if the 'prices2' database exists, create it if not
      try {
        await nano.db.get('prices2');
      } catch (error) {
        if (error.statusCode === 404) {
          await nano.db.create('prices2');
        } else {
          throw error;
        }
      }
  
      // Define and save view for 'prices2' database
      await prices2DB.insert({
        _id: '_design/prices2',
        views: {
          all: {
            map: function(doc) {
              emit(doc._id, doc);
            }.toString()
          }
        }
      }, '_design/prices2'); // Use the document ID '_design/prices2' to update existing design document
  
      console.log('CouchDB setup completed successfully.');
    } catch (error) {
      console.error('Error setting up CouchDB:', error);
    }
  }
  
  // Run the setup function
  setupCouchDB();


  // Create handler
const create = (doc, req)=> {
    var newDoc = JSON.parse(req.body);
    var id = req.id || newDoc._id;
  
    if (!id) {
      return [null, { "error": "Missing document ID" }];
    }
  
    try {
      var newRev = newDoc._rev ? newDoc._rev : null;
      var savedDoc = doc || {};
      savedDoc._id = id;
      savedDoc._rev = newRev;
      for (var prop in newDoc) {
        savedDoc[prop] = newDoc[prop];
      }
      return [savedDoc, { "json": savedDoc }];
    } catch (error) {
      return [null, { "error": "Failed to create document", "reason": error }];
    }
  }
  
  // Update handler
  const update = (doc, req) => {
    var updatedDoc = JSON.parse(req.body);
    var id = req.id || updatedDoc._id;
  
    if (!doc || !id) {
      return [null, { "error": "Document not found" }];
    }
  
    try {
      var newRev = updatedDoc._rev ? updatedDoc._rev : null;
      doc._rev = newRev;
      for (var prop in updatedDoc) {
        doc[prop] = updatedDoc[prop];
      }
      return [doc, { "json": doc }];
    } catch (error) {
      return [null, { "error": "Failed to update document", "reason": error }];
    }
  }
  
  // Delete handler
  const deleteDoc = (doc, req)=> {
    if (!doc) {
      return [null, { "error": "Document not found" }];
    }
  
    try {
      return [{ _id: doc._id, _deleted: true }, { "json": { "ok": true } }];
    } catch (error) {
      return [null, { "error": "Failed to delete document", "reason": error }];
    }
  }