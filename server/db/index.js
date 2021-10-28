const { Pool } = require("pg");

const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGDATABASE,
  PGPORT,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

const isProduction = NODE_ENV === "production";

const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

let pool = null;

if (isProduction) {
  pool = new Pool({
    connectionString: isProduction ? DATABASE_URL : connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    // user: PGUSER,
    // host: PGHOST,
    // database: PGDATABASE,
    // port: PGPORT,
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};
