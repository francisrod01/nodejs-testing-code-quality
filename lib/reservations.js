const _ = require('lodash');
const db = require('sqlite');
const debug = require('debug')('nadia:lib:reservations');

/**
 * Get all reservations.
 *
 * @return {Promise} Result of SQL execution.
 */
function getAll() {
  return db.all('SELECT * FROM Reservation');
}

/**
 * Create a reservation; performs validation.
 *
 * @param  {Reservation} reservation A reservation request.
 * @return {Promise<number>} Reservation ID.
 */
function create(reservation) {
  return new Promise((resolve, reject) => {
    validate(reservation)
      .then(module.exports.save)
      .then(statement => resolve(statement.stmt.lastID))
      .catch(error => reject(error));
  });
}

/**
 * Save a reservation to the database.
 *
 * @param  {Reservation} reservation A reservation request.
 * @return {Promise<Statement>} Result of SQL execution.
 */
function save(reservation) {
  const sql = 'INSERT INTO RESERVATION (datetime, party, name, email, phone, message) ' +
    'VALUES (?, ?, ?, ?, ?, ?) ';
  const values = [
    reservation.datetime,
    reservation.party,
    reservation.name,
    reservation.email,
    reservation.phone,
    reservation.message,
  ];

  debug(`Saving ${values}`);

  return db.run(sql, values);
}

/**
 * Validate a reservation.
 *
 * @param  {Reservation} reservation A reservation request.
 * @return {Promise<Reservation>} Normalized result.
 */
function validate(reservation) {
  debug(`Validating ${JSON.stringify(reservation)}`);

  return new Promise((resolve, reject) => {
    reservation.validator((error, value) => {
      if (_.isNull(error)) {
        return resolve(value);
      }
      return reject(error);
    });
  });
}

module.exports = {
  create,
  getAll,
  save,
  validate
}
