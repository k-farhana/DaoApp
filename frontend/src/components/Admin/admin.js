import {
    Button,
    Tabs,
    Tab,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import "../CSS/body.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import myContract from '../../contract.js';
import State from '../state.js'
import Projects from "../projects";
import Users from "../users"
import Navbar from '../Navbar';


function Admin() {

    useEffect(() => {
        enableMetaMask();
    }, [])
    const ethereum = window.ethereum;
    const [state, getstate] = useState({ data: "" })
    const getInitialState = () => {
        const value = "Review";
        return value;
    };
    const changeState = () => {
        getstate({ data: data });
    };

    const [value, setValue] = useState(getInitialState);
    const [state2, setstate2] = useState({ data: "" })
    const [state3, setstate3] = useState({ data: "" })

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const enableMetaMask = async () => {
        await ethereum.request({ method: "eth_requestAccounts" });
    };

    const openRegister = async () => {
        enableMetaMask();
        const open = await myContract.methods.openReg()
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

    const changeState2 = () => {
        setstate2({ data: data2 });
    };

    const changeState3 = () => {
        setstate3({ data: data3 });
    };

    const closeVote = async () => {
        enableMetaMask();
        let projeId = document.getElementById('projeId').value;
        const closevote = await myContract.methods.Project_SetState_CloseVoting(
            projeId
        )
            .send({ from: ethereum.selectedAddress })
    };

    const setState = async () => {
        enableMetaMask();
        let id = document.getElementById('projectId').value;
        let stake = document.getElementById('minStakeAmt').value;
        let voteThreshold = document.getElementById('votingThreshold').value;
        const state = value;
        const addProject = await myContract.methods.Project_SetState(
            id, state, voteThreshold, stake
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

    return (
        <>
            <Navbar />
            <br /><br /><br /><br />
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
                        <div className="Text-top"><u>View Regidtered Users</u></div>
                        <Card.Text>
                            <Users data={state3.data}></Users>
                        </Card.Text>
                        <Button
                            variant="success"
                            onClick={() => changeState3()}
                        >
                            View Users
                        </Button>
                    </div>
                    <div className="card">
                        <div className="Text-top"><u>Approve / Reject Project proposals</u></div>
                        <Card.Text>
                            {/* Project Name */}
                            <br></br>
                            Project ID: <tab></tab><input id="projectId" placeholder="Project ID"></input>
                            <br></br>
                            <br></br>
                            Voting Threshold: <tab></tab><input id="votingThreshold" placeholder="Voting Threshold"></input>
                            <br></br>
                            <br></br>
                            Minimum stake amoount: <tab></tab><input id="minStakeAmt" placeholder="Minimum stake amount"></input>
                            <br></br>
                            <br></br>
                            Project State: <tab></tab><select value={value} onChange={handleChange} >
                                <option value="0">Review</option>
                                <option value="1">Cancelled</option>
                                <option value="2">Voting</option>
                                <option value="3">Defeated </option>
                                <option value="4">Succeeded</option>
                                <option value="5">Accepted</option>
                                <option value="6">Rejected</option>
                            </select>

                        </Card.Text>
                        <Button
                            variant="success"
                            onClick={() => setState()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
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
                        <div className="Text-top"><u>Close Voting for project proposal</u></div>
                        <Card.Text>
                            <br></br>
                            <input id="projeId" placeholder="Project ID"></input>
                            <br></br>
                            <br></br>
                        </Card.Text>
                        <Button
                            variant="danger"
                            onClick={() => closeVote()}
                        >
                            Submit
                        </Button>
                    </div>

                </div>


            </div>
        </>
    );

};

export default Admin;