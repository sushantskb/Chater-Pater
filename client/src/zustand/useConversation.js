import { create } from "zustand";
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  groups: [],
  setGroups: (groups) => set({ groups }),
}));

export default useConversation;
