import { wolframAlphaSearchRetrieverPrompt, wolframAlphaSearchResponsePrompt } from './wolframAlpha';

/**
 * This test suite verifies that the Wolfram Alpha prompt templates contain the expected placeholders,
 * instructions, and formatting details needed for constructing valid queries and responses.
 * It also ensures that citation instructions and key phrases like "not_needed" are present,
 * thus increasing the overall test coverage.
 */
describe('Wolfram Alpha Prompts', () => {
  test('Retriever prompt includes key instructions and placeholders', () => {
    // Check that the retriever prompt instructs to return `not_needed` for simple tasks.
    expect(wolframAlphaSearchRetrieverPrompt).toContain('not_needed');
    // Verify that the retriever prompt includes chat history and query placeholders.
    expect(wolframAlphaSearchRetrieverPrompt).toContain('{chat_history}');
    expect(wolframAlphaSearchRetrieverPrompt).toContain('{query}');
  });

  test('Response prompt includes detailed formatting instructions and placeholders', () => {
    // Check that the response prompt expects Markdown formatting and includes context instructions.
    expect(wolframAlphaSearchResponsePrompt).toContain('Markdown');
    expect(wolframAlphaSearchResponsePrompt).toContain('<context>');
    expect(wolframAlphaSearchResponsePrompt).toContain('{context}');
    expect(wolframAlphaSearchResponsePrompt).toContain('{date}');
  });

  /**
   * This test verifies that the response prompt includes proper citation instructions using [number] notation.
   * It ensures that every sentence is expected to include at least one citation.
   */
  test('Response prompt contains citation instructions for inline citations', () => {
    // Check for the [number] citation pattern instruction in the response prompt.
    expect(wolframAlphaSearchResponsePrompt).toMatch(/\[number\]/);
    // Verify that the instructions mention citation for every sentence.
    expect(wolframAlphaSearchResponsePrompt).toContain('every single sentence');
  });
});