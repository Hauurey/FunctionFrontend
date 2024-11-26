import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set, get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance);
    }
  };

  // Define a maximum withdrawal limit (e.g., 90% of the balance)
  const MAX_WITHDRAWAL_PERCENTAGE = 0.9;

  const deposit = async () => {
    try {
      if (atm) {
        let amount = ethers.utils.parseEther(depositAmount.toString());
        let tx = await atm.deposit(amount);
        await tx.wait();
        getBalance();
        setSuccessMessage("Deposit successful!");
      }
    } catch (error) {
      setErrorMessage(`Deposit failed: ${error.message}`);
    }
  };

  const withdraw = async () => {
    try {
      if (atm && balance) {
        // Check if withdrawal is less than or equal to the maximum withdrawal limit
        let maxWithdrawAmount = ethers.utils.formatEther(balance) * MAX_WITHDRAWAL_PERCENTAGE;

        if (withdrawAmount > maxWithdrawAmount) {
          setErrorMessage(`Withdrawal amount exceeds the limit of ${maxWithdrawAmount} ETH.`);
          return;
        }

        let amount = ethers.utils.parseEther(withdrawAmount.toString());
        let tx = await atm.withdraw(amount);
        await tx.wait();
        getBalance();
        setSuccessMessage("Withdrawal successful!");
      }
    } catch (error) {
      setErrorMessage(`Withdrawal failed: ${error.message}`);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button className="button" onClick={connectAccount}>
          Connect MetaMask Wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="dashboard">
        <p className="info">{getGreeting()} {account ? `, ${account}` : ''}</p>
        <p className="info">Your Balance: {balance && ethers.utils.formatEther(balance)} ETH</p>

        <div className="input-group">
          <input
            type="number"
            className="input"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter deposit amount"
          />
          <button className="button" onClick={deposit}>
            Deposit
          </button>
        </div>

        <div className="input-group">
          <input
            type="number"
            className="input"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter withdraw amount"
          />
          <button className="button" onClick={withdraw}>
            Withdraw
          </button>
        </div>

        {/* Show error or success messages */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1 className="title">Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: Arial, sans-serif;
          background-color: #f0f4f8;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 20px auto;
        }
        .title {
          color: #0070f3;
          margin-bottom: 20px;
        }
        .info {
          font-size: 1.2em;
          margin: 10px 0;
        }
        .dashboard {
          margin-top: 20px;
        }
        .input-group {
          margin: 15px 0;
        }
        .input {
          padding: 10px;
          width: 60%;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        }
        .button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1em;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .error {
          color: red;
          font-size: 1.1em;
          margin-top: 10px;
        }
        .success {
          color: green;
          font-size: 1.1em;
          margin-top: 10px;
        }
      `}</style>
    </main>
  );
}
