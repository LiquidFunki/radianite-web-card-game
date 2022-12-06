const conn = require("../db/db");

module.exports = class Card {
  constructor(id, name, description, type, power_points, price, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.power_points = power_points;
    this.price = price;
    this.status = status;
  }

  static async getAll() {
    const query_str = `SELECT * FROM card`;
    const result = await conn.promise().query(query_str);
    if (result[0].length) {
      return result[0];
    } else {
      return null;
    }
  }
};
