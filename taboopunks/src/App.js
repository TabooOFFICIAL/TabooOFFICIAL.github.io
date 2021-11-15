import React, { Component } from "react";
import { Form, Button, InputGroup, Container, FormControl, Card } from "react-bootstrap";
import Web3 from "web3";
import axios from 'axios';
import emailjs from 'emailjs-com';
import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";

import "./App.css";

class App extends Component {

  state = {
    web3: null,
    accounts: null,
    isWalletConnected: false,
    bscAddress: "",
    email: "",
    discordId: "",
    tgUsername: "",
    price: 0.05,
    amount: 1,
    validated: false,
    purchasePending: false
  };

  componentDidMount = async () => {
  
    let web3;
  
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      web3 = window.web3;
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
    }
    this.setState({ web3: web3 });    

    this.isWalletConnected(web3);
  }

  isWalletConnected = async (web3) => {
    
    let isWalletConnected = false;
    const accounts = await web3.eth.getAccounts();

    if (accounts.length > 0) {
      isWalletConnected = true;
    }

    this.setState({ isWalletConnected: isWalletConnected, accounts: accounts });
  }

  handleAddressChange = (event) => {
    if(!event.target.value || event.target.value.toString().lenght < 42 ) {
      this.setState({valid: false});
    }
    this.setState({ bscAddress: event.target.value });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleAmount = (event) => {
    this.setState({amount: event.target.value});
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      this.purchase()
    }

    this.setState({ validated: true });
  }

  validateAddress = async () => {

    const minABI = [
      {    
        constant: true,  
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      }
    ];
    
    const tokenAddress = "0x9abDbA20EdFbA06B782126b4D8d72A5853918FD0";
    const web3 = new Web3("https://bsc-dataseed1.binance.org:443");
    let price = 0.05;
    let valid = false;
    let validText = "the provided address doesn't hold any $TABOO, please verify";

    try {
      const ctr = new web3.eth.Contract(minABI, tokenAddress);
      const result = await ctr.methods.balanceOf(this.state.bscAddress).call();
      const format = web3.utils.fromWei(result); 
      if(format > 0) {
        // Update state with the result.
        price = 0.035;
        valid = true;
        validText = "You are ellibible for a TABOOPUNK price reduction! Thank you for holding $TABOO"
      }
      this.setState({ price: price, valid: valid, validText: validText });
    } catch (error) {
      
    }
    
    this.setState({ price: price, valid: valid, validText: validText });

  };

  connect = async () => {

    const { web3 } = this.state;

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      }
    };
    
    const web3Modal = new Web3Modal({
      providerOptions // required
    });

    const provider = await web3Modal.connect();

    if(provider) {
      const web3 = new Web3(provider);
      this.setState({ web3: web3, isWalletConnected: true });

    } else {
      this.setState({ isWalletConnected: false });
    }

    // Use web3 to get the user's accounts.
    const accounts = await this.state.web3.eth.getAccounts();
    this.setState({accounts: accounts });

  }

  purchase = async () => {
  
    let network;
    const { web3, isWalletConnected, accounts } = this.state;

    if (isWalletConnected && this.state.amount > 0) {
      if(web3) {
        network = await web3.eth.net.getNetworkType();
      }
  
      if (network != 'main') {
        alert("plese make sure your wallet is connected and  your network is set to Ethereum's Mainnet on metamask");
      } else {
        if (accounts.lenght > 0 ) {
          this.doPurchase();
        }
        else {
          let accounts = await web3.eth.getAccounts();
          this.setState({ accounts: accounts });
          this.doPurchase();
        }
      }
    }
  }

  doPurchase = async () => {

    const { web3, accounts } = this.state;

    const toAddress = process.env.REACT_APP_TABOOPUNK_ADDRESS;
    const calcAmount = this.state.price * this.state.amount;
    const amount = calcAmount.toString();
    const amountToSend = web3.utils.toWei(amount, "ether");
    const connected = await web3.eth.getAccounts();

    if (connected.length > 0) {
      const send = web3.eth.sendTransaction({
        from:accounts[0],
        to:toAddress,
        value:amountToSend 
      })
      .on('transactionHash', (hash) => {
          this.storeData(hash);
          this.sendConfirmationEmail();
          this.setState({
            transactionFullfilled: `Congratulations! you have successfully purchased a taboopunk, an email confirmation will arrive to ${this.state.email} shortly, Check SPAM if you dont see it in your inbox`,
            purchasePending: true
          });
      })
      .on('error', console.error);
      // .then(async result => {
      //   this.storeData(result.transactionHash);
      //   this.sendConfirmationEmail();
      //   alert(`Congratulations! you have successfully purchased a taboopunk, an email confirmation will arrive to ${this.state.email} shortly, Check SPAM if you dont see it in your inbox`);
      // });
      
    } else {
      alert("No wallet connected");
    }
  }

  storeData = (txid) => {
    axios.post(
      "https://sheet.best/api/sheets/6ee5ead9-f4dd-44dc-9027-9febc4b3e821",
      {
        email: this.state.email,
        discordId: this.state.discordId,
        tgUsername: this.state.tgUsername,
        amount: this.state.amount,
        bscAddress: this.state.bscAddress,
        txId: txid
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendConfirmationEmail = async () => {
    await emailjs.send(
      "service_9mug7sb",
      "template_iw7epik",
      {
        email: this.state.email,
        amount: this.state.amount,
        txid: this.state.txid,
        purchasePrice: this.state.price
      },
      "user_iOTbyZD6ZSThfa1kFJjId"
    );
  }

  render() {
    return (
      <div className="App">
        <Container style={{ textAlign: 'center' }}>
          <div className="row">
            <Card className="mx-auto pb-3 mt-lg-5">
              <Card.Body>
                <div className="mainDesc">
                  <h1>TABOOPUNKS</h1>
                  <br />
                  <p style={{ fontSize: "0.9rem" }}>
                    TABOOPUNKS are up to 10,000 uniquely generated characters, no two are exactly alike, 
                    and each of them can be officially owned by a single person on the ethereum blockchain.
                    They will have up to 300 attributes across 10 to 20 categories to be entirely unique by at least 3 degrees of separation.
                  </p>
                  <p style={{ fontSize: "0.9rem" }}>
                  Not only are TABOOPUNKS beautifully designed collectible characters,
                    they also can serve as your ticket to the world of exclusive content and VIP parties.
                    They will basically grant you the owner, superpowers on the TABOO marketplace. From invitational private parties with our carefully selected supermodels to access to all areas on the TABOO marketplace and some yet undisclosed utilities. 
                  </p>
                  <hr />
                  <h4>
                    You'll be able to buy, bid, and offer punks for sale on the open market!
                  </h4>
                  <br />
                  <p style={{ fontSize: "1rem" }} className="text-danger">
                    <i>The TABOOPUNKS will be offered on a first come first serve basis to TABOO holders at a mint price determined by one factor: <b>if you hold any amount of $TABOO your minting price is 0.035ETH, otherwise, your minting price is 0.05ETH make sure to validate you address to get a discount!</b></i>
                  </p>
                </div>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="email"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={this.state.email}
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">Email address</label>
                  </Form.Floating>

                  <div style={{ textAlign: 'left' }}>
                    <Form.Text id="validateAddress" muted>
                    Not a member of our Telegram? join here! <a href="https://t.me/TABOO_OFFICIAL" target="_blank">https://t.me/TABOO_OFFICIAL</a>
                    </Form.Text>
                  </div>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="tgUsername"
                      type="text"
                      name="tgUsername"
                      placeholder="name"
                      value={this.state.tgUsername}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="tgName">Telegram Username</label>
                  </Form.Floating>

                  <div style={{ textAlign: 'left' }}>
                    <Form.Text id="validateAddress" muted>
                    Not a member of our Discord? join here! <a href="https://discord.gg/tabootoken" target="_blank">https://discord.gg/tabootoken</a>
                    </Form.Text>
                  </div>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="discordId"
                      type="text"
                      name="discordId"
                      placeholder="discord"
                      value={this.state.discordId}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="discordId">Discord Id</label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="amount"
                      type="number"
                      name="amount"
                      placeholder="amount"
                      value={this.state.amount}
                      onChange={this.handleAmount}
                      min="1"
                      required
                    />
                    <label htmlFor="amount">Amount ordering</label>
                  </Form.Floating>

                  
                  <div style={{ textAlign: 'left' }}>
                    <Form.Text id="validateAddress" muted>
                      Copy your BSC address here for us to validate that the address holds $TABOO, this will be the address linked to the taboopunk(s) once purchased
                    </Form.Text>
                  </div>
                  <InputGroup className="form-floating" size="lg">
                      <FormControl
                        placeholder="$TABOO Holding Address"
                        aria-label="$TABOO Holding Address"
                        aria-describedby="validateAddress"
                        onChange={this.handleAddressChange}
                        value={this.state.bscAddress}
                        disabled = {(this.state.valid)? "disabled" : ""}
                      />
                      <Button variant="outline-secondary" id="" onClick={this.validateAddress} >
                        Validate
                      </Button>
                      <label htmlFor="discordId">$TABOO Holding Address</label>
                  </InputGroup>
                  <div style={{ textAlign: 'left' }}>
                    <Form.Text id="validateAddress" muted>
                      {this.state.validText}
                    </Form.Text>
                  </div>

                  <br />
                  <h3>Your Minting Price: {this.state.price }ETH</h3>
                  <br />
                  <div className="row mb-3">
                    <Button 
                        id="connect" 
                        onClick={this.connect}
                        variant="outline-danger"
                      >
                      connect to ETH wallet
                    </Button>
                  </div>
                  <div className="row mb-3">
                    <Form.Text id="validateAddress" muted>
                     {this.state.transactionFullfilled}
                    </Form.Text>
                    <Button 
                      id="purchase"
                      type="submit"
                      variant="danger"
                      disabled={(!this.state.isWalletConnected || this.state.purchasePending )? "disabled" : ""}
                      >
                      Purchase TABOOPUNKS
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
