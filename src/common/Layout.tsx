import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "88px",
          display: "flex",
          height: "100%",
        }}>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
