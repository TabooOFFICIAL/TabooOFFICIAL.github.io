(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{354:function(e,t,n){e.exports=n(806)},359:function(e,t,n){},373:function(e,t){},376:function(e,t){},378:function(e,t){},382:function(e,t){},407:function(e,t){},409:function(e,t){},418:function(e,t){},420:function(e,t){},431:function(e,t){},433:function(e,t){},551:function(e,t){},553:function(e,t){},560:function(e,t){},561:function(e,t){},585:function(e,t){},592:function(e,t){},642:function(e,t){},684:function(e,t){},801:function(e,t,n){},806:function(e,t,n){"use strict";n.r(t);var a=n(11),c=n.n(a),r=n(338),o=n.n(r),s=(n(359),n(43)),i=n(0),l=n.n(i),u=n(4),d=n(5),f=n(8),p=n(14),h=n(13),m=n(811),b=n(812),v=n(186),w=n.n(v),g=n(340),y=n.n(g),A=n(351),k=n(341),O=n.n(k),x=n(350),S=(n(801),function(e){Object(p.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(d.a)(this,n);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={web3:null,provider:null,accounts:null,isWalletConnected:!1,bscAddress:"",email:"",discordId:"",tgUsername:"",price:.05,amount:1,validated:!1,purchasePending:!1},e.componentDidMount=Object(u.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n={walletconnect:{package:x.a,options:{infuraId:"43e7c1b12410407880552f46b67d3e30"}}},(a=new O.a({providerOptions:n})).clearCachedProvider(),e.setState({provider:a,isWalletConnected:!1});case 4:case"end":return t.stop()}}),t)}))),e.isWalletConnected=function(){var t=Object(u.a)(l.a.mark((function t(n){var a,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=!1,t.next=3,n.eth.getAccounts();case 3:(c=t.sent).length>0&&(a=!0),e.setState({isWalletConnected:a,accounts:c});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleAddressChange=function(t){(!t.target.value||t.target.value.toString().lenght<42)&&e.setState({valid:!1}),e.setState({bscAddress:t.target.value})},e.handleInputChange=function(t){var n=t.target,a="checkbox"===n.type?n.checked:n.value,c=n.name;e.setState(Object(s.a)({},c,a))},e.handleAmount=function(t){e.setState({amount:t.target.value})},e.handleSubmit=function(t){!1===t.currentTarget.checkValidity()?(t.preventDefault(),t.stopPropagation()):(t.preventDefault(),e.purchase()),e.setState({validated:!0})},e.validateAddress=Object(u.a)(l.a.mark((function t(){var n,a,c,r,o,s,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],type:"function"}],"0x9abDbA20EdFbA06B782126b4D8d72A5853918FD0",a=new w.a("https://bsc-dataseed1.binance.org:443"),c=.05,r=!1,o="the provided address doesn't hold any $TABOO, please verify",t.prev=6,s=new a.eth.Contract(n,"0x9abDbA20EdFbA06B782126b4D8d72A5853918FD0"),t.next=10,s.methods.balanceOf(e.state.bscAddress).call();case 10:i=t.sent,a.utils.fromWei(i)>0&&(c=.035,r=!0,o="You are eligible for a TABOOPUNK price reduction! Thank you for holding $TABOO"),e.setState({price:c,valid:r,validText:o}),t.next=18;break;case 16:t.prev=16,t.t0=t.catch(6);case 18:e.setState({price:c,valid:r,validText:o});case 19:case"end":return t.stop()}}),t,null,[[6,16]])}))),e.connect=Object(u.a)(l.a.mark((function t(){var n,a,c,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.state.provider,t.next=3,n.connect();case 3:if(!(a=t.sent)){t.next=13;break}return c=new w.a(a),n.on("disconnect",(function(t){e.setState({web3:null,accounts:null,isWalletConnected:!1}),t&&console.log(t)})),t.next=9,c.eth.getAccounts();case 9:r=t.sent,e.setState({web3:c,accounts:r,isWalletConnected:!0}),t.next=14;break;case 13:e.setState({web3:null,accounts:null,isWalletConnected:!1});case 14:case"end":return t.stop()}}),t)}))),e.purchase=Object(u.a)(l.a.mark((function t(){var n,a,c,r,o,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.state,c=a.web3,r=a.isWalletConnected,o=a.accounts,!(r&&e.state.amount>0)){t.next=19;break}if(!c){t.next=6;break}return t.next=5,c.eth.net.getNetworkType();case 5:n=t.sent;case 6:if("main"===n){t.next=10;break}alert("plese make sure your wallet is connected and  your network is set to Ethereum's Mainnet on metamask"),t.next=19;break;case 10:if(!(o.lenght>0)){t.next=14;break}e.doPurchase(),t.next=19;break;case 14:return t.next=16,c.eth.getAccounts();case 16:s=t.sent,e.setState({accounts:s}),e.doPurchase();case 19:case"end":return t.stop()}}),t)}))),e.doPurchase=Object(u.a)(l.a.mark((function t(){var n,a,c,r,o,s,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.state,a=n.web3,c=n.accounts,r="0xf296acbfa8f702cbc9a90c66fbd392910d504ea2",o=e.state.price*e.state.amount,s=o.toString(),i=a.utils.toWei(s,"ether"),t.next=7,a.eth.getAccounts();case 7:t.sent.length>0?a.eth.sendTransaction({from:c[0],to:r,value:i}).on("transactionHash",(function(t){e.storeData(t),e.sendConfirmationEmail(t),e.setState({transactionFullfilled:"Congratulations! you have successfully purchased a taboopunk, an email confirmation will arrive to ".concat(e.state.email," shortly, Check SPAM if you dont see it in your inbox"),purchasePending:!0})})).on("error",console.error):alert("No wallet connected");case 9:case"end":return t.stop()}}),t)}))),e.storeData=function(t){y.a.post("https://sheet.best/api/sheets/6ee5ead9-f4dd-44dc-9027-9febc4b3e821",{email:e.state.email,discordId:e.state.discordId,tgUsername:e.state.tgUsername,amount:e.state.amount,bscAddress:e.state.bscAddress,txId:t}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},e.sendConfirmationEmail=function(){var t=Object(u.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A.a.send("service_9mug7sb","template_iw7epik",{email:e.state.email,amount:e.state.amount,txId:n,purchasePrice:e.state.price},"user_iOTbyZD6ZSThfa1kFJjId");case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(f.a)(n,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(m.a,{style:{textAlign:"center"}},c.a.createElement("div",{className:"row"},c.a.createElement(b.a,{className:"mx-auto pb-3 mt-lg-5"},c.a.createElement(b.a.Body,null,c.a.createElement("div",{className:"mainDesc"},c.a.createElement("h1",null,"TABOOPUNKS"),c.a.createElement("br",null),c.a.createElement("p",{style:{fontSize:"0.9rem"}},"TABOOPUNKS are up to 10,000 uniquely generated characters, no two are exactly alike, and each of them can be officially owned by a single person on the ethereum blockchain. They will have up to 300 attributes across 10 to 20 categories to be entirely unique by at least 3 degrees of separation."),c.a.createElement("p",{style:{fontSize:"0.9rem"}},"Not only are TABOOPUNKS beautifully designed collectible characters, they also can serve as your ticket to the world of exclusive content and VIP parties. They will basically grant you the owner, superpowers on the TABOO marketplace. From invitational private parties with our carefully selected supermodels to access to all areas on the TABOO marketplace and some yet undisclosed utilities."),c.a.createElement("hr",null)),c.a.createElement("div",{className:"mt-5 pt-5 pb-5 mb-5"},c.a.createElement("h1",null,"TABOOPUNKS PURCHASES ARE NO LONGER AVAILABLE. "),c.a.createElement("h1",null,"THANK YOU TO ALL THOSE THAT PURCHASED")))))))}}]),n}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(803);o.a.render(c.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[354,1,2]]]);
//# sourceMappingURL=main.213c37e5.chunk.js.map