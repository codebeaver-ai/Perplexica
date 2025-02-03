import { getAvailableChatModelProviders, getAvailableEmbeddingModelProviders } from '../lib/providers';
import { handleConnection } from './connectionManager';
import { handleMessage } from './messageHandler';

describe('handleConnection', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  /**
   * Test that when the providers return empty objects (i.e., invalid LLM or embeddings),
   * the connection sends an error message and closes the websocket.
   */
  test('should send error and close websocket when invalid models are selected', async () => {
    // Mock providers to return empty objects (invalid configuration)
    jest.spyOn(require('../lib/providers'), 'getAvailableChatModelProviders').mockResolvedValue({});
    jest.spyOn(require('../lib/providers'), 'getAvailableEmbeddingModelProviders').mockResolvedValue({});

    // Create a fake websocket object with necessary methods and properties.
    const ws: any = {
      send: jest.fn(),
      close: jest.fn(),
      on: jest.fn(),
      readyState: 1,
      OPEN: 1,
    };

    // Create a dummy request; parameters don't matter since providers are empty.
    const request: any = {
      url: '/?chatModelProvider=nonexistent',
      headers: { host: 'localhost' },
    };

    await handleConnection(ws, request);

    // Verify that an error message was sent and the connection closed.
    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'error',
        data: 'Invalid LLM or embeddings model selected, please refresh the page and try again.',
        key: 'INVALID_MODEL_SELECTED',
      })
    );
    expect(ws.close).toHaveBeenCalled();
  });

  /**
   * Test that a valid connection correctly picks up the default providers, sends an initial
   * "signal" message on open state, registers message event listeners, and calls handleMessage.
   */
  test('should handle a valid connection and process incoming messages', async () => {
    // Use fake timers for setInterval control.
    jest.useFakeTimers();

    // Spy on handleMessage so we can assert it gets called.
    const handleMessageSpy = jest.spyOn(require('./messageHandler'), 'handleMessage')
      .mockResolvedValue(undefined);

    // Create dummy valid providers.
    const chatProviders = {
      provider1: {
        modelA: { model: 'fakeLLM' },
      },
    };
    const embeddingProviders = {
      embProvider1: {
        embA: { model: 'fakeEmbeddings' },
      },
    };

    // Override provider functions to return the dummy providers.
    jest.spyOn(require('../lib/providers'), 'getAvailableChatModelProviders').mockResolvedValue(chatProviders);
    jest.spyOn(require('../lib/providers'), 'getAvailableEmbeddingModelProviders').mockResolvedValue(embeddingProviders);

    // Create a fake websocket that stores event handlers.
    const ws: any = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: 1,
      OPEN: 1,
      _events: {} as Record<string, Function>,
      on(event: string, callback: Function) {
        this._events[event] = callback;
      },
    };

    // Create a dummy request with parameters so that valid models are selected.
    const request: any = {
      url: '/?chatModelProvider=provider1&chatModel=modelA&embeddingModelProvider=embProvider1&embeddingModel=embA',
      headers: { host: 'localhost' },
    };

    // Call handleConnection (asynchronously).
    const connectionPromise = handleConnection(ws, request);

    // Fast forward timer to trigger the setInterval callback.
    jest.advanceTimersByTime(10);

    // Wait for connection to finish initial setup.
    await connectionPromise;

    // Check that a "signal" message is sent.
    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'signal',
        data: 'open',
      })
    );

    // Simulate an incoming message event.
    const testMessage = 'test message';
    await ws._events['message'](testMessage);

    // Verify that handleMessage is called with expected parameters.
    expect(handleMessageSpy).toHaveBeenCalledWith(testMessage, ws, 'fakeLLM', 'fakeEmbeddings');
  });
});