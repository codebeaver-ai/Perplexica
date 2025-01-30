const postcssConfig = require('../ui/postcss.config.js');

describe('PostCSS Configuration', () => {
  /**
   * This test verifies that the PostCSS configuration object
   * has the correct structure and includes the expected plugins.
   */
  test('should have correct plugins configuration', () => {
    expect(postcssConfig).toHaveProperty('plugins');
    expect(postcssConfig.plugins).toEqual({
      tailwindcss: {},
      autoprefixer: {},
    });
  });
});