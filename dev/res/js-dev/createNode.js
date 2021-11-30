import createNode from 'patterns/tx-createNode';

const html = '<div id="child" class="child">Child</div>';
const parent = document.getElementById('parent');
parent.appendChild(createNode(html));
