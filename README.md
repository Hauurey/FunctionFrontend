# Metacrafters ATM
This is a decentralized ATM application built using Ethereum smart contracts, allowing users to interact with an on-chain contract to deposit and withdraw ETH. The frontend communicates with the contract to fetch the balance and allows deposits and withdrawals, all secured by MetaMask.

## Description
This project consists of two primary components:

* A smart contract that manages the balance and allows the owner to deposit and withdraw funds.
* A frontend application that interacts with the smart contract, allowing users to view their balance and perform transactions.

## Getting Started
### Prerequisites
Before running the project, ensure that you have the following:

* Node.js installed. You can download it from here.
* MetaMask extension installed in your browser for managing your Ethereum wallet.
* Hardhat installed globally:
* npm install -g hardhat

### Executing the Program
* Inside the project directory, in the terminal type: npm i
* Open two additional terminals in your VS code
* In the second terminal type: npx hardhat node
* In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
* Back in the first terminal, type npm run dev to launch the front-end.

Setup MetaMask:
* Install the MetaMask extension in your browser.
* Add a custom network to MetaMask:

* Network Name: Choose any name
* RPC URL: http://127.0.0.1:8545/
* Chain ID: 31337
* Currency Symbol: ETH

* Switch to the network you just created in MetaMask.

Copy and paste the following code into the file:

Import the Account:
* Copy the private key of Account 0 from the terminal where you ran npx hardhat node.
* Import this key into MetaMask by selecting Import Account.

Interact with the ATM:
* Go to http://localhost:3000 in your browser to use the ATM.
* You can connect your MetaMask wallet, view the balance, deposit, and withdraw funds (only the owner of the contract can make transactions).

## Authors
Metacrafter Carlo Jan Harry S. Añonuevo

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
