import { updateConfig } from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import {
  updateConfig,
  getPort,
  getSimilarityMeasure,
  getKeepAlive,
  getOpenaiApiKey,
  getGroqApiKey,
  getAnthropicApiKey,
  getGeminiApiKey,
  getSearxngApiEndpoint,
  getOllamaApiEndpoint
} from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import { getSearxngApiEndpoint } from '../src/config';
import toml from '@iarna/toml';
import fs from 'fs';

import { updateConfig, loadConfig } from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import {
  updateConfig,
  getPort,
  getSimilarityMeasure,
  getKeepAlive,
  getOpenaiApiKey,
  getGroqApiKey,
  getAnthropicApiKey,
  getGeminiApiKey,
  getSearxngApiEndpoint,
  getOllamaApiEndpoint
} from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import {
  updateConfig,
  getPort,
  getSimilarityMeasure,
  getKeepAlive,
  getOpenaiApiKey,
  getGroqApiKey,
  getAnthropicApiKey,
  getGeminiApiKey,
  getSearxngApiEndpoint,
  getOllamaApiEndpoint
} from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import { loadConfig } from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import { loadConfig } from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import { loadConfig } from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

import {
  updateConfig,
  getPort,
  getSimilarityMeasure,
  getKeepAlive,
  getOpenaiApiKey,
  getGroqApiKey,
  getAnthropicApiKey,
  getGeminiApiKey,
  getSearxngApiEndpoint,
  getOllamaApiEndpoint
} from '../src/config';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

jest.mock('fs');
jest.mock('path');
jest.mock('@iarna/toml');




jest.mock('fs');
jest.mock('path');
jest.mock('@iarna/toml');




jest.mock('fs');
jest.mock('path');
jest.mock('@iarna/toml');













jest.mock('fs');
jest.mock('path');
jest.mock('@iarna/toml');







jest.mock('fs');
jest.mock('path');
jest.mock('@iarna/toml');




jest.mock('fs');
jest.mock('path');
jest.mock('@iarna/toml');




describe('Config', () => {
  /**
   * This test checks if the updateConfig function correctly merges
   * the existing configuration with the new partial configuration,
   * and writes the result to the config file.
   */
  test('updateConfig should merge existing config with new partial config', () => {
    // Mock the existing configuration
    const mockExistingConfig = {
      GENERAL: {
        PORT: 3000,
        SIMILARITY_MEASURE: 'cosine',
        KEEP_ALIVE: 'true',
      },
      API_KEYS: {
        OPENAI: 'existing-openai-key',
        GROQ: 'existing-groq-key',
        ANTHROPIC: 'existing-anthropic-key',
        GEMINI: 'existing-gemini-key',
      },
      API_ENDPOINTS: {
        SEARXNG: 'https://existing-searxng-endpoint.com',
        OLLAMA: 'http://existing-ollama-endpoint.com',
      },
    };

    // Mock the toml.parse function to return the existing config
    (toml.parse as jest.Mock).mockReturnValue(mockExistingConfig);

    // Mock the path.join function
    (path.join as jest.Mock).mockReturnValue('/mocked/path/config.toml');

    // Prepare a partial config update
    const partialConfig = {
      GENERAL: {
        PORT: 4000,
      },
      API_KEYS: {
        OPENAI: 'new-openai-key',
      },
    };

    // Call the updateConfig function
    updateConfig(partialConfig);

    // Check if fs.writeFileSync was called with the correct arguments
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/mocked/path/config.toml',
      expect.any(String)
    );

    // Verify the content written to the file
    const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    const parsedContent = toml.parse(writtenContent);

    // Check if the config was correctly merged
    expect(parsedContent.GENERAL.PORT).toBe(4000);
    expect(parsedContent.GENERAL.SIMILARITY_MEASURE).toBe('cosine');
    expect(parsedContent.GENERAL.KEEP_ALIVE).toBe('true');
    expect(parsedContent.API_KEYS.OPENAI).toBe('new-openai-key');
    expect(parsedContent.API_KEYS.GROQ).toBe('existing-groq-key');
    expect(parsedContent.API_ENDPOINTS.SEARXNG).toBe('https://existing-searxng-endpoint.com');
  });
});


/**
 * This test checks if the updateConfig function correctly handles
 * updating an empty configuration with a new partial configuration.
 * It verifies that all config values are properly set and can be
 * retrieved using the getter functions.
 */
