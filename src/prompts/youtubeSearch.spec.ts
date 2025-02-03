import { youtubeSearchRetrieverPrompt, youtubeSearchResponsePrompt } from './youtubeSearch';

describe("YouTube Search Prompts", () => {
  /**
   * This test verifies that the youtubeSearchRetrieverPrompt constant includes the expected placeholders
   * and instructions. It checks for the presence of {chat_history}, {query}, "Follow up question:" and "Rephrased question:".
   */
  test("youtubeSearchRetrieverPrompt includes conversation and follow-up question placeholders", () => {
    expect(youtubeSearchRetrieverPrompt).toContain("{chat_history}");
    expect(youtubeSearchRetrieverPrompt).toContain("{query}");
    expect(youtubeSearchRetrieverPrompt).toContain("Follow up question:");
    expect(youtubeSearchRetrieverPrompt).toContain("Rephrased question:");
  });

  /**
   * This test ensures that the youtubeSearchResponsePrompt constant includes the detailed citation requirements,
   * formatting instructions, and placeholders such as {context} and {date}. It also checks for the presence of markdown
   * formatting cues and citation notation "[number]".
   */
  test("youtubeSearchResponsePrompt includes detailed citation and formatting instructions", () => {
    // Check for markdown formatting instructions: headings with "#"
    expect(youtubeSearchResponsePrompt).toMatch(/#+\s/);
    // Check that citation notation "[number]" is present.
    expect(youtubeSearchResponsePrompt).toContain("[number]");
    // Check inclusion of the context placeholder.
    expect(youtubeSearchResponsePrompt).toContain("{context}");
    // Check inclusion of current date placeholder.
    expect(youtubeSearchResponsePrompt).toContain("{date}");
  });

  /**
   * Additional test:
   * This test verifies that the youtubeSearchRetrieverPrompt provides the specific instruction to return `not_needed`
   * when the follow up question is a simple greeting or does not qualify as an actual question.
   */
  test("youtubeSearchRetrieverPrompt instructs to return `not_needed` for non-question or greeting inputs", () => {
    expect(youtubeSearchRetrieverPrompt).toContain("not_needed");
  });
});