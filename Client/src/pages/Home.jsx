import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState("Apple");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(data));
  }, []);
  return <div>Home</div>;
};

export default Home;
