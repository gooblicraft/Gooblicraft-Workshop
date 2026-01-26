const blockOptions = [
    { type: 'plain', label: 'Plain', img:'images/cards/plain_block.png'},
    { type: 'rotateble', label: 'Rotateble', img:'images/cards/rotateble_block.png'},
    { type: 'changeable', label: 'Changeable', img:'images/cards/changeable_block.png'},
    { type: '1by2_block', label: '1by2 Block', img:'images/cards/1by2_block.png'},
    { type: '2by1_block', label: '2by1 Block', img:'images/cards/2by1_block.png'},
    { type: 'vertical', label: 'Vertical', img:'images/cards/vertical_block.png'},
    { type: 'horizontal', label: 'Horizontal', img:'images/cards/horizontal_block.png'},
    { type: 'door', label: 'Door', img:'images/cards/door_block.png'}
]

const container = document.getElementById('make_block_option');

blockOptions.forEach(option =>{
    const block_option = document.createElement('div');
    block_option.className='block_card';
    
    block_option.onclick = function() {
        window.alert("You Clicked it!")
    };

    block_option.innerHTML = `
        <img src="${option.img}" alt="${option.label}">
        <h2>${option.label}</h2>
    `;
    container.appendChild(block_option);
})