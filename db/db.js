const mysql = require("mysql2");
const fs = require("fs");

var query_str1 = fs.readFileSync("db/card.sql").toString();
var query_str2 = fs.readFileSync("db/user.sql").toString();
var query_str3 = fs.readFileSync("db/room.sql").toString();

const query_strs = [query_str1, query_str2, query_str3]; 
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Phoenix.png', 'card deals 12 damage to the opponent', 'damage', 12, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Reyna.png', 'card deals 12 damage to the opponent1', 'damage', 12, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Raze.png', 'card deals 9 damage to the opponent1', 'damage', 9, 4, 'public');"
);
query_strs.push( 
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Raze.png', 'card deals 9 damage to the opponent2', 'damage', 9, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Sova.png', 'card deals 9 damage to the opponent', 'damage', 9, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Fade.png', 'card deals 6 damage to the opponent', 'damage', 6, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Breach.png', 'card deals 6 damage to the opponent1', 'damage', 6, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Jett.png', 'card deals 4 damage to the opponent', 'damage', 4, 2, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Jett.png', 'card deals 4 damage to the opponent1', 'damage', 4, 2, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Jett.png', 'card deals 4 damage to the opponent2', 'damage', 4, 2, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Neon.png', 'card deals 2 damage to the opponent1', 'damage', 2, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Yoru.png', 'card deals 2 damage to the opponent2', 'damage', 2, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Neon.png', 'card deals 2 damage to the opponent3', 'damage', 2, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Yoru.png', 'card deals 2 damage to the opponent4', 'damage', 2, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Neon.png', 'card deals 2 damage to the opponent5', 'damage', 2, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Yoru.png', 'card deals 2 damage to the opponent6', 'damage', 2, 1, 'public');"
);

query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Chamber.png', 'This card provides protection against 9 damage', 'defense', 9, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Killjoy.png', 'This card provides protection against 9 damage', 'defense', 9, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Sage.png', 'This card provides protection against 6 damage', 'defense', 6, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Cypher.png', 'This card provides protection against 6 damage', 'defense', 6, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Kayo.png', 'This card provides protection against 4 damage', 'defense', 4, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Viper.png', 'This card provides protection against 4 damage', 'defense', 4, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Brimstone.png', 'This card provides protection against 2 damage', 'defense', 2, 2, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Astra.png', 'This card provides protection against 1 damage', 'defense', 1, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Omen.png', 'This card provides protection against 1 damage', 'defense', 1, 1, 'public');"
); 
 
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('SageHeal.png', 'Heals player in amount of 12 hp', 'heal', 12, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('ReynaHeal.png', 'Heals player in amount of 9 hp', 'heal', 9, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('PhoenixHeal.png', 'Heals player in amount of 6 hp', 'heal', 6, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('PhoenixHeal.png', 'Heals player in amount of 6 hp1', 'heal', 6, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('SkyeHeal.png', 'Heals player in amount of 4 hp', 'heal', 4, 2, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('SkyeHeal.png', 'Heals player in amount of 4 hp1', 'heal', 4, 2, 'public');"
);

query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('ViperSmoke.png', 'with chance of 60% all damage will be ignored', 'smoke', 60, 4, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('OmenSmoke.png', 'with chance of 40% all damage will be ignored', 'smoke', 40, 3, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('BrimSmoke.png', 'with chance of 30% all damage will be ignored', 'smoke', 30, 2, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('JettSmoke.png', 'with chance of 13% all damage will be ignored', 'smoke', 13, 1, 'secret');"
);

query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, flash_chance, price, status) VALUES ('PhoenixFlash.png', '50% of damage will be returned to opponent with 60% chance1', 'flash', 50, 60, 4, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, flash_chance, price, status) VALUES ('ReynaFlash.png', '50% of damage will be returned to opponent with 60% chance', 'flash', 50, 60, 4, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, flash_chance, price, status) VALUES ('KayoFlash.png', '35% of damage will be returned to opponent with 45% chance1', 'flash', 35, 45, 3, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, flash_chance, price, status) VALUES ('BreachFlash.png', '35% of damage will be returned to opponent with 45% chance', 'flash', 35, 45, 3, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, flash_chance, price, status) VALUES ('SkyeFlash.png', '30% of damage will be returned to opponent with 20% chance', 'flash', 30, 20, 2, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, flash_chance, price, status) VALUES ('YoruFlash.png', '80% of damage will be returned to opponent with 8% chance', 'flash', 80, 8, 2, 'secret');"
);

query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('CypherUltimate.png', 'You reveal all secret spells of opponent', 'ult', 0, 5, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('PhoenixUltimate.png', 'All incoming damage + 15% will be returned to opponent', 'ult', 0, 8, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('ReynaUltimate.png', 'Heals you in amount of all incoming damage + 15%', 'ult', 0, 8, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('KayoUltimate.png', 'All active secret spells of opponent wiil be cancelled', 'ult', 0, 6, 'secret');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('RazeUltimate.png', 'Deals 20 damage to the opponent', 'ult', 20, 9, 'secret');"
);


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});
 
connection.connect(async (err) => {
  if (err) {
    console.log('\n\nCREATE "radianite" DATABASE BEFORE THE START!\nIt\'s enough to run the following command: \'node db/radianite.js\'\n\n')
    console.error(err);
    return err;
  } else {
    for (let i = 0; i < query_strs.length; i++) {
      const element = query_strs[i];
      await connection.promise().query(element);
    }
    console.log(`Connected to ${process.env.DATABASE} db ------ OK`);
  }
});

module.exports = connection;
