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
import Users from "../users"
import Navbar from '../Navbar';


function User() {
    useEffect(() => {
        enableMetaMask();
    }, [])

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

    const register = async () => {
        enableMetaMask();
        const addUser = await myContract.methods.registerUser()
            .send({ from: ethereum.selectedAddress })
    };
    const Project_Add = async () => {
        enableMetaMask();
        let projectUrl = document.getElementById('url').value;
        const addProject = await myContract.methods.Project_Add(
            projectUrl
        )
            .send({ from: ethereum.selectedAddress })
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

    const User_view = async () => {
        let results = []
        const result = await myContract.getPastEvents('AddUser', {
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

    let data3 = [];
    const x = Promise.resolve(User_view());
    x.then(value => {
        for (let i = 0; i < value[0].length; i++) {
            data3.push((value[0][i].returnValues))
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

    const vote_Add = async () => {
        enableMetaMask();
        let votetype = value1;
        let projId = document.getElementById('projId').value;
        const addProject = await myContract.methods.Project_CastVote(
            votetype, projId
        )
            .send({ from: ethereum.selectedAddress })
    };
    const get_State = async () => {
        let id = document.getElementById('proposalId').value;
        let res = [];
        const r = await myContract.methods.Project_GetState(id).call()
        res.push(r);
        return res;
    }

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
            <br/><br/><br/><br/>
            <div className="page-align">
            <div className="direction">
                    <div className="card">
                        <div className="Text-top"><u>Get Project State</u></div>
                        <Card.Text>
                            {/* Project Name */}
                            <br></br>
                            <input id="proposalId" placeholder="Project ID"></input>
                            <br></br>
                            <br></br>
                            <State data={state.data} ></State>
                        </Card.Text>
                        <Button
                            variant="success"
                            onClick={() => changeState()}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className="card">
                        <div className="Text-top"><u>View Project Proposals</u></div>
                        <Card.Text>
                            <Projects data={state2.data}></Projects>
                        </Card.Text>
                        <Button
                            variant="success"
                            onClick={() => changeState2()}
                        >
                            View Projects
                        </Button>
                    </div>
                </div>
                <div className="direction">
                    <div className="card">
                        <div className="Text-top"><u>Register As a User</u></div>
                        <Button
                            variant="success"
                            onClick={() => register()}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="card">
                        <div className="Text-top"><u>Add Project</u></div>
                        <Card.Text>
                            {/* Project Name */}
                            <br></br>
                            Submit a Project proposal
                            <br></br>
                            <input id="url" placeholder="Project URL"></input>
                            <br></br>
                        </Card.Text>
                        <Button
                            variant="success"
                            onClick={() => Project_Add()}
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
                            variant="success"
                            onClick={() => Project_StakeMoney()}
                        >
                            Submit
                        </Button>
                    </div>
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
                            <br></br>
                        </Card.Text>
                        <Button
                            variant="success"
                            onClick={() => vote_Add()}
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