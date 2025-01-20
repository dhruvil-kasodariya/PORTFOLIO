import { useEffect, useState } from "react";
import "./Contact.css";
import { pinata } from "../../utils/configPinta";

const Contact = ({ web3State }) => {
  const [resume, setResume] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      if (web3State.contract) {
        try {
          const resumelink = await web3State.contract.methods
            .resumeLink()
            .call();
            const ipfsUrl = await pinata.gateways.convert(resumelink)
     

          setResume(ipfsUrl);
        } catch (error) {
          console.error("Error fetching hero data:", error);
        }
      }
    };
    fetchResume();
  }, [web3State.contract]);
  
  return (
    <section className="contact-section">
      <h1 className="title">Interested? Let's Get In Touch!</h1>
      <a href={resume} target="_blank" rel="noopener noreferrer">
        <button className="downlodeBTN">View Resume</button>
      </a>
    </section>
  );
};

export default Contact;
