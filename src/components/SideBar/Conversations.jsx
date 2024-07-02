import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  // const conversations = [
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  //   {
  //     fullName: "user 1",
  //   },
  // ];
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
        <span className="loading loading-bars loading-md"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