test('updateConfig should handle updating an empty configuration', () => {
  // Mock an empty existing configuration
  const mockEmptyConfig = {};
  (toml.parse as jest.Mock).mockReturnValue(mockEmptyConfig);

  // Mock the path.join function
  (path.join as jest.Mock).mockReturnValue('/mocked/path/config.toml');

  // Prepare a complete config update
  const newConfig = {
    GENERAL: {
      PORT: 5000,
      SIMILARITY_MEASURE: 'euclidean',
      KEEP_ALIVE: 'false',
    },
    API_KEYS: {
      OPENAI: 'new-openai-key',
      GROQ: 'new-groq-key',
      ANTHROPIC: 'new-anthropic-key',
      GEMINI: 'new-gemini-key',
    },
    API_ENDPOINTS: {
      SEARXNG: 'https://new-searxng-endpoint.com',
      OLLAMA: 'http://new-ollama-endpoint.com',
    },
  };

  // Call the updateConfig function
  updateConfig(newConfig);

  // Check if fs.writeFileSync was called with the correct arguments
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    '/mocked/path/config.toml',
    expect.any(String)
  );

  // Mock toml.parse to return the new config for subsequent getter calls
  (toml.parse as jest.Mock).mockReturnValue(newConfig);

  // Verify that all getter functions return the correct values
  expect(getPort()).toBe(5000);
  expect(getSimilarityMeasure()).toBe('euclidean');
  expect(getKeepAlive()).toBe('false');
  expect(getOpenaiApiKey()).toBe('new-openai-key');
  expect(getGroqApiKey()).toBe('new-groq-key');
  expect(getAnthropicApiKey()).toBe('new-anthropic-key');
  expect(getGeminiApiKey()).toBe('new-gemini-key');
  expect(getSearxngApiEndpoint()).toBe('https://new-searxng-endpoint.com');
  expect(getOllamaApiEndpoint()).toBe('http://new-ollama-endpoint.com');
});


/**
 * This test checks if the getSearxngApiEndpoint function correctly
 * prioritizes the SEARXNG_API_URL environment variable over the
 * value in the config file.
 */
describe('getSearxngApiEndpoint', () => {
  const mockConfig = {
    API_ENDPOINTS: {
      SEARXNG: 'https://config-searxng-endpoint.com',
    },
  };

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...process.env };  // Make a copy
    (toml.parse as jest.Mock).mockReturnValue(mockConfig);
  });

  afterEach(() => {
    delete process.env.SEARXNG_API_URL;
  });

  test('should return environment variable value when set', () => {
    process.env.SEARXNG_API_URL = 'https://env-searxng-endpoint.com';
    expect(getSearxngApiEndpoint()).toBe('https://env-searxng-endpoint.com');
  });

  test('should return config value when environment variable is not set', () => {
    expect(getSearxngApiEndpoint()).toBe('https://config-searxng-endpoint.com');
  });
});


/**
 * This test checks if the updateConfig function correctly handles
 * attempts to update non-existent keys in the configuration.
 * It verifies that existing keys are not affected and non-existent
 * keys are not added to the configuration.
 */
test('updateConfig should ignore non-existent keys', () => {
  // Mock the existing configuration
  const mockExistingConfig = {
    GENERAL: {
      PORT: 3000,
      SIMILARITY_MEASURE: 'cosine',
    },
    API_KEYS: {
      OPENAI: 'existing-openai-key',
    },
  };

  // Mock the toml.parse function to return the existing config
  (toml.parse as jest.Mock).mockReturnValue(mockExistingConfig);

  // Mock the path.join function
  (path.join as jest.Mock).mockReturnValue('/mocked/path/config.toml');

  // Prepare a partial config update with a non-existent key
  const partialConfig = {
    GENERAL: {
      PORT: 4000,
      NON_EXISTENT_KEY: 'some-value',
    },
    NON_EXISTENT_SECTION: {
      SOME_KEY: 'some-value',
    },
  };

  // Call the updateConfig function
  updateConfig(partialConfig);

  // Check if fs.writeFileSync was called with the correct arguments
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    '/mocked/path/config.toml',
    expect.any(String)
  );

  // Verify the content written to the file
  const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
  const parsedContent = toml.parse(writtenContent);

  // Check if the config was correctly updated
  expect(parsedContent.GENERAL.PORT).toBe(4000);
  expect(parsedContent.GENERAL.SIMILARITY_MEASURE).toBe('cosine');
  expect(parsedContent.API_KEYS.OPENAI).toBe('existing-openai-key');

  // Check that non-existent keys were not added
  expect(parsedContent.GENERAL.NON_EXISTENT_KEY).toBeUndefined();
  expect(parsedContent.NON_EXISTENT_SECTION).toBeUndefined();
});


