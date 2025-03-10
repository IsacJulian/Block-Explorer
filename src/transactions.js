import { formatEther } from 'https://esm.sh/viem';
import { newPublicClient } from '../src/utilities/client.js';
import { createElement,createTextElement } from "../src/utilities/dom.js";

const transactionList = document.querySelector('#list');

let client = undefined;

const initApp = () => {
    client = newPublicClient();
    listTransactions();
};

const listTransactions = async () => {
    const blocks = await client.getBlockNumber();

    for (let i = blocks; i >= 0; i--) {
    const block = await client.getBlock({ blockNumber: i });


    const transactions = block.transactions;

    for(let transaction of transactions) { 
        console.log(transaction);

        const trx = await client.getTransaction({ hash: transaction }); 
        console.log(trx); 

        const div = createElement("div");
        div.classList.add("section");

        div.appendChild(createTextElement("div", trx.from));
        div.appendChild(createTextElement("div", trx.to));
        div.appendChild(createTextElement("div", trx.gas));
        div.appendChild(createTextElement("div", `${parseFloat(formatEther(trx.value)).toFixed(2)} ETH`));

        transactionList.appendChild(div);

        }
    }
};

document.addEventListener('DOMContentLoaded', initApp);
