Barker
======

A very simple logging Web Service API: for logging errors / exceptions

Status
------

In Development - early stages.
- Lets you log basic information to a Postgres database.
- Sends via Socket.io to main page (console.log only atm).
- Creates a UUID for each 'bark', so that both the browser and database have a unique reference.

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
  },
  "logging": {
      "filename": "./logs/barker.json"
  },
  "cookie": {
      "secret": "your secret here"
  }
}

```

To Do
-----
- Add GitHub user authentication
- Add GitHub raise ('post') an issue; based against an error sent to Bark
- View all GitHub issues against a app / project


License
-------
Copyright (c) 2013 Duncan Angus Wilkie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

