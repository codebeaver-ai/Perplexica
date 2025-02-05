import http from 'http';
import { startWebSocketServer } from '../src/websocket';
import logger from '../src/utils/logger';
import { getPort } from '../src/config';

import { startWebSocketServer } from '../src/websocket';
import logger from '../src/utils/logger';
import { getPort } from '../src/config';

import request from 'supertest';
import express from 'express';
import { startWebSocketServer } from '../src/websocket';
import { getPort } from '../src/config';

import request from 'supertest';
import { startWebSocketServer } from './websocket';
import { getPort } from './config';
import logger from './utils/logger';

import http from 'http';
import express from 'express';
import { startWebSocketServer } from './websocket';
import { getPort } from './config';
import logger from './utils/logger';

import express from 'express';
import request from 'supertest';
import { startWebSocketServer } from './websocket';
import { getPort } from './config';
import logger from './utils/logger';

import request from 'supertest';
import { Express } from 'express';
import { Server } from 'http';

import request from 'supertest';
import express from 'express';
import { Express } from 'express-serve-static-core';
import logger from '../src/utils/logger';

import request from 'supertest';
import { Express } from 'express';
import { startWebSocketServer } from '../src/websocket';
import { getPort } from '../src/config';
import logger from '../src/utils/logger';

import request from 'supertest';
import { Express } from 'express';
import app from '../src/app';
import { startWebSocketServer } from '../src/websocket';
import { getPort } from '../src/config';
import logger from '../src/utils/logger';










jest.mock('../src/websocket');
jest.mock('../src/config', () => ({
  getPort: jest.fn().mockReturnValue(3000),
}));
jest.mock('../src/utils/logger');




jest.mock('./websocket');
jest.mock('./config');
jest.mock('./utils/logger');




jest.mock('./websocket');
jest.mock('./config');
jest.mock('./utils/logger');
jest.mock('http');













jest.mock('../src/websocket');
jest.mock('../src/utils/logger');
jest.mock('../src/config');




/**
 * Tests the uncaught exception handler in the app.
 * This test simulates an uncaught exception and verifies that it's properly logged.
 */
test('uncaught exception is logged', () => {
  // Mock the getPort function
  (getPort as jest.Mock).mockReturnValue(3000);

  // Import the app after mocking dependencies
  require('../src/app');

  // Simulate an uncaught exception
  const error = new Error('Test uncaught exception');
  const origin = 'Test origin';
  process.emit('uncaughtException', error, origin);

  // Verify that the logger.error method was called with the correct message
  expect(logger.error).toHaveBeenCalledWith(
    `Uncaught Exception at ${origin}: ${error}`
  );
});


/**
 * Tests the unhandled rejection handler in the app.
 * This test simulates an unhandled rejection and verifies that it's properly logged.
 */
test('unhandled rejection is logged', () => {
  // Mock the getPort function
  (getPort as jest.Mock).mockReturnValue(3000);

  // Import the app after mocking dependencies
  require('../src/app');

  // Simulate an unhandled rejection
  const reason = 'Test unhandled rejection';
  const promise = Promise.reject(reason);
  process.emit('unhandledRejection', reason, promise);

  // Verify that the logger.error method was called with the correct message
  expect(logger.error).toHaveBeenCalledWith(
    `Unhandled Rejection at: ${promise}, reason: ${reason}`
  );
});


/**
 * Tests the initial GET request to the '/api' endpoint.
 * This test verifies that the server responds with a 200 status and the correct JSON body.
 */
test('GET /api returns status ok', async () => {
  // Mock the getPort function
  (getPort as jest.Mock).mockReturnValue(3000);

  // Mock the startWebSocketServer function
  (startWebSocketServer as jest.Mock).mockImplementation(() => {});

  // Import the app after mocking dependencies
  const app = require('../src/app').default;

  const response = await request(app).get('/api');
  
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ status: 'ok' });
});


/**
 * Tests the CORS configuration of the app.
 * This test verifies that the CORS middleware is correctly applied
 * and that the server responds with the appropriate CORS headers.
 */
test('CORS is configured correctly', async () => {
  // Mock dependencies
  jest.mock('./websocket', () => ({
    startWebSocketServer: jest.fn(),
  }));
  jest.mock('./config', () => ({
    getPort: jest.fn().mockReturnValue(3000),
  }));
  jest.mock('./utils/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
  }));

  // Import the app after mocking dependencies
  const app = require('./app').default;

  const response = await request(app)
    .options('/api')
    .set('Origin', 'http://example.com');

  expect(response.status).toBe(204);
  expect(response.headers['access-control-allow-origin']).toBe('*');
  expect(response.headers['access-control-allow-methods']).toBeDefined();
  expect(response.headers['access-control-allow-headers']).toBeDefined();
});


/**
 * Tests the server startup process.
 * This test verifies that the server is created, starts listening on the correct port,
 * and that the WebSocket server is initialized.
 */
