// src/services/api.js
const BASE_URL = 'http://127.0.0.1:1515';

export const sendMessage = async (messages, onUpdate) => {
  // Use only role and content from messages
  messages = messages.map(({ role, content }) => ({ role, content }));

  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');


      for (const line of lines) {
        if (!line) continue;
        
        const message = line.replace(/^data: /, '');
        

        try {
          const parsedMessage = JSON.parse(message);
          const content = parsedMessage.content || '';

          if (content === '[DONE]') {
            console.log('Stream complete');
            break;
          };

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