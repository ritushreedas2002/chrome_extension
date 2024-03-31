// export const REACT_APP_OPENAI_KEY="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";
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey:"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",
  dangerouslyAllowBrowser: true,
});