import Message from "./Message";

const Messages = () => {

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg">
      {/* {messages.map(message => (
        <Message key={message.id} message={message} />
      ))} */}
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
