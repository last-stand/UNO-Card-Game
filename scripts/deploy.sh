npm install
npm install bootstrap
mkdir data
node scripts/initializeDB.js data/uno.db 
mkdir tests/data
cp data/uno.db tests/data/uno.db
sqlite3 tests/data/uno.db <scripts/insertData.sql 
cp tests/data/uno.db tests/data/uno.db.backup