/**
 * This test checks if the updateConfig function correctly handles
 * adding a new nested key that doesn't exist in the current configuration.
 * It verifies that the new key is added and can be retrieved, while
 * existing keys remain unchanged.
 */
test('updateConfig should add new nested keys to existing configuration', () => {
  // Mock the existing configuration
  const mockExistingConfig = {
    GENERAL: {
      PORT: 3000,
      SIMILARITY_MEASURE: 'cosine',
    },
    API_KEYS: {
      OPENAI: 'existing-openai-key',
    },
  };

  // Mock the toml.parse function to return the existing config
  (toml.parse as jest.Mock).mockReturnValue(mockExistingConfig);

  // Mock the path.join function
  (path.join as jest.Mock).mockReturnValue('/mocked/path/config.toml');

  // Prepare a partial config update with a new nested key
  const partialConfig = {
    GENERAL: {
      NEW_SETTING: 'new-value',
    },
    API_KEYS: {
      NEW_API_KEY: 'new-api-key-value',
    },
  };

  // Call the updateConfig function
  updateConfig(partialConfig);

  // Check if fs.writeFileSync was called with the correct arguments
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    '/mocked/path/config.toml',
    expect.any(String)
  );

  // Verify the content written to the file
  const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
  const parsedContent = toml.parse(writtenContent);

  // Check if the new nested keys were added
  expect(parsedContent.GENERAL.NEW_SETTING).toBe('new-value');
  expect(parsedContent.API_KEYS.NEW_API_KEY).toBe('new-api-key-value');

  // Check if existing keys remain unchanged
  expect(parsedContent.GENERAL.PORT).toBe(3000);
  expect(parsedContent.GENERAL.SIMILARITY_MEASURE).toBe('cosine');
  expect(parsedContent.API_KEYS.OPENAI).toBe('existing-openai-key');

  // Mock toml.parse to return the updated config for getter calls
  (toml.parse as jest.Mock).mockReturnValue(parsedContent);

  // Verify that existing getter functions still return correct values
  expect(getPort()).toBe(3000);
  expect(getSimilarityMeasure()).toBe('cosine');
  expect(getOpenaiApiKey()).toBe('existing-openai-key');

  // Note: We can't test the new nested keys with getter functions
  // as they don't exist in the original interface. This highlights
  // a potential area for improvement in the config management.
});


/**
 * This test checks if the updateConfig function correctly handles
 * updating a configuration with empty string values. It verifies
 * that empty string values do not overwrite existing non-empty values,
 * and that existing empty values remain empty.
 */
test('updateConfig should handle empty string values correctly', () => {
  // Mock the existing configuration
  const mockExistingConfig = {
    GENERAL: {
      PORT: 3000,
      SIMILARITY_MEASURE: 'cosine',
      KEEP_ALIVE: 'true',
    },
    API_KEYS: {
      OPENAI: 'existing-openai-key',
      GROQ: '',
      ANTHROPIC: 'existing-anthropic-key',
      GEMINI: 'existing-gemini-key',
    },
    API_ENDPOINTS: {
      SEARXNG: 'https://existing-searxng-endpoint.com',
      OLLAMA: 'http://existing-ollama-endpoint.com',
    },
  };

  // Mock the toml.parse function to return the existing config
  (toml.parse as jest.Mock).mockReturnValue(mockExistingConfig);

  // Mock the path.join function
  (path.join as jest.Mock).mockReturnValue('/mocked/path/config.toml');

  // Prepare a partial config update with empty string values
  const partialConfig = {
    GENERAL: {
      PORT: 4000,
      SIMILARITY_MEASURE: '',
    },
    API_KEYS: {
      OPENAI: '',
      GROQ: 'new-groq-key',
      ANTHROPIC: '',
    },
  };

  // Call the updateConfig function
  updateConfig(partialConfig);

  // Check if fs.writeFileSync was called with the correct arguments
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    '/mocked/path/config.toml',
    expect.any(String)
  );

  // Verify the content written to the file
  const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
  const parsedContent = toml.parse(writtenContent);

  // Mock toml.parse to return the updated config for getter calls
  (toml.parse as jest.Mock).mockReturnValue(parsedContent);

  // Check if the config was correctly updated
  expect(getPort()).toBe(4000);
  expect(getSimilarityMeasure()).toBe('cosine'); // Should not be overwritten by empty string
  expect(getKeepAlive()).toBe('true');
  expect(getOpenaiApiKey()).toBe('existing-openai-key'); // Should not be overwritten by empty string
  expect(getGroqApiKey()).toBe('new-groq-key');
  expect(getAnthropicApiKey()).toBe('existing-anthropic-key'); // Should not be overwritten by empty string
  expect(getGeminiApiKey()).toBe('existing-gemini-key');
  expect(getSearxngApiEndpoint()).toBe('https://existing-searxng-endpoint.com');
  expect(getOllamaApiEndpoint()).toBe('http://existing-ollama-endpoint.com');
});


