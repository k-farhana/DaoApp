import Web3 from "web3";
import FilmDAO from "./FilmDAO.json"
  const ethereum = window.ethereum;

  const web3 = new Web3(ethereum);

  // const ContractAddress = FilmDAO.networks["5777"].address;
  // const ContractAddress = '0x32E196677dc2F48118c6820dB26076af905D5a4c';
  // const ContractAddress = '0xB43CE4eaa984b7D52D592Fc17e5576945d80f3c3';
  // const ContractAddress = '0xe77D0E7DC1aF594b0d553bA866Cb703C181890A0';
  // 0x865f3Db161fE4089bc15f8044D6066b324B8f2F2
  const ContractAddress = '0x487EA4CB8b89DD1dDc965a176db5142c4137C064';
  const ContractAbi = FilmDAO;

  const myContract = new web3.eth.Contract(
    ContractAbi,
    ContractAddress
  );

  export default myContract;