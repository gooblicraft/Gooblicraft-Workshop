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

// For Creating Block Options Dynamically
const container = document.getElementById('make_block_option');

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
});

//  Toggling Modal
const modal = document.getElementById('blocks_modal');

function clickBlockOption(id){
    alert(`Clicked ${blockOptions[id-1].label}`);
    modal.style.display = 'flex';
};

const inputFields = [
    {
        type: 'text',
        id: 'block_id_name',
        placeholder: 'e.g. example_block1',
        label: 'Block ID Name:'
    },
    {
        type: 'select',
        id: 'category',
        options: [
            { val: 'nature', text: 'Nature' },
            { val: 'construction', text: 'Construction' },
            { val: 'items', text: 'Items' }
        ],
        label: 'Menu Category:'
    },
    {
        type: 'text',
        id: 'block_tag',
        placeholder: 'e.g. only_plain_blocks',
        label: 'Block Tag:'
    },
    {
        type: 'text',
        id: 'display_name',
        placeholder: 'e.g. Example Block 1',
        label: 'Display Name:'
    },
    {
        type: 'text',
        id: 'block_geometry',
        placeholder: 'e.g. example_block_model1',
        label: 'Geometry:'
    },
    {
        type: 'text',
        id: 'texture_name',
        placeholder: 'e.g. example_block_texture1',
        label: 'Texture Name:'
    },
    {
        type: 'select',
        id: 'render_method',
        options: [
            { val: 'opaque', text: 'Opaque' },
            { val: 'alpha_test', text: 'Alpha Test' },
            { val: 'alpha_test_single', text: 'Alpha Test Single Sided' },
            { val: 'blend', text: 'Blend' }
        ],
        label: 'Render Method:'
    },
    { 
        type: 'textarea', 
        label: 'COLLISION BOX:', 
        id: 'collision_box', 
        placeholder: '{left-right,up-down,front-back}{x,y,z}' 
    },
    { 
        type: 'textarea', 
        label: 'SELECTION BOX:', 
        id: 'selection_box', 
        placeholder: '{left-right,up-down,front-back}{x,y,z}' 
    }
]

 function createInputField(inputField){
    let inputHtml = '';
    
    if(inputField.type === 'select'){
        const optionsHtml = inputField.options.map(option =>
            `<option value="${option.val}">${option.text}</option>`
        ).join('');

        inputHtml = `<select id="${inputField.id}">${optionsHtml}</select>`;
    }
    else if(inputField.type === 'textarea'){
        inputHtml = `<textarea id="${inputField.id}" placeholder="${inputField.placeholder}"></textarea>`;
    }
    else{
        inputHtml = `<input type="text" id="${inputField.id}" placeholder="${inputField.placeholder}"/>`;
    }
    return `
        <div class="style_block">
            <label for="${inputField.id}">${inputField.label}</label>
            ${inputHtml}
        </div>
    `;
 }

 function renderInputFields(){
    const inputFieldsContainer = document.getElementById('inputContainer');

    if(!inputFieldsContainer)return;

    inputFieldsContainer.innerHTML = inputFields.map(field => createInputField(field)).join('');
 }

 document.addEventListener('DOMContentLoaded', renderInputFields);