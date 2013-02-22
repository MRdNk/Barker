Barker
======

A very simple logging Web Service API: for logging errors / exceptions


Config.json
-----------

A config.json is required in order to set the database details

```node

{
  "db": {
      "host": "hostName"
    , "port": 5432
    , "user": "username"
    , "password": "password"
    , "database": "barker"
  }
}
