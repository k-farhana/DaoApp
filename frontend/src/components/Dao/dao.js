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

    const [all_projects, setall_projects] = useState([]);
    const [Project_state, setProject_state] = useState("0");
    const ethereum = window.ethereum;

    const pros = [
        {
            minStakingAmt: 100,
            stakeCount: 2,
            temp: 3,
            temp2: 3,
            id: 1,
            address: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
            closingTime: 100,
            status: "Succeeded",
            name: "Avinash",
            suggestionDate: "16 Mar 2023",
            description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            for: 0,
            against: 0,
            abstain: 0,
        },
        {
            minStakingAmt: 100,
            stakeCount: 2,
            temp: 3,
            temp2: 3,
            id: 2,
            address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
            closingTime: 100,
            status: "Review",
            name: "Avinash",
            suggestionDate: "16 Mar 2023",
            description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            for: 0,
            against: 0,
            abstain: 0,
        },
        {
            minStakingAmt: 100,
            stakeCount: 2,
            temp: 3,
            temp2: 3,
            id: 2,
            address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
            closingTime: 100,
            status: "Voting",
            name: "Avinash",
            suggestionDate: "16 Mar 2023",
            description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            for: 0,
            against: 0,
            abstain: 0,
        },
    ];

    useEffect(() => {
        setall_projects(pros);
    }, []);

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
        // enableMetaMask();
        let _votingThreshold = document.getElementById("_votingThreshold").value;
        let _minStakingAmt = document.getElementById("_minStakingAmt").value;
        let _closingTime = document.getElementById("time").value;
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let summary =  document.getElementById("summary").value;
        let funding_Target = document.getElementById("funding_Target").value;
        const data = {
            "title": title,
            "description": description,
            "summary": summary
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(data);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let _hash
        let response = await fetch("http://localhost:5001/upload", requestOptions)
        .then(response => response.text(alert("succesfully posted the project")))
        .catch(error => alert("There was an error posting the project"));
        response = JSON.parse(response)

        console.log(response.hash)
        _hash=response["hash"]
        console.log(_hash)
        const addProject = await myContract.methods.Project_Add(
            _votingThreshold,
            _minStakingAmt,
            _closingTime,
            funding_Target,
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
                        <Card.Text style={{width: "100%"}}>
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
                        <Card.Text>
                            title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="title" placeholder="Title"></input>
                        </Card.Text>
                        <Card.Text>
                            Funding Target:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="funding_Target" placeholder="Funding Target"></input>
                        </Card.Text>
                        <Card.Text>
                            Summary:<tab> </tab><input id="summary" placeholder="Summary"></input>
                        </Card.Text>
                        <Card.Text>
                            Decription:&nbsp;<tab> </tab><input id="description" placeholder="Description"></input>
                            <br></br>
                        </Card.Text>
                        <Card.Text>
                            Voting Threshold:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="_votingThreshold" placeholder="Voting threshold"></input>
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
