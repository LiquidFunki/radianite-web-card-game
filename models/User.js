const conn = require("../db/db");

module.exports = class User {
  constructor(login, password, description = "", avatar = "default.png") {
    this.id = 0;
    this.login = login;
    this.password = password;
    this.description = description;
    this.avatar = avatar;
    this.win_counter = 0;
    this.lose_counter = 0;
    this.draw_counter = 0;
    // this.status = status;
  }

  async isExist(login) {
    const query_str = `SELECT * FROM user WHERE login='${login}'`; 
    const result = await conn.promise().query(query_str);
    return result[0].length > 0;
  }

  async findBy(property, value) {
    const query_str = `SELECT * FROM user WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.login = result[0][0]["login"];
      this.password = result[0][0]["password"];
      this.description = result[0][0]["description"];
      this.avatar = result[0][0]["avatar"];
      this.win_counter = result[0][0]["win_counter"];;
      this.lose_counter = result[0][0]["lose_counter"];;
      this.draw_counter = result[0][0]["draw_counter"];;
      return this; 
    } else {
      return null;
    }
  }

  async save() {
    if (await this.isExist(this.login)) {
      const query_str = `UPDATE user SET description='${this.description}', avatar='${this.avatar}', win_counter='${this.win_counter}', lose_counter='${this.lose_counter}', draw_counter='${this.draw_counter}' WHERE login='${this.login}'`;
      await conn.promise().query(query_str);
    } else {
      const query_str = `INSERT INTO user(login, password, description, avatar, win_counter, lose_counter, draw_counter) VALUES('${this.login}', '${this.password}', '${this.description}', '${this.avatar}', '${this.win_counter}', '${this.lose_counter}', '${this.draw_counter}')`;
      await conn.promise().query(query_str);
    }
  }
};
