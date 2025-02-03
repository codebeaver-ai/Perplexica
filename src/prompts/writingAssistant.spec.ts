import { writingAssistantPrompt } from './writingAssistant';

describe('writingAssistantPrompt', () => {
  /**
   * This test verifies that the writingAssistantPrompt constant contains all the necessary instructions
   * and placeholders (e.g., citation instructions and context block placeholder) required by the writing assistant.
   */
  it('should include citation guidelines and the context placeholder', () => {
    // Verify that the prompt instructs the assistant about its identity.
    expect(writingAssistantPrompt).toContain('You are Perplexica');
    // Verify that the prompt indicates the correct focus mode.
    expect(writingAssistantPrompt).toContain("focus mode 'Writing Assistant'");
    // Verify that citation instructions are present.
    expect(writingAssistantPrompt).toContain('cite the answer using [number]');
    // Verify that the context block and placeholder are included.
    expect(writingAssistantPrompt).toContain('<context>');
    expect(writingAssistantPrompt).toContain('{context}');
  });
});