module.exports = {
  "development": {
    "username": "postgresa",
    "password": "root",
    "database": "lpk_dev",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": "postgres",
    "password": "root",
    "database": "lpk_test",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "root",
    "database": "lpk_prod",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }
}
