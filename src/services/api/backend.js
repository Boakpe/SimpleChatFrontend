const BASE_URL = 'http://127.0.0.1:8000';

export const createMessage = async (content, role, conversation_id) => {
    try {
        const response = await fetch(`${BASE_URL}/messages/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
          },
          body: JSON.stringify({
            content,
            role,
            conversation_id,
          }),
        });

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getMessages = async (conversation_id) => {
    try {
        const response = await fetch(`${BASE_URL}/messages/conversation/${conversation_id}`, {
            headers: {
                'Origin': 'http://localhost:3000'
            }
        });
        const data = await response.json();
        if (!data) {
            return [];
        }
        return data
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getConversations = async (user_id, limit) => {
    try {
        if (!limit) {
            limit = 10;
        }
        const response = await fetch(`${BASE_URL}/conversations/user/${user_id}?limit=${limit}`, {
            headers: {
                'Origin': 'http://localhost:3000'
            }
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getNextId = async () => {
    try {
        const response = await fetch(`${BASE_URL}/conversations/next-id`, {
            headers: {
                'Origin': 'http://localhost:3000'
            }
        });
        const data = await response.json();
        return data.next_id;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const createConversation = async (title, user_id) => {
    try {
        const response = await fetch(`${BASE_URL}/conversations/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
          },
          body: JSON.stringify({
            title,
            user_id,
          }),
        });

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const createMessageFeedback = async (messageId, feedback_type, report_type = null, details = null) => {
    try {
        console.log(messageId, feedback_type, report_type, details);
        feedback_type = feedback_type.toUpperCase();
        console.log(JSON.stringify({
            messageId,
            feedback_type,
            ...(report_type && { report_type }),
            ...(details && { details })
          }));
        const response = await fetch(`${BASE_URL}/feedbacks/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
          },
          body: JSON.stringify({
            message_id: messageId,
            feedback_type,
            ...(report_type && { report_type }),
            ...(details && { details })
          }),
        });

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}