import ChatMessage from "./chat-message";
import User from "./user";

interface Conversation {
  id: number;
  partner: Partial<User>;
  messages: any[];
}

export default Conversation;
