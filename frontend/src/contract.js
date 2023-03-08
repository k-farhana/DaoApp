import Web3 from "web3";
import ISBDAO from "./ISBDAO.json"

  const ethereum = window.ethereum;

  const web3 = new Web3(ethereum);


  // Ganache
  // const ContractAddress = '0xe47CCf790E99575238526Dba4f8420aB7a2907bf';

  // Water insight dao
  // admin 0x4E92Aa11959c1417b5b4BA53E98500743d0C0f5d goerli 
  // const ContractAddress = '0xE291427acc23472491E4c6d92DCDd4d0a1ddB7E1';


  //ISB DAO
  // admin 
  // const ContractAddress = '0x76771022787C5Fc5C7162Ca46c414574640Ef0E4';

  const ContractAddress = '0x76771022787C5Fc5C7162Ca46c414574640Ef0E4';
  const ContractAbi = ISBDAO;

  const myContract = new web3.eth.Contract(
    ContractAbi,
    ContractAddress
  );

  export default myContract;
