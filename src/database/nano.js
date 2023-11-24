import path, { resolve } from 'path'
import { fileURLToPath } from 'url';

import { config } from 'dotenv'
import nano from 'nano'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = resolve(__dirname, '../../.env');
config({ path: envPath });

const host = process.env.COUCHDB_HOST
const protocol = process.env.COUCHDB_PROTOCOL
const user = process.env.COUCHDB_USER
const pass = process.env.COUCHDB_PASS
const port = process.env.COUCHDB_PORT
const connectionString = `${protocol}://${user}:${pass}@${host}:${port}`
const CouchDB = nano(connectionString)

export default CouchDB