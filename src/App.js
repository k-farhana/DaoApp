import {
  Button,
  Tabs,
  Tab,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import './App.css';
import myContract from './contract.js';
import State from './components/state.js'
import Projects from "./components/projects";
import Users from "./components/users"

function App() {

  useEffect(()=>{
    enableMetaMask();
  },[])

  const ethereum = window.ethereum;

  const [state, getstate] = useState({data:""})

    const getInitialState = () => {
      const value = "Review";
      return value;
    };

    const getInitialState1 = () => {
      const value = "0";
      return value;
    };

    const changeState = () => {  
      getstate({data: data}); 
  }; 

  const [value, setValue] = useState(getInitialState);
  const [value1, setValue1] = useState(getInitialState1);
  const [state2, setstate2] = useState({data:""})
  const [state3, setstate3] = useState({data:""})

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleChange1 = (e) => {
    setValue1(e.target.value);
  };

  const enableMetaMask = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
  };

  const register = async () => {
    enableMetaMask();
    const addUser = await myContract.methods.registerUser()
    .send({from:ethereum.selectedAddress})
  };

  const openRegister = async () => {
    enableMetaMask();
    const open = await myContract.methods.openReg()
    .send({from:ethereum.selectedAddress})
  };

  const Project_Add = async () => {
    enableMetaMask();
    let projectUrl = document.getElementById('url').value;
    const addProject = await myContract.methods.Project_Add(
      projectUrl
    )
    .send({from:ethereum.selectedAddress})
  };


  const Project_view  = async () => {
    let results = []
    const result = await myContract.getPastEvents('AddProject',{
      fromBlock:0,
      toBlock: 'latest'
    });
    results.push(result);
    return results;
  };

  const User_view  = async () => {
    let results = []
    const result = await myContract.getPastEvents('AddUser',{
      fromBlock:0,
      toBlock: 'latest'
    });
    results.push(result);
    return results;
  };

  let data2 = [];
  const w = Promise.resolve(Project_view());
  w.then(value => {
      for (let i = 0; i < value[0].length ; i++){
          data2.push((value[0][i].returnValues))
      }
  })

  let data3 = [];
  const x = Promise.resolve(User_view());
  w.then(value => {
      for (let i = 0; i < value[0].length ; i++){
          data3.push((value[0][i].returnValues))
      }
  })


  const changeState2 = () => {  
    setstate2({data: data2}); 
  }; 


  const changeState3 = () => {  
    setstate3({data: data3}); 
  }; 

  const Project_StakeMoney = async () => {
    enableMetaMask();
    let id = document.getElementById('projectid').value;
    let amt = document.getElementById('amt').value;
    const stakeProject = await myContract.methods.Project_StakeMoney(
      amt,id
    )
    .send({from:ethereum.selectedAddress})
  };

  const vote_Add = async () => {
    enableMetaMask();
    let votetype = value1;
    let projId = document.getElementById('projId').value;
    const addProject = await myContract.methods.Project_CastVote(
      votetype,projId
    )
    .send({from:ethereum.selectedAddress})
  };

  
  const closeVote = async () => {
    enableMetaMask();
    let projeId = document.getElementById('projeId').value;
    const closevote = await myContract.methods.Project_SetState_CloseVoting(
      projeId
    )
    .send({from:ethereum.selectedAddress})
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
    .send({from:ethereum.selectedAddress})
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
    <div style={{ maxWidth: "99.20%" }}>
      <br />
      <Tabs
        defaultActiveKey="proposal"
        id="uncontrolled-tab-example"
        className="mb-3"
        style={{ paddingLeft: "10px" }}
      >
        

              <Tab
          eventKey="proposal"
          title="User"
          style={{ paddingLeft: "10px" }}
        >
            <br></br>
            <Row>
            <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>Register As a User</b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Button
                      variant="success"
                      onClick={() => register()}
                    >
                      Register  
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            
            <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>Add a project</b>
                </Card.Title></Card.Header>
                  <Card.Body>
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
                  </Card.Body>
                </Card>
              </Col>
            <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>Stake Money for a project</b>
                </Card.Title></Card.Header>
                  <Card.Body>
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
                  </Card.Body>
                </Card>
              </Col>

              </Row>
              <br></br>
              <br></br>

            <Row>
            <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>Cast Vote</b>
                </Card.Title></Card.Header>
                  <Card.Body>
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
                  </Card.Body>
                </Card>
              </Col>
              </Row>

              </Tab>

              <Tab
          eventKey="adminTab"
          title="Admin"
          style={{ paddingLeft: "10px" }}
        >
            <br></br>

            <Row>
              <Col>
              <Card style={{ width: "30rem" }}>
              <Card.Header
                  ><Card.Title>
                  <b>Open Registration</b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Button
                      variant="success"
                      onClick={() => openRegister()}
                    >
                      Register  
                    </Button>
                  </Card.Body>
              </Card>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
              <Col>
                <Card style={{ width: "95rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>View Project proposals</b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Projects data = {state2.data}></Projects>
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => changeState2()}
                    >
                      View Projects
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              </Row>
    <br></br>
    <Row>
              <Col>
                <Card style={{ width: "95rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>View Registered Users</b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Users data = {state3.data}></Users>
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => changeState3()}
                    >
                      View Users
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              </Row>
    <br></br>
    <Row>
              
              {/* </Row>
              <br></br>
              <Row> */}

              <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>Approve / Reject Project proposals</b>
                </Card.Title></Card.Header>
                  <Card.Body>
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
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>Get Project State</b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Card.Text>
                    {/* Project Name */}
                    <br></br>
                      <input id="proposalId" placeholder="Project ID"></input>
                      <br></br>
                      <br></br>
                    <State data = {state.data} ></State>
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => changeState()}
                    >
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b>Close Voting for project proposal</b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Card.Text>
                    {/* Project Name */}
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
                  </Card.Body>
                </Card>
              </Col>

              </Row>
              </Tab>

              </Tabs>
              </div>
  );
}

export default App;
