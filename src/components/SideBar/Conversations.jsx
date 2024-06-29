
import Conversation from "./Conversation";

const Conversations = () => {

  return (
    <div className="flex flex-col space-y-4 overflow-y-auto">
      {/* {users.map(user => (
        <Conversation key={user.id} user={user} />
      ))} */}
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;
