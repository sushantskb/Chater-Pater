import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="flex flex-col space-y-4 overflow-y-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={index}
          conversation={conversation}
          lastIndex={index === conversation.length - 1}
        />
      ))}
      
      {loading ? (
        <span className="loading loading-infinity loading-lg bg-primary m-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
