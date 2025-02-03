import { redditSearchRetrieverPrompt, redditSearchResponsePrompt } from './redditSearch';

describe('Reddit Search Prompts', () => {
  /**
   * This test verifies that the exported prompt strings contain the expected placeholders,
   * examples, and formatting instructions. It ensures that both the retriever and response prompts
   * include key substrings critical for proper functionality in the application.
   */
  test('should include necessary placeholders and markdown formatting instructions', () => {
    // Verify that redditSearchRetrieverPrompt includes placeholders for conversation context and query.
    expect(redditSearchRetrieverPrompt).toContain('{chat_history}');
    expect(redditSearchRetrieverPrompt).toContain('{query}');
    // Check that the "not_needed" string is included as a valid response indicator.
    expect(redditSearchRetrieverPrompt).toContain('not_needed');

    // Verify that redditSearchResponsePrompt includes key instructions and placeholders.
    expect(redditSearchResponsePrompt).toContain('You are Perplexica');
    expect(redditSearchResponsePrompt).toContain('### Formatting Instructions');
    expect(redditSearchResponsePrompt).toContain('{context}');
    expect(redditSearchResponsePrompt).toContain('{date}');
  });
});