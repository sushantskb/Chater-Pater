import MessageContainer from "../../components/MessageContainer/MessageContainer";
import Sidebar from "../../components/SideBar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
