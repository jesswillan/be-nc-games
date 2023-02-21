const request = require('supertest');
const seed = require('../db/seeds/seed');
const app = require('../db/app');
const connection = require('../db/connection');
const data = require('../db/data/test-data/index');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

describe('app', () => {
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
    test('404: GET should return error message when given route that does not exist', () => {
      return request(app)
        .get(`/api/notARoute`)
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Path Not Found');
        });
    });
  });
  describe('GET /api/reviews', () => {
    test('200: GET should return an array of review objects', () => {
      return request(app)
        .get(`/api/reviews`)
        .expect(200)
        .then(({body}) => {
          expect(body.reviews).toHaveLength(13);
          expect(Array.isArray(body.reviews)).toBe(true)
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
  });
  // describe('GET /api/reviews/:review_id', () => {
  //   test('200: GET should return an array of reviews objects when passed review_id', () => {
  //     return request(app)
  //       .get(`/api/reviews?review_id=2`)
  //       .expect(200)
  //       .then(({body}) => {
  //         expect(body.reviews).toHaveLength(1);
  //         body.reviews.forEach((review) => {
  //           expect(review).toHaveProperty('review_id', expect.any(String));
  //           expect(review).toHaveProperty('title', expect.any(String));
  //           expect(review).toHaveProperty('review_body', expect.any(String));
  //           expect(review).toHaveProperty('designer', expect.any(String));
  //           expect(review).toHaveProperty('review_img_url', expect.any(String));
  //           expect(review).toHaveProperty('votes', expect.any(Number));
  //           expect(review).toHaveProperty('category', expect.any(String));
  //           expect(review).toHaveProperty('owner', expect.any(String));
  //           expect(review).toHaveProperty('created_at', expect.any(Number));
  //         });
  //       });
  //   });
    // test('404: GET should return an error message when queried with a valid but non existent review_id ', () => {
    //   return request(app)
    //     .get('/api/reviews?review_id=50')
    //     .expect(404)
    //     .then(({body}) => {
    //       expect(body.msg).toBe('review_id not found');
    //     });
    // });
    // test('400: GET should return an error message when queried with an invalid review_id', () => {
    //   return request(app)
    //   .get('api/reviews?review_id=kittens')
    //   .expect(400)
    //   .then(({body}) => {
    //     expect(body.msg).toBe('Bad Request')
    //   });
    // });
  // });
});
