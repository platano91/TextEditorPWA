import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open a connection to the database
  const db = await openDB('jate', 1);

  // Open a transaction, specify the store and data privileges
  const tx = db.transaction('jate', 'readwrite');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method to update or add new content to the store
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request
  const result = await request;
  console.log('🚀 Data saved to the database', result);
};

// logic that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open a connection to the database
  const db = await openDB('jate', 1);

  // Open a transaction, specify the store
  const tx = db.transaction('jate', 'readonly');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use the .get() method to fetch data from the store
  const request = store.get(1); // Assuming 1 is the key you're using for your content

  // Get confirmation of the request
  const result = await request;
  console.log('🚀 Data fetched from the database', result);

  // Return the fetched data
  return result?.value;
};


initdb();
