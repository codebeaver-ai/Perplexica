import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';
import { updateConfig } from './config';

/**
 * This test verifies that the updateConfig function correctly merges a partial configuration
 * with the current configuration read from the TOML file. In particular, it ensures that missing keys
 * are filled with default values from the current config and that provided empty strings are preserved.
 *
 * The fix in this test converts the written content to a string before parsing it with toml.parse,
 * thereby resolving the type error that occurs when a non-string value is passed.
 */
describe('Config Module Tests', () => {
  test('updateConfig merges partial config with defaults and preserves empty strings', () => {
    // Define the default configuration as it would be stored in the TOML file.
    const currentConfig = {
      GENERAL: {
        PORT: 3000,
        SIMILARITY_MEASURE: 'cosine',
        KEEP_ALIVE: 'enabled',
      },
      API_KEYS: {
        OPENAI: 'openai',
        GROQ: 'groq',
        ANTHROPIC: 'anthropic',
        GEMINI: 'gemini',
      },
      API_ENDPOINTS: {
        SEARXNG: 'searxng',
        OLLAMA: 'ollama',
      },
    };

    // Convert current configuration to a TOML string.
    const currentConfigToml = toml.stringify(currentConfig);

    // Mock fs.readFileSync to return the current config TOML string.
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(currentConfigToml);

    // Spy on fs.writeFileSync to capture the output written to the file.
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    // Create a partial new configuration.
    // For GENERAL, update PORT while passing KEEP_ALIVE as an empty string (should remain as empty string).
    const partialNewConfig = {
      GENERAL: {
        PORT: 8080,
        KEEP_ALIVE: '',
      },
    };

    // Call updateConfig with the partial configuration.
    updateConfig(partialNewConfig);

    // Verify that fs.writeFileSync was called.
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    const [writtenFilePath, writtenContent] = writeFileSyncSpy.mock.calls[0];

    // Parse the written TOML content back to a JavaScript object.
    // Ensure that writtenContent is converted to a string to fix the type error.
    const updatedConfig = toml.parse(String(writtenContent));

    // Construct the expected configuration after merging.
    const expectedConfig = {
      GENERAL: {
        PORT: 8080, // updated value
        SIMILARITY_MEASURE: 'cosine', // filled from the default since missing in partialNewConfig
        KEEP_ALIVE: '', // provided empty string is preserved
      },
      API_KEYS: {
        OPENAI: 'openai',
        GROQ: 'groq',
        ANTHROPIC: 'anthropic',
        GEMINI: 'gemini',
      },
      API_ENDPOINTS: {
        SEARXNG: 'searxng',
        OLLAMA: 'ollama',
      },
    };

    // Assert that the updated configuration matches the expected configuration.
    expect(updatedConfig).toEqual(expectedConfig);

    // Restore the original implementations.
    writeFileSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });
});