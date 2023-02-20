# Northcoders House of Games API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Creating necessary environment variables

In order to connect to the databases locally, create the following enironment variables in the project's root folder:

1. Create a file with the name '.env.test'. Add the following code:

```
PGDADATABASE = nc_games_test
```

2. Create a file with the name '.env.development'. Add the following code:

```
PGDADATABASE = nc_games
```

3. Make sure the files are included in '.gitignore' using

```
.env*
```