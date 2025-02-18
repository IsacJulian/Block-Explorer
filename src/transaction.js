import { parseEther, formatEther } from 'https://esm.sh/viem';
import { newPublicClient, newWalletClient } from './utilities/client.js';

const form = document.querySelector('#transaction-form');
const fromInput = document.querySelector('#from');
const toInput = document.querySelector('#to');
const valueInput = document.querySelector('#value');

const balanceButton = document.querySelector('#balance-button');

const transactionDetailsDisplay = document.querySelector('#transactionDetails');

const balanceDisplay = document.querySelector('#current-balance');
const trxCountDisplay = document.querySelector('#transaction-count');

let walletClient = undefined;
let publicClient = undefined;

let currentFromAddress;

const initApp = () => {
    const hash = location.search.split("=")[1];
    publicClient = newPublicClient();
    walletClient = newWalletClient();
    getBalance();
};



const getBalance = async (e) => {
    if (e) e.preventDefault();
    const address = fromInput.value.trim();

    if (!address) {
        balanceDisplay.innerText = "";
        trxCountDisplay.innerText = "";
        return;
      }

      try {
        const balance = await publicClient.getBalance({ address });
        balanceDisplay.innerText = `Current balance: ${parseFloat(formatEther(balance)).toFixed(2)} ETH`;
        
        const transactionCount = await publicClient.getTransactionCount({ address });
        trxCountDisplay.innerText = `${transactionCount} transaction(s) made`;

        currentFromAddress = address;

      } catch (error) {
        console.error(error);
        balanceDisplay.innerText = "Error while getting balance";
        trxCountDisplay.innerText = "Error while getting number of transactions";
      }
    };


    const createTransaction = async (e) => {
        e.preventDefault();
        console.log("Creating transaction...")

        await getBalance();
        
        if (!currentFromAddress) {
            console.error("No sender adress chosen. Check balance first.");
            return;
          }
        
        try {
            await walletClient.sendTransaction({ 
                account: currentFromAddress, 
                to: toInput.value, 
                value: parseEther(valueInput.value), 
            });

            setTimeout(() => {
                location.href = "./transactionDetails.html";
            }, 2000);
    
        } catch (error) {
            console.error(error);
        }
        };


document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', createTransaction);
balanceButton.addEventListener('click', getBalance);
