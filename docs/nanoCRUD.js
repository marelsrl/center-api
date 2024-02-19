/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const nano = require('nano')({
    url: 'http://username:password@localhost:5984', // Replace username and password with your credentials
    parseUrl: false // Prevents nano from parsing the authentication details from the URL
  });
  
  // Function to create a view for a given database
  async function createView(databaseName) {
    try {
      // Use nano.db.use to get a reference to the database
      const db = nano.db.use(databaseName);
  
      // Define and save view for the database
      await db.insert({
        _id: `_design/${databaseName}`, // Use the database name to construct the design document ID
        views: {
          all: {
            map: function(doc) {
              emit(doc._id, doc);
            }.toString()
          }
        }
      }, `_design/${databaseName}`); // Use the document ID to update existing design document
  
      console.log(`View for database '${databaseName}' created successfully.`);
    } catch (error) {
      console.error(`Error creating view for database '${databaseName}':`, error);
    }
  }
  
  // Function to create databases and views
  async function setupCouchDB() {
    try {
      // Create 'startup1' database
      await nano.db.create('startup1');
  
      // Create view for 'startup1' database
      await createView('startup1');
  
      // Create 'startup2' database
      await nano.db.create('startup2');
  
      // Create view for 'startup2' database
      await createView('startup2');
  
      console.log('CouchDB setup completed successfully.');
    } catch (error) {
      console.error('Error setting up CouchDB:', error);
    }
  }
  
  // Function to insert a document into a database
  async function insertDocument(databaseName, document) {
    try {
      const db = nano.db.use(databaseName);
      const response = await db.insert(document);
      console.log(`Document inserted into '${databaseName}' with ID: ${response.id}`);
      return response;
    } catch (error) {
      console.error(`Error inserting document into '${databaseName}':`, error);
      throw error;
    }
  }
  
  // Function to retrieve a document from a database by ID
  async function getDocument(databaseName, documentId) {
    try {
      const db = nano.db.use(databaseName);
      const document = await db.get(documentId);
      console.log(`Document retrieved from '${databaseName}' with ID: ${documentId}`);
      return document;
    } catch (error) {
      console.error(`Error retrieving document from '${databaseName}' with ID: ${documentId}`, error);
      throw error;
    }
  }
  
  // Function to update a document in a database
  async function updateDocument(databaseName, documentId, updatedDocument) {
    try {
      const db = nano.db.use(databaseName);
      const response = await db.insert(updatedDocument, documentId);
      console.log(`Document updated in '${databaseName}' with ID: ${documentId}`);
      return response;
    } catch (error) {
      console.error(`Error updating document in '${databaseName}' with ID: ${documentId}`, error);
      throw error;
    }
  }
  
  // Function to delete a document from a database
  async function deleteDocument(databaseName, documentId, documentRev) {
    try {
      const db = nano.db.use(databaseName);
      const response = await db.destroy(documentId, documentRev);
      console.log(`Document deleted from '${databaseName}' with ID: ${documentId}`);
      return response;
    } catch (error) {
      console.error(`Error deleting document from '${databaseName}' with ID: ${documentId}`, error);
      throw error;
    }
  }
  
  // Run the setup function
  setupCouchDB();
  
  // Example usage:
  // Uncomment and modify the following lines to test the CRUD operations
  
  // insertDocument('startup1', { name: 'John Doe', age: 30 });
  // getDocument('startup1', 'document_id_here');
  // updateDocument('startup1', 'document_id_here', { name: 'Jane Doe', age: 35 });
  // deleteDocument('startup1', 'document_id_here', 'revision_here');
  