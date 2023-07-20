import { Configuration, OpenAIApi } from 'openai';

import { OPENAI_KEY, OPENAI_ORGANIZATION } from 'constants/env';

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION,
  apiKey: OPENAI_KEY,
});
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);

export type Message = {
  role: RoleType;
  content: string;
};
export const Role = {
  User: 'user',
  Assistant: 'assistant',
  System: 'system',
} as const;
export type RoleType = (typeof Role)[keyof typeof Role];

export const knownBases = [
  {
    id: 'gpt-4-32k-0613',
    label: 'GPT-4-32k (0613)',
    context: 32768,
    description: 'Largest context window for big problems',
  },
  {
    id: 'gpt-4',
    label: 'GPT-4',
    context: 8192,
    description: 'Insightful, big thinker, slower, pricey',
  },
  {
    id: 'gpt-3.5-turbo-16k',
    label: '3.5-Turbo-16k',
    context: 16384,
    description: 'Fair speed and smarts, large context',
  },
  {
    id: 'gpt-3.5-turbo',
    label: '3.5-Turbo',
    context: 4097,
    description: 'Fair speed and smarts',
  },
  {
    id: '',
    label: '?:',
    context: 4096,
    description: 'Unknown, please let us know the ID',
  },
];

export const openAiRequest = async (messages: Message[]) => {
  const resModels = await openai.listModels().catch((err) => {
    console.error(err);
    return null;
  });
  let modelID = knownBases[3].id;
  if (resModels !== null) {
    const modelData = resModels.data;
    const filteredModel = modelData.data.filter(
      (model) => model.id === knownBases[1].id
    );
    if (filteredModel.length === 1) {
      modelID = filteredModel[0].id;
    }
  }

  const completion = await openai
    .createChatCompletion({
      model: modelID, // string;
      messages: [
        ...messages,
        // {
        //   role: "user", // "user" | "assistant" | "system"
        //   content: "こんにちは！", // string
        // },
      ],
    })
    .catch((err) => {
      throw err;
    });
  return completion?.data;
};
