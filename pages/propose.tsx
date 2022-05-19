import { NextPage } from "next";
import { MintForm, ProposeForm } from "../components";

const Propose: NextPage = () => {
  return (
    <div>
      <h1>Propose</h1>
      <MintForm />
      <ProposeForm />
    </div>
  );
};

export default Propose;
