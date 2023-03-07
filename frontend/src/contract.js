import Web3 from "web3";
import WITDAO from "./WITDAO.json"
  const ethereum = window.ethereum;

  const web3 = new Web3(ethereum);

  const ContractAddress = '0x9412eaaDc0A5B2883304e5bc022A2971a24076F0';


  // admin 0x4E92Aa11959c1417b5b4BA53E98500743d0C0f5d goerli 
  // const ContractAddress = '0xE291427acc23472491E4c6d92DCDd4d0a1ddB7E1';
  const ContractAbi = WITDAO;

  const myContract = new web3.eth.Contract(
    ContractAbi,
    ContractAddress
  );

  export default myContract;
