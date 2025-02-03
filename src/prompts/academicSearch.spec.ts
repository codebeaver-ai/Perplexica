import { academicSearchRetrieverPrompt, academicSearchResponsePrompt } from './academicSearch';

describe('Academic Search Prompts', () => {
  /**
   * This test verifies that the academic search retriever and response prompts contain
   * the essential instructions and placeholders. It checks for the presence of specific substrings
   * such as "not_needed", placeholder tokens, and key formatting instructions.
   */
  test('should contain required placeholders and instructions', () => {
    // Verify the retriever prompt has instructions for simple greetings or writing tasks.
    expect(academicSearchRetrieverPrompt).toContain('return `not_needed` as the response');
    // Ensure the retriever prompt includes placeholders that suggest dynamic content.
    expect(academicSearchRetrieverPrompt).toContain('{chat_history}');
    expect(academicSearchRetrieverPrompt).toContain('{query}');

    // Check that the response prompt includes context information and citation instructions.
    expect(academicSearchResponsePrompt).toContain('<context>');
    expect(academicSearchResponsePrompt).toContain('{context}');
    expect(academicSearchResponsePrompt).toContain('{date}');
    // Verify that the instruction for citing sources and the AI identity "Perplexica" are present.
    expect(academicSearchResponsePrompt).toContain('You are Perplexica');
    expect(academicSearchResponsePrompt).toContain('inline citations');
  });
});