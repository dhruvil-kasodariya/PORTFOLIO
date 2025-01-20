import { SlCalender } from "react-icons/sl"
import './Experience.css'
import { useEffect, useState } from "react";

const Experience = ({web3State}) => {

    const [allEduction,setAllEduction]=useState([]);
    const { contract } = web3State;
    useEffect(() => {
    const eductionDetails = async () => {
      if (contract) {
        const eductions = await contract.methods.allEduction().call();
        setAllEduction(eductions);
      }
    };
    web3State.contract && eductionDetails();
  }, [web3State.contract]);

    return (
        <section className="exp-section">
            <h1 className="title">Experience & Education </h1>

            <div className="container">

                <div className="education">
                    <h1 className="edu-tittle">Education</h1>
                    {allEduction.map((item,index)=>{
                        return (   
                        <div className="edu-card" key={index}>
                        <p className="card-text1">
                            <SlCalender className='icon' /> {item.date}
                        </p>
                        <h3 className="card-text2">{item.degree}</h3>
                     
                        <p className="card-text4">
                        {item.instutionName}
                        </p>
                    </div>)
                    })}
                 
                   
                </div>
                {/* experience */}
                <div className="education">
                    <h1 className="edu-tittle">Experience</h1>
                    <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> March 2013 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">learned this this and that.learned this this and that.learned this this and that.learned this this and that.</p>
                        <p className="card-text4">
                            Code Eater
                        </p>
                    </div>
                    {/* card2 */}
                    <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> March 2013 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">learned this this and that.learned this this and that.learned this this and that.learned this this and that.</p>
                        <p className="card-text4">
                            Code Eater
                        </p>
                    </div>
                    {/* card3 */}
                    <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> March 2013 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">learned this this and that.learned this this and that.learned this this and that.learned this this and that.</p>
                        <p className="card-text4">
                            Code Eater
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
