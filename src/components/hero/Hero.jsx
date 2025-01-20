import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Row } from "reactstrap";
import heroImg from "../../assets/hero-img.png";
import "./Hero.css";
import { pinata } from "../../utils/configPinta";

const Hero = ({ web3State }) => {
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchHeroData = async () => {
      if (web3State.contract) {
        try {
          const [descriptionText, profileImageLink] = await Promise.all([
            web3State.contract.methods.description().call(),
            web3State.contract.methods.imageLink().call(),
          ]);
          const ipfsUrl = await pinata.gateways.convert(profileImageLink)
          setDescription(descriptionText);
          setProfileImage(ipfsUrl);
        } catch (error) {
          console.error("Error fetching hero data:", error);
        }
      }
    };
    fetchHeroData();
  }, [web3State.contract]);
  

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <p>
            <span>Dhruvil </span>
            is a Full-Stack Developer From India.
          </p>
          <h3>{description || "Full-Stack Developer specializing in Web3 applications."}</h3>

          {/* Modal for Email */}
          <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)}>
            <ModalBody>
              <Row className="text-align">
                <label htmlFor="email" aria-label="Email Address">
                  Mail Id - Kshitij123@gmail.com
                </label>
              </Row>
            </ModalBody>
          </Modal>

          <button className="msg-btn" onClick={() => setModal(true)}>
            Get in Touch
          </button>
        </div>

        <div className="hero-img">
          <div className="img-container">
            <img
              src={profileImage}
              alt="profilePhoto"
              onError={(e) => (e.target.src = heroImg)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
