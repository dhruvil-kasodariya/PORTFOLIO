import { useState } from "react";
import Hero from "./components/hero/Hero";
import Wallet from "./components/Wallet/Wallet";
import Handles from "./components/handles/Handles";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import Contact from "./components/contact/Contact";
import "./index.css";
function App() {
  const [web3State, setWeb3State] = useState({
    web3: null,
    contract: null,
  });

  return (
    <>
      <Wallet saveState={setWeb3State}></Wallet>
      <Hero web3State={web3State}/>
      <Handles />
      <Projects web3State={web3State}/>
      <Skills />
      <Experience/>
      <Contact/>
      <Handles />
    </>
  );
}

export default App;


