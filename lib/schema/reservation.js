const moment = require('moment');
const Joi = require('joi');

module.exports = class Reservation {
  /**
   * Create a reservation booking request.
   *
   * @param {number} party Number of people in a party.
   * @param {string} name Contact name.
   * @param {string} email Contact email.
   * @param {string} date Date in "YYYY/MM/DD" format.
   * @param {string} time Time in "H:mm A" format.
   * @param {string} [phone] Contact phone.
   * @param {string} [message] Additional details.
   */
  constructor({ party, name, email, date, time, phone, message }) {
    this.party = party;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.datetime = Reservation.combineDateTime(date, time);
  }

  /**
   * Combine a date and time into an ISO 8601 standard date and time.
   *
   * @example
   * // returns '2017-06-10T06:02:00.000Z'
   * Reservation.combineDateTime('2017/06/10', '06:02 AM')
   *
   * @param {string} date YYYY/MM/DD format
   * @param {string} time H:mm A format
   * @return {string} ISO 8601 standard date and time.
   */
  static combineDateTime(date, time) {
    return moment.utc(`${date} ${time}`, 'YYYY/MM/DD hh:mm A').toISOString();
  }

  /**
   * Execute validator on self.
   *
   * @param {function} callback A synchronous callback with error, value args.
   * @return {void}
   */
  validator(callback) {
    const schema = Joi.object().keys({
      datetime: Joi.date().iso().required().raw(),
      party: Joi.number().min(1).max(7).required(),
      name: Joi.string().max(255).required(),
      email: Joi.string().max(255).required(),
      phone: Joi.string().max(50).allow(''),
      message: Joi.string().max(1000).allow(''),
    });

    Joi.validate(this, schema, {
      abortEarly: false,
      stripUnknown: true
    }, callback);
  }
}