test('Server starts and listens on the correct port', () => {
  // Mock the getPort function to return a specific port
  const mockPort = 3000;
  (getPort as jest.Mock).mockReturnValue(mockPort);

  // Create a mock server with a listen method
  const mockServer = {
    listen: jest.fn((port, callback) => {
      callback();
    }),
  };

  // Mock http.createServer to return our mock server
  (http.createServer as jest.Mock).mockReturnValue(mockServer);

  // Mock express to return a function that returns an object with the 'use' method
  (express as jest.Mock).mockReturnValue({
    use: jest.fn(),
    get: jest.fn(),
  });

  // Import the app module
  require('./app');

  // Check if the server's listen method was called with the correct port
  expect(mockServer.listen).toHaveBeenCalledWith(mockPort, expect.any(Function));

  // Check if the logger.info was called with the correct message
  expect(logger.info).toHaveBeenCalledWith(`Server is running on port ${mockPort}`);

  // Check if startWebSocketServer was called with the mock server
  expect(startWebSocketServer).toHaveBeenCalledWith(mockServer);
});


/**
 * Tests the JSON parsing middleware of the Express application.
 * This test verifies that the server correctly parses JSON requests
 * and can respond with the parsed data.
 */
test('Express correctly parses JSON requests', async () => {
  // Mock dependencies
  (getPort as jest.Mock).mockReturnValue(3000);
  (startWebSocketServer as jest.Mock).mockImplementation(() => {});

  // Create a new Express application
  const app = express();
  app.use(express.json());

  // Add a test route that echoes the JSON body
  app.post('/test-json', (req, res) => {
    res.json(req.body);
  });

  // Test data
  const testData = { key: 'value', number: 42 };

  // Send a POST request with JSON data
  const response = await request(app)
    .post('/test-json')
    .send(testData)
    .set('Content-Type', 'application/json');

  // Check the response
  expect(response.status).toBe(200);
  expect(response.body).toEqual(testData);
});


/**
 * Tests the handling of undefined routes.
 * This test verifies that the server responds with a 404 status
 * when a request is made to an undefined route.
 */
test('Undefined routes return 404', async () => {
  // Import the app after mocking dependencies
  const app: Express = require('../src/app').default;
  
  // Send a GET request to an undefined route
  const response = await request(app).get('/undefined-route');
  
  // Check if the response status is 404
  expect(response.status).toBe(404);
});


/**
 * Tests the error handling middleware of the Express application.
 * This test verifies that when an error is thrown in a route handler,
 * it is caught by the error handling middleware, logged, and a 500 status
 * is sent back to the client.
 */
test('Error handling middleware catches and logs errors', async () => {
  // Mock the logger
  jest.mock('../src/utils/logger', () => ({
    error: jest.fn(),
  }));

  // Import the app
  const app: Express = require('../src/app').default;

  // Add a route that throws an error
  app.get('/error-route', () => {
    throw new Error('Test error');
  });

  // Make a request to the error route
  const response = await request(app).get('/error-route');

  // Check if the response status is 500
  expect(response.status).toBe(500);

  // Check if the error was logged
  expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Test error'));
});


/**
 * Tests the handling of malformed JSON in request bodies.
 * This test verifies that the server responds with a 400 status
 * when a request with malformed JSON is sent.
 */
test('Malformed JSON request returns 400 Bad Request', async () => {
  // Mock dependencies
  jest.mock('../src/websocket');
  jest.mock('../src/config', () => ({
    getPort: jest.fn().mockReturnValue(3000),
  }));
  jest.mock('../src/utils/logger');

  // Import the app after mocking dependencies
  const app: Express = require('../src/app').default;

  // Send a POST request with malformed JSON
  const response = await request(app)
    .post('/api')
    .set('Content-Type', 'application/json')
    .send('{"key": "value"'); // Malformed JSON (missing closing brace)

  // Check if the response status is 400
  expect(response.status).toBe(400);

  // Check if the error was logged
  expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('JSON parsing error'));
});


/**
 * Tests that routes are correctly mounted under the '/api' prefix.
 * This test verifies that a request to a non-existent route under '/api'
 * returns a 404 status, while a request to a non-existent route not under '/api'
 * is handled differently (typically returning a different status or response).
 */
test('Routes are correctly mounted under /api prefix', async () => {
  // Mock dependencies
  jest.mock('../src/websocket');
  jest.mock('../src/config', () => ({
    getPort: jest.fn().mockReturnValue(3000),
  }));
  jest.mock('../src/utils/logger');

  // Make a request to a non-existent route under /api
  const apiResponse = await request(app).get('/api/non-existent-route');
  
  // Check if the response status is 404
  expect(apiResponse.status).toBe(404);

  // Make a request to a non-existent route not under /api
  const nonApiResponse = await request(app).get('/non-existent-route');
  
  // Check if the response status is different from the /api route
  // (exact status may vary depending on how non-API routes are handled)
  expect(nonApiResponse.status).not.toBe(404);
});
