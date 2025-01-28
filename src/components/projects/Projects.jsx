import React, { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import { Modal, ModalHeader, ModalBody, Row, Button } from "reactstrap";
import "./Projects.css";
import { pinata } from "../../utils/configPinta";

const ProjectCard = ({ project }) => {
    const [imageUrl, setImageUrl] = useState("");
  
    useEffect(() => {
      const fetchIpfsUrl = async () => {
        try {
          const url = await pinata.gateways.convert(project?.image);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching IPFS URL:", error);
          setImageUrl("/fallback-image.png"); // Set a fallback image on error
        }
      };
  
      if (project?.image) {
        fetchIpfsUrl();
      }
    }, [project?.image]);
  
    return (
      <a
        href={`https://github.com/dhruvil-kasodariya/${project?.githubLink}`}
        className="project-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="card-img">
          <img
            src={imageUrl || "/fallback-image.png"}
            alt="Project"
            onError={(e) => (e.target.src = "/fallback-image.png")}
          />
        </div>
        <div className="card-text">
          <h3>{project?.name}</h3>
          <p>{project?.description}</p>
        </div>
      </a>
    );
  };

const Projects = ({ web3State }) => {
  const [modal, setModal] = useState(false);
  const [allProject, setAllProject] = useState([]);
  const [isDonating, setIsDonating] = useState(false);

  useEffect(() => {
    const { contract } = web3State;
    const projectDetails = async () => {
      if (contract) {
        const projects = await contract.methods.allProject().call();
        setAllProject(projects);
      }
    };
    projectDetails();
  }, [web3State.contract]);

  const donateEth = async (e) => {
    e.preventDefault();
    setIsDonating(true);
    try {
      const { contract, web3 } = web3State;
      const eth = document.querySelector("#eth").value;
      if (!eth || isNaN(eth) || parseFloat(eth) <= 0) {
        alert("Please enter a valid ETH amount.");
        return;
      }
      const weiValue = web3.utils.toWei(eth, "ether");
      const account = await web3.eth.getAccounts();
      await contract.methods
        .donate()
        .send({ from: account[0], value: weiValue, gas: 480000 });
      alert("Transaction Successful");
    } catch (error) {
      alert("Transaction Failed");
      console.error("Error:", error);
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <section className="project-section">
      <h1 className="title">Projects</h1>
      <div className="card-wrapper">
        {allProject.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Enter the ETH you want to donate!
        </ModalHeader>
        <ModalBody>
          <form onSubmit={donateEth}>
            <Row>
              <input
                id="eth"
                type="text"
                placeholder="Enter ETH amount"
                aria-label="Enter ETH amount to donate"
              />
              <Button className="mt-4" disabled={isDonating}>
                {isDonating ? "Processing..." : "Send"}
              </Button>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <p className="donate" onClick={() => setModal(true)}>
        Liked the Project's? Consider donating Eth's{" "}
        <FaDonate className="icon" />
      </p>
    </section>
  );
};

export default Projects;
