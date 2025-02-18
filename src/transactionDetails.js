import { formatEther } from 'https://esm.sh/viem';
import { newPublicClient } from './utilities/client.js';

const transactionDetailsDisplay = document.querySelector('#transactionDetails');

let client = undefined;

const initApp = () => {
    const hash = location.search.split("=")[1];
    client = newPublicClient();
    displayTransactionDetails(hash);
};


const displayTransactionDetails = async (hash) => {
    const block = await client.getBlock({ blockHash: hash});

    if(block.transactions.length === 0 ) {
        generateDisplay(block);
        return;
    }

    for(let trx of block.transactions) {
        const transaction = await client.getTransaction({
            hash: trx,
        });
        generateDisplay(block, transaction);
        // console.log(transaction);
    }
};

const generateDisplay = (block, transaction) => {
  let html = '';
  transactionDetailsDisplay.innerHTML = html;

  if(!transaction) {
    document.querySelector(".page-title").innerText = "No transactions :(";
    return;
  }

  html = `
<article class="trx-details">
        <section>
            <span>From:</span>
            <small>${transaction.from}</small>
        </section>
        <section>
            <span>To:</span>
            <small>${transaction.to}</small>
        </section>
        <section>
            <span>Transaction value:</span>
            <small>${formatEther(transaction.value)} ETH </small>
        </section>
        <section>
            <span>Gas used:</span>
            <small>${transaction.gas} WEI</small>
        </section>
        <section>
            <span>Transaction hash:</span>
            <small>${transaction.hash}</small> 
        </section>
</article>

<h4>Block Details:</h4>
    <article class="trx-details">
            <section>
                <span>Block number:</span>
                <small>${block.number}</small> 
            </section>
            <section>
                <span>Gas used for block:</span>
                <small>${block.gasUsed} WEI </small>
            </section>
            <section>
                <span>Gas Limit:</span>
                <small>${block.gasLimit} WEI</small>
            </section>
            <section>
                <span>Mined On:</span>
                <small>${new Date(parseInt(block.timestamp * 1000n)).toLocaleString()}</small>
            </section>
            <section>
                <span>Block Hash:</span>
                <small>${block.hash}</small>
            </section>
        </article>
  `;

  transactionDetailsDisplay.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', initApp);
