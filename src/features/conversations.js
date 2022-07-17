import { createSlice } from '@reduxjs/toolkit';

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    value: {
      conversations: [],
    },
  },
  reducers: {
    addMessage: ({ value }, { payload }) => {
      const { sender, receiver, id, text } = payload;
      const conversation = value.conversations.find((x) => x.id === id);
      if (conversation) {
        value.conversations
          .find((x) => x.id == id)
          .messages.push({ sender, text });
      } else {
        value.conversations.push({
          id,
          users: [sender, receiver],
          messages: [{ sender, text }],
        });
      }
    },
    deleteConversation: ({ value }, { payload }) => {
      const newVal = value.conversations.filter((x) => x.id != payload);
      value.conversations = newVal;
    },
    blockUser: ({ value }, { payload }) => {
      const { id, blockedBy } = payload;
      value.conversations.find((x) => x.id == id).blockedBy = blockedBy;
    },
  },
});

export const { addMessage, blockUser, deleteConversation } =
  conversationsSlice.actions;
export default conversationsSlice.reducer;