/**
 * This test checks if the loadConfig function correctly handles
 * the scenario where the configuration file doesn't exist.
 * It verifies that a new configuration file is created with default values.
 */
test('loadConfig should create a new config file with default values when it doesn\'t exist', () => {
  // Mock fs.existsSync to return false, simulating that the config file doesn't exist
  (fs.existsSync as jest.Mock).mockReturnValue(false);

  // Mock fs.readFileSync to throw an error, simulating that the file can't be read
  (fs.readFileSync as jest.Mock).mockImplementation(() => {
    throw new Error('File not found');
  });

  // Mock path.join to return a fake path
  (path.join as jest.Mock).mockReturnValue('/fake/path/config.toml');

  // Mock fs.writeFileSync to capture what's being written
  const writeFileSyncMock = fs.writeFileSync as jest.Mock;
  writeFileSyncMock.mockImplementation(() => {});

  // Call loadConfig, which should create a new config file
  loadConfig();

  // Check if fs.writeFileSync was called
  expect(writeFileSyncMock).toHaveBeenCalled();

  // Get the content that was written
  const writtenContent = writeFileSyncMock.mock.calls[0][1];

  // Parse the written content
  const parsedContent = toml.parse(writtenContent);

  // Check if the default values are set correctly
  expect(parsedContent.GENERAL.PORT).toBe(3000); // Assuming 3000 is the default port
  expect(parsedContent.GENERAL.SIMILARITY_MEASURE).toBe('cosine'); // Assuming 'cosine' is the default
  expect(parsedContent.GENERAL.KEEP_ALIVE).toBe('true'); // Assuming 'true' is the default
  expect(parsedContent.API_KEYS.OPENAI).toBe('');
  expect(parsedContent.API_KEYS.GROQ).toBe('');
  expect(parsedContent.API_KEYS.ANTHROPIC).toBe('');
  expect(parsedContent.API_KEYS.GEMINI).toBe('');
  expect(parsedContent.API_ENDPOINTS.SEARXNG).toBe('');
  expect(parsedContent.API_ENDPOINTS.OLLAMA).toBe('');
});


/**
 * This test checks if the loadConfig function correctly handles
 * the scenario where the configuration file exists but is empty.
 * It verifies that default values are used when the file is empty.
 */
test('loadConfig should use default values when config file is empty', () => {
  // Mock fs.existsSync to return true, simulating that the config file exists
  (fs.existsSync as jest.Mock).mockReturnValue(true);

  // Mock fs.readFileSync to return an empty string, simulating an empty file
  (fs.readFileSync as jest.Mock).mockReturnValue('');

  // Mock path.join to return a fake path
  (path.join as jest.Mock).mockReturnValue('/fake/path/config.toml');

  // Mock toml.parse to return an empty object, simulating parsing of an empty file
  (toml.parse as jest.Mock).mockReturnValue({});

  // Call loadConfig
  const config = loadConfig();

  // Check if the default values are set correctly
  expect(config.GENERAL.PORT).toBe(3000); // Assuming 3000 is the default port
  expect(config.GENERAL.SIMILARITY_MEASURE).toBe('cosine'); // Assuming 'cosine' is the default
  expect(config.GENERAL.KEEP_ALIVE).toBe('true'); // Assuming 'true' is the default
  expect(config.API_KEYS.OPENAI).toBe('');
  expect(config.API_KEYS.GROQ).toBe('');
  expect(config.API_KEYS.ANTHROPIC).toBe('');
  expect(config.API_KEYS.GEMINI).toBe('');
  expect(config.API_ENDPOINTS.SEARXNG).toBe('');
  expect(config.API_ENDPOINTS.OLLAMA).toBe('');
});


/**
 * This test checks if the loadConfig function correctly handles
 * a scenario where the configuration file exists but is missing some keys.
 * It verifies that default values are used for missing keys while
 * existing values are preserved.
 */
