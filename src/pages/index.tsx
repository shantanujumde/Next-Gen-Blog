import { type NextPage } from "next";
import Button from "@components/components/Button";

const Home: NextPage = () => {
  return (
    <>
      <Button onClick={() => console.log("hello")}>This</Button>
    </>
  );
};

export default Home;
