(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{37:function(e,t,a){e.exports=a(68)},42:function(e,t,a){},63:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(29),c=a.n(s),l=(a(42),a(2)),o=a(7),i=a.n(o),d=a(11),u=a(17),m=a(30),h=a(35),b=a(31),p=a(36),f=a(70),v=a(72),g=a(71),w=a(73),y=a(33),E=a(74),A=a(14),O=a.n(A),x=a(32),k=a.n(x),T=a(34),C=(a(63),function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(h.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(r)))).state={web3:null,accounts:null,isWalletConnected:!1,bscAddress:"",email:"",discordId:"",tgUsername:"",price:.05,amount:1,validated:!1},a.componentDidMount=Object(d.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.ethereum?t=new O.a(window.ethereum):window.web3?t=window.web3:(n=new O.a.providers.HttpProvider("http://127.0.0.1:8545"),t=new O.a(n),console.log("No web3 instance injected, using Local web3.")),a.setState({web3:t}),a.isWalletConnected(t);case 3:case"end":return e.stop()}}),e)}))),a.isWalletConnected=function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!1,e.next=3,t.eth.getAccounts();case 3:(r=e.sent).length>0&&(n=!0),a.setState({isWalletConnected:n,accounts:r});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.handleAddressChange=function(e){(!e.target.value||e.target.value.toString().lenght<42)&&a.setState({valid:!1}),console.log(e.target.value),a.setState({bscAddress:e.target.value})},a.handleInputChange=function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,r=t.name;a.setState(Object(l.a)({},r,n))},a.handleAmount=function(e){a.setState({amount:e.target.value})},a.handleSubmit=function(e){!1===e.currentTarget.checkValidity()?(e.preventDefault(),e.stopPropagation()):(e.preventDefault(),a.purchase()),a.setState({validated:!0})},a.validateAddress=Object(d.a)(i.a.mark((function e(){var t,n,r,s,c,l,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],type:"function"}],"0x9abDbA20EdFbA06B782126b4D8d72A5853918FD0",n=new O.a("https://bsc-dataseed1.binance.org:443"),r=.05,s=!1,c="the provided address doesn't hold any $TABOO, please verify",e.prev=6,l=new n.eth.Contract(t,"0x9abDbA20EdFbA06B782126b4D8d72A5853918FD0"),e.next=10,l.methods.balanceOf(a.state.bscAddress).call();case 10:o=e.sent,n.utils.fromWei(o)>0&&(r=.035,s=!0,c="You are ellibible for a TABOOPUNK price reduction! Thank you for holding $TABOO"),a.setState({price:r,valid:s,validText:c}),e.next=18;break;case 16:e.prev=16,e.t0=e.catch(6);case 18:a.setState({price:r,valid:s,validText:c});case 19:case"end":return e.stop()}}),e,null,[[6,16]])}))),a.connect=Object(d.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=a.state.web3;try{window.ethereum.enable().then((function(){a.setState({isWalletConnected:!0})}))}catch(r){a.setState({isWalletConnected:!1})}return e.next=4,t.eth.getAccounts();case 4:n=e.sent,a.setState({accounts:n});case 6:case"end":return e.stop()}}),e)}))),a.purchase=Object(d.a)(i.a.mark((function e(){var t,n,r,s,c,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=a.state,r=n.web3,s=n.isWalletConnected,c=n.accounts,!s){e.next=19;break}if(!r){e.next=6;break}return e.next=5,r.eth.net.getNetworkType();case 5:t=e.sent;case 6:if("main"==t){e.next=10;break}alert("plese make sure your wallet is connected and  your network is set to Ethereum's Mainnet on metamask"),e.next=19;break;case 10:if(!(c.lenght>0)){e.next=14;break}a.doPurchase(),e.next=19;break;case 14:return e.next=16,r.eth.getAccounts();case 16:l=e.sent,a.setState({accounts:l}),a.doPurchase();case 19:case"end":return e.stop()}}),e)}))),a.doPurchase=Object(d.a)(i.a.mark((function e(){var t,n,r,s,c,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=a.state,n=t.web3,r=t.accounts,"0xf296acbfa8f702cbc9a90c66fbd392910d504ea2",s=a.state.price*a.state.amount,c=s.toString(),l=n.utils.toWei(c,"ether"),n.eth.sendTransaction({from:r[0],to:"0xf296acbfa8f702cbc9a90c66fbd392910d504ea2",value:l}).then(function(){var e=Object(d.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.storeData(t.transactionHash),e.next=3,T.a.send("service_9mug7sb","template_iw7epik",{amount:a.state.amount,txid:a.state.txid,purchasePrice:a.state.price},"user_iOTbyZD6ZSThfa1kFJjIdn");case 3:alert("Congratulations! you have successfully purchased a taboopunk, an email confirmation will arrive to ".concat(a.state.email," shortly"));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:case"end":return e.stop()}}),e)}))),a.storeData=function(e){k.a.post("https://sheet.best/api/sheets/6ee5ead9-f4dd-44dc-9027-9febc4b3e821",{email:a.state.email,discordId:a.state.discordId,tgUsername:a.state.tgUsername,amount:a.state.amount,bascAddress:a.state.bscAddress,txId:e}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(f.a,{style:{textAlign:"center"}},r.a.createElement("div",{className:"row"},r.a.createElement(v.a,{style:{width:"60%"},className:"mx-auto pb-3 mt-5"},r.a.createElement(v.a.Body,null,r.a.createElement("div",{className:"mainDesc"},r.a.createElement("h1",null,"TABOOPUNKS"),r.a.createElement("br",null),r.a.createElement("p",{style:{fontSize:"0.9rem"}},"TABOOPUNKS are upto 10,000 uniquely generated characters, no two are exactly alike, and each of them can be officialy owned by a single person on the ethereum blockchain. They will have up to 300 attributes across 10 to 20 catagories to be entirely unique by at least 3 degrees of seperation."),r.a.createElement("p",{style:{fontSize:"0.9rem"}},"Not only are TABOOPUNKS beautifully designed collectible characters, they also can serve as your ticket to the world of exclusive content and VIP parties. They will basically grant you the owner, superpowers on the TABOO marketplace. From invitational private parties with our carefully selected supermodels to access to all areas on the TABOO marketplace and some yet undisclosed utilities."),r.a.createElement("hr",null),r.a.createElement("h4",null,"You'll be able to buy, bid, and offer punks for sale on the open market!"),r.a.createElement("br",null),r.a.createElement("p",{style:{fontSize:"1rem"},className:"text-danger"},r.a.createElement("i",null,"The TABOOPUNKS will be offered on a first come first serve basis to TABOO holders at a mint price determined by one factor: ",r.a.createElement("b",null,"if you hold any amount of $TABOO your minting price is 0.035ETH, otherwise, your minting price is 0.05ETH make sure to vbalidate you address to get a discount!")))),r.a.createElement(g.a,{noValidate:!0,validated:this.state.validated,onSubmit:this.handleSubmit},r.a.createElement(g.a.Floating,{className:"mb-3"},r.a.createElement(g.a.Control,{id:"email",type:"email",name:"email",placeholder:"name@example.com",value:this.state.email,required:!0,onChange:this.handleInputChange}),r.a.createElement("label",{htmlFor:"email"},"Email address")),r.a.createElement(g.a.Floating,{className:"mb-3"},r.a.createElement(g.a.Control,{id:"tgUsername",type:"text",name:"tgUsername",placeholder:"name",value:this.state.tgUsername,onChange:this.handleInputChange}),r.a.createElement("label",{htmlFor:"tgName"},"Telegram Username")),r.a.createElement(g.a.Floating,{className:"mb-3"},r.a.createElement(g.a.Control,{id:"discordId",type:"text",name:"discordId",placeholder:"discord",value:this.state.discordId,onChange:this.handleInputChange}),r.a.createElement("label",{htmlFor:"discordId"},"Discord Id")),r.a.createElement(g.a.Floating,{className:"mb-3"},r.a.createElement(g.a.Control,{id:"amount",type:"number",name:"amount",placeholder:"amount",value:this.state.amount,onChange:this.handleAmount,min:"1",required:!0}),r.a.createElement("label",{htmlFor:"amount"},"Amount ordering")),r.a.createElement(w.a,{className:"form-floating",size:"lg"},r.a.createElement(y.a,{placeholder:"$TABOO Holding Address","aria-label":"$TABOO Holding Address","aria-describedby":"validateAddress",onChange:this.handleAddressChange,value:this.state.bscAddress,disabled:this.state.valid?"disabled":""}),r.a.createElement(E.a,{variant:"outline-secondary",id:"",onClick:this.validateAddress},"Validate"),r.a.createElement("label",{htmlFor:"discordId"},"$TABOO Holding Address")),r.a.createElement("div",{style:{textAlign:"left"}},r.a.createElement(g.a.Text,{id:"validateAddress",muted:!0},this.state.validText)),r.a.createElement("br",null),r.a.createElement("h3",null,"Your Minting Price: ",this.state.price,"ETH"),r.a.createElement("br",null),r.a.createElement("div",{className:"row mb-3"},r.a.createElement(E.a,{id:"connect",onClick:this.connect,variant:"outline-danger"},"connect to ETH wallet")),r.a.createElement("div",{className:"row mb-3"},r.a.createElement(E.a,{id:"purchase",type:"submit",variant:"danger",disabled:this.state.isWalletConnected?"":"disabled"},"Purchase TABOOPUNKS"))))))))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(67);c.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[37,1,2]]]);
//# sourceMappingURL=main.f5149803.chunk.js.map