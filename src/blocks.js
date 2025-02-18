import { newPublicClient } from './utilities/client.js';
import { createElement, createTextElement } from './utilities/dom.js';

const blockList = document.querySelector('#list');
const heading = document.querySelector('h4');

let client = undefined;

const initApp = () => {
    client = newPublicClient();
    listAllBlocks();
};

const listAllBlocks = async () => {
    const blocks = await client.getBlockNumber();
    // console.log('Number of blocks:', blocks);
    heading.innerText = `Transactions:`;
    heading.classList.add('trx-details');

    const columnDiv = createElement('div');
    columnDiv.classList.add('section');
    columnDiv.appendChild(createTextElement('div', 'Block nr / Block hash / Timestamp'));
    blockList.appendChild(columnDiv);

    for (let i = blocks; i >= 0; i--) {
        const block = await client.getBlock ({ blockNumber: i});
        // console.log(block);
        const div = createElement('div');
        div.classList.add("section")
        div.appendChild(createTextElement('div', block.number));
        div.appendChild(createTextElement('div', block.hash));
        div.appendChild(createTextElement('div', new Date(parseInt(block.timestamp * 1000n)).toLocaleString()));
        blockList.appendChild(div);
        const button = createElement("a");
        button.innerText = "Show";
        button.classList.add('btn');
        button.classList.add('btn-rounded');
        button.style.width = '100px';
        button.href = `../pages/transaction.html?hash=${block.hash}`;

        div.appendChild(button);
    }
};

document.addEventListener('DOMContentLoaded', initApp);
