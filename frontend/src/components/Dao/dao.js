import {
    Button,
    Tabs,
    Tab,
    Row,
    Col,
    Card,
} from "react-bootstrap";

import "../CSS/body.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import myContract from '../../contract.js';
import State from '../state.js'
import Projects from "../projects";
import Display from "../project";
import Users from "../users"
import Navbar from '../Navbar';
import { Navigate } from "react-router-dom";
import axios from 'axios';



function User() {
    useEffect(() => {
        enableMetaMask();
    }, [])

    const [all_projects, setall_projects] = useState("0");
    const [Project_state, setProject_state] = useState("0");
    const ethereum = window.ethereum;

    const getInitialState1 = () => {
        const value = "0";
        return value;
    };

    const [value1, setValue1] = useState(getInitialState1);

    const handleChange1 = (e) => {
        setValue1(e.target.value);
    };

    const enableMetaMask = async () => {
        await ethereum.request({ method: "eth_requestAccounts" });
    };

    const Project_view = async () => {
        let results = []
        const result = await myContract.getPastEvents('AddProject', {
            fromBlock: 0,
            toBlock: 'latest'
        });
        results.push(result);
        return results;
    };

    let data2 = [];
    const w = Promise.resolve(Project_view());
    w.then(value => {
        for (let i = 0; i < value[0].length; i++) {
            data2.push((value[0][i].returnValues))
        }
    })

    const Project_StakeMoney = async () => {
        enableMetaMask();
        let id = document.getElementById('projectid').value;
        let amt = document.getElementById('amt').value;
        const stakeProject = await myContract.methods.Project_StakeMoney(
            amt, id
        )
            .send({ from: ethereum.selectedAddress })
    };

    const Project_unStakeMoney = async () => {
        enableMetaMask();
        let id = document.getElementById('projectid').value;
        let amt = document.getElementById('amt').value;
        const unstakeProject = await myContract.methods.Project_UnStakeMoney(
            amt, id
        )
            .send({ from: ethereum.selectedAddress })
    };

    const vote_Add = async () => {
        enableMetaMask();
        let votetype = value1;
        let projId = document.getElementById('projId').value;
        const addProject = await myContract.methods.Project_CastVote(
            votetype, projId
        )
            .send({ from: ethereum.selectedAddress })
    };

    const closeVote = async () => {
        enableMetaMask();
        let projId = document.getElementById('cprojId').value;
        const addProject = await myContract.methods.closeVoting(
            projId
        )
            .send({ from: ethereum.selectedAddress })
    };


    const get_State = async () => {
        let id = document.getElementById('proposalId').value;
        let res = [];
        const r = await myContract.methods.getProposalState(id).call()
        res.push(r);
        // setProject_state(res);
        console.log(res)
        return res;
    }

    const allProjects = async () => {
        let id = document.getElementById('proposalId').value;
        let res = [];
        const r = await myContract.methods.viewAllProjects().call()
        res.push(r);
        console.log(res)
        setall_projects(res);
        return res;
    }


    const add_Project = async () => {
        enableMetaMask();
        let _votingThreshold = document.getElementById('_votingThreshold').value;
        let _minStakingAmt = document.getElementById('_minStakingAmt').value;
        let _closingTime = document.getElementById('time').value;

        let file = document.getElementById('file').files[0];

        console.log(file);
        const formData = new FormData();
        formData.append('file', file);

        let res;
        try {
            const response = await fetch('http://localhost:5001/upload', {
                method: 'POST',
                body: formData
            });
            // res = await response;
            res = await response.json();
            // console.log(res)
            if (response.ok) {
                console.log('File uploaded successfully');
                //  console.log(res);
                let _hash = res.fileHash;
                console.log(_hash)
            }
            else {
                console.error('Error uploading file');
            }
        }
        catch (err) {
            console.error(err);
        }
        let _hash = res.fileHash;
        
            const addProject = await myContract.methods.Project_Add(
                _votingThreshold,
                _minStakingAmt,
                _closingTime,
                _hash
            ).send({ from: ethereum.selectedAddress })
         
    };


    let data = [];
    const p = Promise.resolve(get_State());
    p.then(value => {
        data.push((value[0]))
    })
    const [state, getstate] = useState({ data: "" })
    const changeState = () => {
        getstate({ data: data });
    };

    const [state2, setstate2] = useState({ data: "" })

    const changeState2 = () => {
        setstate2({ data: data2 });
    };


    return (
        <>
            <Navbar />
            <br /><br /><br /><br />
            <div className="page-align">
                <div className="direction">
                    <div className="card">
                        <div className="Text-top"><u>Get Project State</u></div>
                        <Card.Text>
                            <br></br>
                            <input id="proposalId" placeholder="Project ID"></input>
                            <br></br>
                            <br></br>
                            <State data={state.data} ></State>
                        </Card.Text>
                        <Button
                            className="btn_back"
                            onClick={() => changeState()}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className="card">
                        <div className="Text-top"><u>Click here to Swap Token</u></div>

                        <Button
                            // code for blue button
                            className="btn_back"
                            // navigate on onClick
                            onClick={() => window.open('https://app.uniswap.org/#/swap')}
                        >
                            Swap token
                        </Button>
                    </div>
                </div>
                <div className="direction">

                    <div className="card">
                        <div className="Text-top"><u>View Project Proposals</u></div>
                        <Card.Text>
                            <Projects data={state2.data}></Projects>
                        </Card.Text>
                        <Button
                            className="btn_back"
                            onClick={() => changeState2()}
                        >
                            View Projects
                        </Button>
                    </div>
                    <div className="card">
                        <div className="Text-top"><u>Get All Projects</u></div>
                        <Card.Text>
                            <Display data={all_projects}></Display>
                        </Card.Text>
                        <Button
                            className="btn_back"
                            onClick={() => allProjects()}
                        >
                            Submit
                        </Button>
                    </div>

                </div>
                <div className="direction">
                    <div className="card">
                        <div className="Text-top"><u>Stake Money for a project</u></div>
                        <Card.Text>
                            <br></br>
                            <input id="projectid" placeholder="Project ID"></input>
                            <br></br>
                            <br></br>
                            <input id="amt" placeholder="Amount"></input>
                        </Card.Text>
                        <Button
                            className="btn_back"
                            onClick={() => Project_StakeMoney()}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className="card">
                        <div className="Text-top"><u>Add Project</u></div>
                        <br></br>
                        <Card.Text><input type="file" id="file" name="file" /></Card.Text>
                        <Card.Text>
                            Voting Threshold:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="_votingThreshold" placeholder="Voting threshold"></input>
                        </Card.Text>
                        <Card.Text>
                            Minimum staking amount:<tab> </tab><input id="_minStakingAmt" placeholder="Min stake amount"></input>
                        </Card.Text>
                        <Card.Text>
                            Closing time:&nbsp;<tab> </tab><input id="time" placeholder="Time"></input>
                            <br></br>
                        </Card.Text>

                        <Button
                            className="btn_back"
                            onClick={() => add_Project()}
                        >
                            Submit
                        </Button>
                        <br></br>
                    </div>
                </div>

                <div className="direction">
                    <div className="card">
                        <div className="Text-top"><u>Cast Vote</u></div>
                        <br></br>
                        <Card.Text>

                            Project ID:<tab> </tab><input id="projId" placeholder="Project ID"></input>
                            <br></br>
                            <br></br>
                            Vote Type: <tab></tab>
                            {/* <br></br> */}
                            <select value={value1} onChange={handleChange1} >
                                <option value="0">Against</option>
                                <option value="1">For</option>
                                <option value="2">Abstain</option>
                            </select>
                            <br></br>
                        </Card.Text>
                        <Button
                            className="btn_back"
                            // button of slightly blue color
                            onClick={() => vote_Add()}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className="card">
                        <div className="Text-top"><u>Close Project</u></div>
                        Project ID:<tab> </tab><input id="cprojId" placeholder="Project ID"></input>
                        <br />
                        <Button
                            // code for blue button
                            className="btn_back"
                            // navigate on onClick
                            onClick={() => closeVote()}
                        >
                            Close Token
                        </Button>
                    </div>

                    <div className="card">
                        <div className="Text-top"><u>Unstake Money</u></div>
                        <Card.Text>
                            <br></br>
                            <input id="projectid" placeholder="Project ID"></input>
                            <br></br>
                            <br></br>
                            <input id="amt" placeholder="Amount"></input>
                        </Card.Text>
                        <Button
                            className="btn_back"
                            onClick={() => Project_unStakeMoney()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );



};

export default User;
