// src/services/api.js
const BASE_URL = 'http://localhost:1234/v1';

export const sendMessage = async (messages, onUpdate) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model: 'anything',
        temperature: 0.5,
        stream: true,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      //console.log('Received:', chunk);

      for (const line of lines) {
        if (!line) continue;
        
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
          console.log('Stream complete');
          break;
        };

        try {
          const parsedMessage = JSON.parse(message);
          const content = parsedMessage.choices?.[0]?.delta?.content || '';
          accumulatedContent += content;
          onUpdate(accumulatedContent);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    }
    
    return accumulatedContent;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};