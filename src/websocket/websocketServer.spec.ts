import http from 'http';
import logger from '../utils/logger';
import { WebSocketServer } from 'ws';
import { getPort } from '../config';
import { handleConnection } from './connectionManager';
import { initServer } from './websocketServer';

// Create a mock function to simulate the "on" method inside WebSocketServer.
const mockOn = jest.fn();

// Mock the 'ws' module so that anytime a new WebSocketServer is created it uses our fake implementation.
jest.mock('ws', () => ({
  WebSocketServer: jest.fn().mockImplementation((options) => ({
    on: mockOn,
    options,
  })),
}));

// Mock the logger to check if logger.info is called.
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
}));

// Mock the config so that getPort returns a predictable value.
jest.mock('../config', () => ({
  getPort: jest.fn(() => 1234),
}));

// Mock connectionManager so that we can check that the correct callback is registered.
jest.mock('./connectionManager', () => ({
  handleConnection: jest.fn(),
}));

// Docstring: This test verifies that the initServer function constructs a WebSocketServer using the provided HTTP server,
// registers the 'connection' event with the handleConnection callback, and logs the startup message including the port.
describe('initServer', () => {
  let testServer: http.Server;

  beforeEach(() => {
    // Reset all our mock calls before each test.
    jest.clearAllMocks();
    testServer = http.createServer();
  });

  test('should initialize WebSocket server, register connection event, and log startup message', () => {
    initServer(testServer);

    // Verify that a new WebSocketServer was created using the provided HTTP server.
    expect(WebSocketServer).toHaveBeenCalledWith({ server: testServer });

    // Verify that the 'connection' event was registered with the handleConnection callback.
    expect(mockOn).toHaveBeenCalledWith('connection', handleConnection);

    // Verify that the logger logged the expected startup message (using the port returned by getPort).
    expect(logger.info).toHaveBeenCalledWith('WebSocket server started on port 1234');
  });
});