 alert("welcome to BLOCKCHAIN VOTING SYSTEM!");

 const web3 = new Web3(window.ethereum);
var account;
const CONTRACT_ADDR = "0x301306033Ba3F9D219c33b17BF32A9AE36FAA11A"
const CONTRACT_ABI =[
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_candidateName",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
 			}
 		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidateCount",
		"outputs": [
			{
				"internalType": "uint256",
 				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contract =new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR)


document.addEventListener("DOMContentLoaded", function(){
    if(window.ethereum){
        ethereum.request({method:"eth_requestAccounts"}).then((accounts) =>{
           account =accounts[0];
           console.log(account);
        })
    }
    else{
        console.log("Please Install Metamask!");
    }

    contract.methods.candidateCount().call().then((e) =>{
        const candidatesContainer = document.getElementById("candidatesContainer"); // Add an ID to your HTML container
        for(var i = 1; i <= e; i++){
            contract.methods.candidates(i).call().then((f) =>{
                console.log(f);
                // Create a new HTML element to display the candidate name
                document.getElementById(f.id).innerHTML = f.name;
                document.getElementById("candidate"+f.id).innerHTML=f.voteCount;
            })
        }
    })



})

function vote(){
    var candidateId = document.getElementById("candidate").value;
    const transaction = {
     from:account,
     to:CONTRACT_ADDR,
     data:contract.methods.vote(candidateId).encodeABI(),
     gas:320000
    }
 web3.eth.sendTransaction(transaction).on("transactionHash",function(hash){
     console.log("Transaction Hash",hash);
 });
 on("error" , function(error){
     console.log(error)
 })
 }

