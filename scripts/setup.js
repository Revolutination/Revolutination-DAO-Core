const { OpenAI } = require('@openai/openai');
const { PromptTemplate } = require('@openai/prompt-template');
const { LLMChain } = require('@openai/llm-chain');

// Your OpenAi API key
const apiKey = 'your_api_key_here';

// Your prompt template
const template = {
  prompt: 'Explain the emotions conveyed by the emojis {emojis}.',
  helpText: 'The emojis {emojis} convey a sense of {emotion}.',
};

// Create a prompt template from the template and input variable
const promptTemplate = new PromptTemplate({
  template,
  inputVariables: ['emojis'],
});

// Create your model and pass it a `temperature` of 0.5
const openAIModel = new OpenAI({
  temperature: 0.5,
});

// Create a chain to combine your LLM with your prompt template
const llmChain = new LLMChain({
  llm: openAIModel,
});

// Export the necessary components for your app
module.exports = {
  apiKey,
  promptTemplate,
  openAIModel,
  llmChain,
};
