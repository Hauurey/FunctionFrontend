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
1. Start Hardhat Node: Open a terminal window and run the following command to start the local Ethereum network:
```
npx hardhat node
```

2. Deploy the contract: Open a second terminal window and deploy the smart contract:
```
npx hardhat run --network localhost scripts/deploy.js
```

3. Run the frontend: In the first terminal, run:
```
npm run dev
```

4. Setup MetaMask:
* Install the MetaMask extension in your browser.
* Add a custom network to MetaMask:

*Network Name: Choose any name
*Chain ID: 31337
*Currency Symbol: ETH

* Switch to the network you just created in MetaMask.

Copy and paste the following code into the file:

5. Import the Account:
* Copy the private key of Account 0 from the terminal where you ran npx hardhat node.
* Import this key into MetaMask by selecting Import Account.

6. Interact with the ATM:
* Go to http://localhost:3000 in your browser to use the ATM.
* You can connect your MetaMask wallet, view the balance, deposit, and withdraw funds (only the owner of the contract can make transactions).

## Authors
Metacrafter Carlo Jan Harry S. Añonuevo

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
