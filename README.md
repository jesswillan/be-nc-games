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

## Available endpoints

1. GET list of all available categories:

```
/api/categories
```

Example response:

```
{
"categories": [
{
"slug": "strategy",
"description": "Strategy-focused board games that prioritise limited-randomness"
},
...
}

```

2. GET list of all reviews:

```
/api/reviews
```

Example response:

```
{
"reviews": [
{
"owner": "cooljmessy",
"title": "Velit tempor ullamco amet ipsum dolor voluptate.",
"review_id": 14,
"category": "hidden-roles",
"review_img_url": "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?w=700&h=700",
"created_at": "2021-02-05T11:27:26.563Z",
"votes": 3,
"designer": "Don Keigh",
"comment_count": 0
},
...
}
```

3. GET review by review_id:

```
/api/reviews/:review_id
```

Example response:

```
{
"review": {
"review_id": 1,
"title": "Culture a Love of Agriculture With Agricola",
"category": "strategy",
"designer": "Uwe Rosenberg",
"owner": "tickle122",
"review_body": "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
"review_img_url": "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
"created_at": "2021-01-18T10:00:20.514Z",
"votes": 1
}
}
```

4. GET comments by review_id:

```
/api/reviews/:review_id/comments
```

Example response:

```
{
"comments": [
{
"comment_id": 59,
"body": "Quis duis mollit ad enim deserunt.",
"review_id": 1,
"author": "jessjelly",
"votes": 3,
"created_at": "2021-03-27T19:48:58.110Z"
},
...
}
```

5. POST comment to a review:

```
/api/reviews/:review_id/comments:
```

Example request body:

```
{
username: 'philippaclaire9',
body: 'Bad game',
};
```

6. PATCH vote on a review:

```
/api/reviews/:review_id
```

7. GET list of all users

```
/api/users
```
Example response:
```
{
"users": [
{
"username": "tickle122",
"name": "Tom Tickle",
"avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
},
...
}
```
