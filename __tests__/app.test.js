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
  describe('GET /api/reviews', () => {
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
});
