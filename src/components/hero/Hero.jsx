import React, { useEffect, useState } from "react";
import heroImg from "../../assets/hero-img.png";
import { pinata } from "../../utils/configPinta";
import Modal from "../Modal";

const Hero = ({ web3State }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
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
          const ipfsUrl = await pinata.gateways.convert(profileImageLink);
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
    <section className="text-white w-[100%] h-fit flex  justify-center items-center bg-[#212121]">
      <div className="py-5 px-0 md:px-5 flex flex-col-reverse md:flex-row justify-between items-center  gap-0 md:gap-12">
        <div className="w-[100%] md:w-[650px] mt-10 md:mt-0  mx-5 md:mx-0 my-0 text-center md:text-start">
          <p className="text-xs md:text-base font-extralight opacity-80">
            <span className="text-xs md:text-base font-normal text-[#1a44f0]">
              Dhruvil{" "}
            </span>
            is a Full-Stack Developer From India.
          </p>
          <h3 className="text-sm/normal md:text-lg/relaxed mt-4 font-normal opacity-75">
            {description ||
              "Full-Stack Developer specializing in Web3 applications."}
          </h3>
          <button
           onClick={handleOpenModal}
            className="mt-9 text-white font-normal h-[42px] w-[200px] border-2 border-[rgb(86,88,226)] rounded-[20px_0_20px_0] bg-[#1a44f0] hover:bg-[#212121]"
          >
            Get in Touch
          </button>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />


        </div>

        <img
          className="
              w-[300px] md:w-[250px] 
              h-auto 
              border-0 
              border-solid  
              border-r-[12px] 
              border-b-[12px] 
              border-[#1a44f0] 
              rounded-[60px_0px_60px_0px]
              mt-4 md:0
              "
          src={profileImage}
          alt="profilePhoto"
          onError={(e) => (e.target.src = heroImg)}
        />
      </div>
    </section>
  );
};

export default Hero;
