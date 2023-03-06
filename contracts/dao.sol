// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract DAO is Ownable, ERC20("ISBToken", "ISB") {

  using Strings for uint256;

  // enum ProjectState {
  //     Voting, 0
  //     Defeated, 1
  //     Succeeded 2
  // }

  enum VoteType {
      Against,
      For,
      Abstain
  }

  struct Project {
      uint256 stakedAmount;
      uint256 stakersCount;
      uint256 votingThresholdAmt;
      uint256 minStakingAmt;
      address proposer;
      uint256 time;
      uint256 closingTime;
      bool closed;
      uint state;
      string hashData;
  }

  struct forVote{
    address add;
    uint256 amount;
  }

  mapping(uint256 => address) internal users;
  mapping(uint256 => uint256) public ForWeight;
  mapping(uint256 => uint256) public AgainstWeight;
  mapping(uint256 => address[] ) public ForVoters;
  mapping(uint256 => address[]) public AgainstVoters;
  mapping(uint256 => address[]) public AbstainVoters;
  mapping(uint256 => forVote) public forVotes;
  mapping(uint256 => mapping(address => bool)) public ProjectVoters;
  mapping(uint256 => mapping(address => uint256)) public StakedAmounts;
  mapping(uint256 => Project) public Projects;

  event AddProject(uint256 id, address proposer, uint256 _minStakingAmt, uint256 votingThresholdAmt, uint256 closingTime);

  uint256 public ProjectsCount = 0;
  uint256 userCount =0;
  address admin;

  constructor() {
    admin = msg.sender;
    _mint(admin, 1000000 * 10**18);
  }

  function Project_Add( uint256 _votingThresholdAmt, uint256 _minStakingAmt, uint256 _closingTime, string memory _hash) public returns(uint256) {
    require(balanceOf(msg.sender) > 0, 'Insufficient ISB tokens');
    unchecked {
      ProjectsCount++;
      Projects[ProjectsCount].stakedAmount = 0;
      Projects[ProjectsCount].proposer = msg.sender;
      Projects[ProjectsCount].votingThresholdAmt = _votingThresholdAmt;
      Projects[ProjectsCount].minStakingAmt = _minStakingAmt;
      Projects[ProjectsCount].time = block.timestamp;
      Projects[ProjectsCount].closingTime = _closingTime;
      Projects[ProjectsCount].state = 0;
      Projects[ProjectsCount].closed = false;
      Projects[ProjectsCount].hashData = _hash;
    }
    emit AddProject(ProjectsCount, msg.sender, _minStakingAmt, _votingThresholdAmt, _closingTime);
    return ProjectsCount;
  }

  function Project_StakeMoney(uint256 _amount, uint256 _projectID) public  {
    require((_projectID <= ProjectsCount) && (_projectID > 0), 'Invalid Project ID' );
    require(balanceOf(msg.sender)  + StakedAmounts[_projectID][msg.sender] > Projects[ProjectsCount].minStakingAmt, 'Insufficient Token balance');
    require(_amount > 0, 'Invalid Amount.');
    require(StakedAmounts[_projectID][msg.sender] + _amount >= Projects[ProjectsCount].minStakingAmt, 'Low staking amount');
    require(timesUp(_projectID) == false, 'Cannot stake beyond closing period');
    require(Projects[_projectID].closed == false, 'Project closed');
        unchecked {
                Projects[_projectID].stakedAmount += _amount;
                if (StakedAmounts[_projectID][msg.sender] == 0) {
                  Projects[_projectID].stakersCount += 1;
                }     
                StakedAmounts[_projectID][msg.sender] += _amount;
              }
  }

  function closeVoting(uint256 _projectID) public returns(bool){
    require((_projectID <= ProjectsCount) && (_projectID > 0), 'Invalid Project ID' );
    require(msg.sender == Projects[_projectID].proposer, 'Only project proposer can close proposal');
    require(Projects[_projectID].closed == false, 'Project already closed');
    require(timesUp(_projectID) == true, 'Please wait till proposal closing time');

        uint256 nForWeight;
        uint256 nAgainstWeight;

        nAgainstWeight = AgainstWeight[_projectID];
        nForWeight = ForWeight[_projectID];

        if (nForWeight >= nAgainstWeight) {
          Projects[_projectID].state = 2;
          for(uint i=0; i<ForVoters[_projectID].length; i++){
            this.transferFrom(ForVoters[_projectID][i], Projects[_projectID].proposer, StakedAmounts[_projectID][forVotes[_projectID].add]);
          }
        } else {
          Projects[_projectID].state = 1;
          for(uint i=0; i<ForVoters[_projectID].length; i++){
            this.transferFrom(ForVoters[_projectID][i], ForVoters[_projectID][i] , StakedAmounts[_projectID][forVotes[_projectID].add]);
          }
        }
        Projects[_projectID].closed = true;
  }


  function Project_CastVote(uint8 _voteType, uint256 _projectID) public  {
    require((_projectID <= ProjectsCount) && (_projectID > 0), 'Invalid Project ID' );
    require(ProjectVoters[_projectID][msg.sender] == false, 'Already Voted');
    require(StakedAmounts[_projectID][msg.sender] >= Projects[_projectID].votingThresholdAmt, 'Low staked amount');
    require(Projects[_projectID].closed == false, 'Project closed');
    require(timesUp(_projectID) == false, 'Time over');

          uint256 nTotStakedAmt;
          nTotStakedAmt = Projects[_projectID].stakedAmount;
          require(nTotStakedAmt > 0, 'No Amount Staked' );
          
          ProjectVoters[_projectID][msg.sender] = true;

          if (_voteType == uint8(VoteType.Against)) {
            AgainstVoters[_projectID].push(msg.sender);
            AgainstWeight[_projectID] += StakedAmounts[_projectID][msg.sender];

          } else if (_voteType == uint8(VoteType.For)) {
            ForVoters[_projectID].push(msg.sender);
            forVotes[_projectID].add = msg.sender;
            forVotes[_projectID].amount = StakedAmounts[_projectID][msg.sender];
            ForWeight[_projectID] += StakedAmounts[_projectID][msg.sender];
            approve(address(this), StakedAmounts[_projectID][msg.sender] * 10**18);
          } else if (_voteType == uint8(VoteType.Abstain)) {
            AbstainVoters[_projectID].push(msg.sender);
          } else {
              revert("invalid value for VoteType");
          }
  }

  function getProposalDetails(uint256 _projectID) public view returns( Project memory){
    return (Projects[_projectID]);
  }

  function getProposalState(uint256 _projectID) public view returns( uint256 VoteForWeight, uint256 VoteAgainstWeight,uint256 ForVotes, uint256 AgainstVotes, uint256 AbstainVotes ,uint){
    return (ForWeight[_projectID], AgainstWeight[_projectID], ForVoters[_projectID].length, AgainstVoters[_projectID].length, AbstainVoters[_projectID].length, Projects[_projectID].state);
  }

  function Project_GetForVoters(uint256 _projectID) public view returns(address[] memory)  {    
    return ForVoters[_projectID];
  }

  function Project_GetAgainstVoters(uint256 _projectID) public view returns(address[] memory)  {    
    return AgainstVoters[_projectID];
  }
  
  function Project_GetAbstainVoters(uint256 _projectID) public view returns(address[] memory)  {    
    return AbstainVoters[_projectID];
  }

  function timesUp(uint256 _projectID) public view returns (bool) {
    return (block.timestamp >= (Projects[_projectID].time + Projects[_projectID].closingTime ));
  }

  function Project_UnStakeMoney(uint256 _amount, uint256 _projectID) public  {
        require((_projectID <= ProjectsCount) && (_projectID > 0), 'Invalid Project ID' );
        require(ProjectVoters[_projectID][msg.sender] == false, 'Cannot unstake after voting');
        require((StakedAmounts[_projectID][msg.sender] - _amount >= 0 && _amount > 0), 'Not a stake holder / invalid amount');
        unchecked {
                Projects[_projectID].stakedAmount -= _amount;
                if (StakedAmounts[_projectID][msg.sender] == 0) {
                  Projects[_projectID].stakersCount -= 1;
                }     
                StakedAmounts[_projectID][msg.sender] -= _amount;
              }
  }

  function viewAllProjects() public view returns( Project[] memory){
    Project[]    memory id = new Project[](ProjectsCount);
      for (uint i = 1; i <= ProjectsCount; i++) {
          Project storage project = Projects[i];
          id[i] = project;
      }
      return id;
  }
 
  fallback() external  {
  }

}