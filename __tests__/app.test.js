const request = require('supertest');
const seed = require('../db/seeds/seed');
const app = require('../app');
const connection = require('../db/connection');
const data = require('../db/data/test-data/index');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

describe('app', () => {
  describe('404 Errors', () => {
    test('404: GET should return error message when given route that does not exist', () => {
      return request(app)
        .get(`/api/notAPath`)
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Not Found');
        });
    });
  });
  describe('GET /api/categories', () => {
    test('200: GET should return an array of categories objects', () => {
      return request(app)
        .get(`/api/categories`)
        .expect(200)
        .then(({body}) => {
          expect(body.categories).toHaveLength(4);
          body.categories.forEach((category) => {
            expect(category).toHaveProperty('slug', expect.any(String));
            expect(category).toHaveProperty('description', expect.any(String));
          });
        });
    });
  });
  describe.only('GET /api/reviews', () => {
    test('200: GET should return an array of review objects', () => {
      return request(app)
        .get(`/api/reviews`)
        .expect(200)
        .then(({body}) => {
          expect(body.reviews).toHaveLength(13);
          expect(Array.isArray(body.reviews)).toBe(true);
          body.reviews.forEach((review) => {
            expect(review).toHaveProperty('owner', expect.any(String));
            expect(review).toHaveProperty('title', expect.any(String));
            expect(review).toHaveProperty('review_id', expect.any(Number));
            expect(review).toHaveProperty('category', expect.any(String));
            expect(review).toHaveProperty('review_img_url', expect.any(String));
            expect(review).toHaveProperty('created_at', expect.any(String));
            expect(review).toHaveProperty('votes', expect.any(Number));
            expect(review).toHaveProperty('designer', expect.any(String));
            expect(review).toHaveProperty('comment_count', expect.any(Number));
          });
        });
    });
    describe('GET /api/reviews?category=category (queries)', () => {
      test('200: should respond with an array of review objects when queried with a valid category when only one game with that category has been reviewed', () => {
        return request(app)
          .get('/api/reviews?category=dexterity')
          .expect(200)
          .then(({body}) => {
            expect(body.reviews).toHaveLength(1);
            expect(Array.isArray(body.reviews)).toBe(true);
            expect(body.reviews[0].owner).toBe('philippaclaire9');
            expect(body.reviews[0].title).toBe('Jenga');
            expect(body.reviews[0].review_id).toBe(2);
            expect(body.reviews[0].category).toBe('dexterity');
            expect(body.reviews[0].review_img_url).toBe(
              'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700'
            );
            expect(body.reviews[0].votes).toBe(5);
            expect(body.reviews[0].designer).toBe('Leslie Scott');
            expect(body.reviews[0].comment_count).toBe(3);
            expect(body.reviews[0]).toHaveProperty(
              'created_at',
              expect.any(String)
            );
          });
      });
      test('200: should respond with an array of review objects when queried with a valid category when multiple games of that category have been reviewed', () => {
        return request(app)
          .get('/api/reviews?category=social deduction')
          .expect(200)
          .then(({body}) => {
            expect(body.reviews).toHaveLength(11);
            expect(Array.isArray(body.reviews)).toBe(true);
            body.reviews.forEach((review) => {
              expect(review).toHaveProperty('owner', expect.any(String));
              expect(review).toHaveProperty('title', expect.any(String));
              expect(review).toHaveProperty('review_id', expect.any(Number));
              expect(review).toHaveProperty('category', expect.any(String));
              expect(review).toHaveProperty(
                'review_img_url',
                expect.any(String)
              );
              expect(review).toHaveProperty('created_at', expect.any(String));
              expect(review).toHaveProperty('votes', expect.any(Number));
              expect(review).toHaveProperty('designer', expect.any(String));
              expect(review).toHaveProperty(
                'comment_count',
                expect.any(Number)
              );
            });
          });
      });

      test('200: should respond with an empty array when category is valid but no games of the category have been reviewed', () => {
        return request(app)
          .get("/api/reviews?category=children's games")
          .expect(200)
          .then(({body}) => {
            expect(body.reviews).toHaveLength(0);
          });
      });
      test('404 should respond with an error when queried with a valid but non existent category', () => {
        return request(app)
          .get('/api/reviews?category=strategy')
          .expect(404)
          .then(({body}) => {
            expect(body.msg).toBe('Not Found');
          });
      });
    });
  });

  describe('GET /api/reviews/:review_id', () => {
    test('200: GET should return a review object when passed a review_id', () => {
      return request(app)
        .get(`/api/reviews/2`)
        .expect(200)
        .then(({body}) => {
          expect(body.review).toHaveProperty('review_id', expect.any(Number));
          expect(body.review).toHaveProperty('title', expect.any(String));
          expect(body.review).toHaveProperty('review_body', expect.any(String));
          expect(body.review).toHaveProperty('designer', expect.any(String));
          expect(body.review).toHaveProperty(
            'review_img_url',
            expect.any(String)
          );
          expect(body.review).toHaveProperty('votes', expect.any(Number));
          expect(body.review).toHaveProperty('category', expect.any(String));
          expect(body.review).toHaveProperty('owner', expect.any(String));
          expect(body.review).toHaveProperty('created_at', expect.any(String));
        });
    });
    test('400: GET should return an error message when queried with an invalid review_id ', () => {
      return request(app)
        .get('/api/reviews/notanid')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    test('404: GET should return an error message when queried with a valid but non existent review_id ', () => {
      return request(app)
        .get('/api/reviews/50')
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Not Found');
        });
    });
  });
  describe('GET /api/reviews/:review_id/comments', () => {
    test('200: GET should return an array of comment objects when passed a valid review_id', () => {
      return request(app)
        .get(`/api/reviews/2/comments`)
        .expect(200)
        .then(({body}) => {
          expect(Array.isArray(body.comments)).toBe(true);
          expect(body.comments).toHaveLength(3);
          body.comments.forEach((comment) => {
            expect(comment).toHaveProperty('comment_id', expect.any(Number));
            expect(comment).toHaveProperty('votes', expect.any(Number));
            expect(comment).toHaveProperty('created_at', expect.any(String));
            expect(comment).toHaveProperty('author', expect.any(String));
            expect(comment).toHaveProperty('body', expect.any(String));
            expect(comment.review_id).toBe(2);
          });
        });
    });
    test('200: GET should return an empty comments array when passed a valid review_id that has no comments', () => {
      return request(app)
        .get('/api/reviews/5/comments')
        .expect(200)
        .then(({body}) => {
          expect(Array.isArray(body.comments)).toBe(true);
          expect(body.comments).toHaveLength(0);
        });
    });

    test('400: GET should return an error message when queried with an invalid review_id', () => {
      return request(app)
        .get('/api/reviews/notanid/comments')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    test('404: GET should return an error message when queried with a valid but non existent review_id', () => {
      return request(app)
        .get('/api/reviews/50/comments')
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Not Found');
        });
    });
  });
  describe('POST /api/reviews/:review_id/comments', () => {
    test('201: should return the posted comment when given a review_id and request body', () => {
      const requestBody = {
        username: 'philippaclaire9',
        body: 'Bad game',
      };
      return request(app)
        .post('/api/reviews/5/comments')
        .send(requestBody)
        .expect(201)
        .then(({body}) => {
          expect(body.comment.author).toBe('philippaclaire9');
          expect(body.comment.body).toBe('Bad game');
          expect(body.comment.review_id).toBe(5);
          expect(body.comment).toHaveProperty('comment_id', expect.any(Number));
          expect(body.comment).toHaveProperty('votes', expect.any(Number));
          expect(body.comment).toHaveProperty('created_at', expect.any(String));
        });
    });
    test('400: should return an error when field is missing an entry', () => {
      const requestBody = {
        body: 'Bad game',
      };
      return request(app)
        .post('/api/reviews/10/comments')
        .send(requestBody)
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    test('400: POST should return an error message when passed an invalid review_id', () => {
      return request(app)
        .post('/api/reviews/notanid/comments')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    test('400: POST should return an error message when passed a non-existent username', () => {
      const requestBody = {
        username: 'tom',
        body: 'Bad game',
      };
      return request(app)
        .post('/api/reviews/6/comments')
        .send(requestBody)
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Not Found');
        });
    });
    test('404: POST should return an error message when passed a valid but non existent review_id', () => {
      const requestBody = {
        username: 'tom',
        body: 'Bad game',
      };
      return request(app)
        .post('/api/reviews/50/comments')
        .send(requestBody)
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Not Found');
        });
    });
  });

  describe('PATCH /api/reviews/:review_id', () => {
    test('200: should return updated review when passed a request body and review_id. Should increment vote when passed a positive number.', () => {
      const requestBody = {
        inc_votes: 1,
      };
      return request(app)
        .patch('/api/reviews/1')
        .send(requestBody)
        .expect(200)
        .then(({body}) => {
          expect(body.review.title).toBe('Agricola');
          expect(body.review.designer).toBe('Uwe Rosenberg');
          expect(body.review.owner).toBe('mallionaire');
          expect(body.review.review_img_url).toBe(
            'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700'
          );
          expect(body.review.review_body).toBe('Farmyard fun!');
          expect(body.review.category).toBe('euro game');
          expect(body.review.votes).toBe(2);
          expect(body.review.review_id).toBe(1);
          expect(body.review).toHaveProperty('created_at', expect.any(String));
        });
    });
    test('200: should return updated review when passed a request body and review_id. Should decrement vote when passed a negative number.', () => {
      const requestBody = {
        inc_votes: -3,
      };
      return request(app)
        .patch('/api/reviews/4')
        .send(requestBody)
        .expect(200)
        .then(({body}) => {
          expect(body.review.title).toBe('Dolor reprehenderit');
          expect(body.review.designer).toBe('Gamey McGameface');
          expect(body.review.owner).toBe('mallionaire');
          expect(body.review.review_img_url).toBe(
            'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?w=700&h=700'
          );
          expect(body.review.review_body).toBe(
            'Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod'
          );
          expect(body.review.category).toBe('social deduction');
          expect(body.review.votes).toBe(4);
          expect(body.review.review_id).toBe(4);
          expect(body.review).toHaveProperty('created_at', expect.any(String));
        });
    });
    test('400: should return an error when field is missing an entry', () => {
      const requestBody = {};
      return request(app)
        .patch('/api/reviews/8')
        .send(requestBody)
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    test('400: should return an error message when passed an invalid review_id', () => {
      return request(app)
        .patch('/api/reviews/notanid')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    test('400: should return an error message when passed invalid entry data type', () => {
      const requestBody = {
        inc_votes: 'invalid entry data type',
      };
      return request(app)
        .patch('/api/reviews/6')
        .send(requestBody)
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    test('404: should return an error message when passed a valid but non existent review_id', () => {
      const requestBody = {
        inc_votes: 1,
      };
      return request(app)
        .patch('/api/reviews/60')
        .send(requestBody)
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Not Found');
        });
    });
  });
});
