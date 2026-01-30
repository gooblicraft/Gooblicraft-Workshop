const blockOptions = [
    { id:1, type: 'plain', label: 'Plain', img:'images/cards/plain_block.png'},
    { id:2, type: 'rotateble', label: 'Rotateble', img:'images/cards/rotateble_block.png'},
    { id:3, type: 'changeable', label: 'Changeable', img:'images/cards/changeable_block.png'},
    { id:4, type: '1by2_block', label: '1by2 Block', img:'images/cards/1by2_block.png'},
    { id:5, type: '2by1_block', label: '2by1 Block', img:'images/cards/2by1_block.png'},
    { id:6, type: 'vertical', label: 'Vertical', img:'images/cards/vertical_block.png'},
    { id:7, type: 'horizontal', label: 'Horizontal', img:'images/cards/horizontal_block.png'},
    { id:8, type: 'door', label: 'Door', img:'images/cards/door_block.png'}
];

const container = document.getElementById('make_block_option');
// const modal = document.getElementById('myModal');

function clickBlockOption(id){
    alert(`Clicked ${blockOptions[id-1].label}`);
};

blockOptions.forEach(option =>{
    // For creating multiple buttons 
    const block_option = document.createElement('button');
    block_option.className ='block_card';
    block_option.id = option.type;
    
    // console.log(block_option);
    block_option.onclick = () => clickBlockOption(option.id);

    block_option.innerHTML = `
        <img src="${option.img}" alt="${option.label}">
        <h2>${option.label}</h2>
    `;

    
    container.appendChild(block_option);

    // For creating modal for the buttons

    const block_modal = document.createElement('div');
    block_modal.id = `block_modal_${option.type}`;
    console.log(block_modal.id);

    container.appendChild(block_modal);
});