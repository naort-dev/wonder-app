import ChatMessage from "./chat-message";
import User from "./user";

interface Conversation {
  id: number;
  partner: Partial<User>;
  last_message: string | null;
}

export default Conversation;
