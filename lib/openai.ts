import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "sk-proj--aYeIM_2h3tK-LBra53dMeWebY9ODnYt4CK97bC9yvvk9qnsA", // Dummy key
  dangerouslyAllowBrowser: true,
});

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function streamChatCompletion(messages: Message[], onChunk: (chunk: string) => void): Promise<void> {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      stream: true,
    });

    // Process the stream correctly
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming chat completion:', error);
    throw error;
  }
}