test('loadConfig should use default values for missing keys and preserve existing values', () => {
  // Mock fs.existsSync to return true, simulating that the config file exists
  (fs.existsSync as jest.Mock).mockReturnValue(true);

  // Mock fs.readFileSync to return a partial configuration
  const partialConfig = `
    [GENERAL]
    PORT = 4000

    [API_KEYS]
    OPENAI = "existing-openai-key"

    [API_ENDPOINTS]
    SEARXNG = "https://existing-searxng-endpoint.com"
  `;
  (fs.readFileSync as jest.Mock).mockReturnValue(partialConfig);

  // Mock path.join to return a fake path
  (path.join as jest.Mock).mockReturnValue('/fake/path/config.toml');

  // Mock toml.parse to return the parsed partial configuration
  (toml.parse as jest.Mock).mockReturnValue({
    GENERAL: {
      PORT: 4000
    },
    API_KEYS: {
      OPENAI: "existing-openai-key"
    },
    API_ENDPOINTS: {
      SEARXNG: "https://existing-searxng-endpoint.com"
    }
  });

  // Call loadConfig
  const config = loadConfig();

  // Check if existing values are preserved
  expect(config.GENERAL.PORT).toBe(4000);
  expect(config.API_KEYS.OPENAI).toBe("existing-openai-key");
  expect(config.API_ENDPOINTS.SEARXNG).toBe("https://existing-searxng-endpoint.com");

  // Check if default values are used for missing keys
  expect(config.GENERAL.SIMILARITY_MEASURE).toBe('cosine');
  expect(config.GENERAL.KEEP_ALIVE).toBe('true');
  expect(config.API_KEYS.GROQ).toBe('');
  expect(config.API_KEYS.ANTHROPIC).toBe('');
  expect(config.API_KEYS.GEMINI).toBe('');
  expect(config.API_ENDPOINTS.OLLAMA).toBe('');
});


/**
 * This test checks if the updateConfig function correctly handles
 * null values in the partial configuration. It verifies that null
 * values do not overwrite existing non-null values, and that
 * existing null values remain null.
 */
test('updateConfig should handle null values correctly', () => {
  // Mock the existing configuration
  const mockExistingConfig = {
    GENERAL: {
      PORT: 3000,
      SIMILARITY_MEASURE: 'cosine',
      KEEP_ALIVE: 'true',
    },
    API_KEYS: {
      OPENAI: 'existing-openai-key',
      GROQ: null,
      ANTHROPIC: 'existing-anthropic-key',
      GEMINI: 'existing-gemini-key',
    },
    API_ENDPOINTS: {
      SEARXNG: 'https://existing-searxng-endpoint.com',
      OLLAMA: 'http://existing-ollama-endpoint.com',
    },
  };

  // Mock the toml.parse function to return the existing config
  (toml.parse as jest.Mock).mockReturnValue(mockExistingConfig);

  // Mock the path.join function
  (path.join as jest.Mock).mockReturnValue('/mocked/path/config.toml');

  // Prepare a partial config update with null values
  const partialConfig = {
    GENERAL: {
      PORT: 4000,
      SIMILARITY_MEASURE: null,
    },
    API_KEYS: {
      OPENAI: null,
      GROQ: 'new-groq-key',
      ANTHROPIC: null,
    },
  };

  // Call the updateConfig function
  updateConfig(partialConfig);

  // Check if fs.writeFileSync was called with the correct arguments
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    '/mocked/path/config.toml',
    expect.any(String)
  );

  // Verify the content written to the file
  const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
  const parsedContent = toml.parse(writtenContent);

  // Mock toml.parse to return the updated config for getter calls
  (toml.parse as jest.Mock).mockReturnValue(parsedContent);

  // Check if the config was correctly updated
  expect(getPort()).toBe(4000);
  expect(getSimilarityMeasure()).toBe('cosine'); // Should not be overwritten by null
  expect(getKeepAlive()).toBe('true');
  expect(getOpenaiApiKey()).toBe('existing-openai-key'); // Should not be overwritten by null
  expect(getGroqApiKey()).toBe('new-groq-key');
  expect(getAnthropicApiKey()).toBe('existing-anthropic-key'); // Should not be overwritten by null
  expect(getGeminiApiKey()).toBe('existing-gemini-key');
  expect(getSearxngApiEndpoint()).toBe('https://existing-searxng-endpoint.com');
  expect(getOllamaApiEndpoint()).toBe('http://existing-ollama-endpoint.com');
});
