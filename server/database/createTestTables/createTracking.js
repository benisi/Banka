import pool from '../dbConnection';

const createAccountTrackingTableQuery = `DROP TABLE IF EXISTS trackings CASCADE;
CREATE TABLE trackings (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    type CHARACTER VARYING(7) NOT NULL
  )`;
class Tracking {
  static createTable() {
    pool.query(createAccountTrackingTableQuery).then(() => {
      pool.end();
    })
      .catch((error) => {
        pool.end();
        throw new Error(error);
      });
  }
}

export default Tracking;
