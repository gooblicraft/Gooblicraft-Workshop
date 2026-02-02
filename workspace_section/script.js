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

// For Creating Input Fields Dynamically (Dito me mag-aadd ng input fields na pinapalabas)
const inputFields = [
    {
        type: 'text',
        id: 'block_id_name',
        placeholder: 'e.g. custom_block1',
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
        placeholder: 'e.g. Custom Block 1',
        label: 'Display Name:'
    },
    {
        type: 'text',
        id: 'block_geometry',
        placeholder: 'e.g. custom_block_model1',
        label: 'Geometry:'
    },
    {
        type: 'text',
        id: 'texture_name',
        placeholder: 'e.g. custom_block_texture1',
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
    },
    {
        type: 'number',
        id: 'light_emission',
        placeholder: 'e.g. 0.5',
        label: 'Light Emission:',
        min: 0,
        max: 15
    }
]

// My function to create input fields and tinatabulate
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
    else if(inputField.type === 'number'){
        inputHtml = `<input type="number" id="${inputField.id}" placeholder="${inputField.placeholder}" min="${inputField.min}" max="${inputField.max}"/>`;
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

 // Rendering the input fields
 function renderInputFields(){
    const inputFieldsContainer = document.getElementById('inputContainer');

    if(!inputFieldsContainer)return;

    inputFieldsContainer.innerHTML = inputFields.map(field => createInputField(field)).join('');

    inputFieldsContainer.addEventListener('input', updateLivePreview);
    updateLivePreview()
 }

 document.addEventListener('DOMContentLoaded', renderInputFields);

// Live Preview Function sa Right Section (Yung Box)
 
// Sinusubukang gawing Object/Array ang string. Pag mali ang format, ibabalik niya as String.
function safeJsonParse(input) {
    try {
        // Ttry niyang i-convert (e.g., "true" -> true, "1" -> 1, "{...}" -> Object)
        return JSON.parse(input);
    } catch (e) {
        // Pag nag-error (invalid format), ibabalik lang niya yung original text (string)
        return input; 
    }
}

function updateLivePreview(){
    // Block ID
    let rawId = document.getElementById('block_id_name').value || 'custom_block1';
    const blockId_val = rawId.replace(/ /g, '_');

    // Block Tag
    let rawTag = document.getElementById('block_tag').value || 'only_plain_blocks';
    const blockTag_val = rawTag.replace(/ /g, '_');

    // Geometry
    let rawGeo = document.getElementById('block_geometry').value || 'custom_block_model1';
    const blockGeometry_val = rawGeo.replace(/ /g, '_');

    // Texture Name
    let rawTexture = document.getElementById('texture_name').value || 'custom_block_texture1';
    const textureName_val = rawTexture.replace(/ /g, '_');

    // --- EXEMPTED / NO CHANGES (Stay as is) ---
    
    // Category (Dropdown)
    const category_val = document.getElementById('category').value || 'nature';
    const renderMethod_val = document.getElementById('render_method').value || 'opaque';

    // Display Name (Ito gusto mong may Space, kaya WALANG replace)
    const displayName_val = document.getElementById('display_name').value || 'Custom Block 1';

    // Light Emission (Number logic)
    const lightInput = document.getElementById('light_emission')?.value;
    const lightEmission_val = lightInput ? Number(lightInput) : 0;
 
    // JSON Boxes (Parsing Logic)
    const rawCollision = document.getElementById('collision_box').value;
    const collisionBox_val = rawCollision ? safeJsonParse(rawCollision) : safeJsonParse('{"origin": [-8, 0, -8], "size": [16, 16, 16]}');
 
    const rawSelection = document.getElementById('selection_box').value;
    const selectionBox_val = rawSelection ? safeJsonParse(rawSelection) : safeJsonParse('{"origin": [-8, 0, -8], "size": [16, 16, 16]}');
 
    const previewData = {
        "format_version": "1.21.70",
        "minecraft:block": {
            "description": {
                "identifier": `gooblideco:${blockId_val}`,
                "menu_category": {
                    "category": category_val
                },
                "traits": {
                    "minecraft:placement_direction": {
                        "enabled_states": ["minecraft:cardinal_direction"]
                    }
                }
            },
            "permutations": [
                {
                    "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
                    "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } }
                },
                {
                    "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
                    "components": { "minecraft:transformation": { "rotation": [ 0, 0, 0 ] } }
                },
                {
                    "condition": "q.block_state('minecraft:cardinal_direction') == 'east'",
                    "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } }
                },
                {
                    "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
                    "components": { "minecraft:transformation": { "rotation": [ 0, -90, 0 ] } }
                }
            ],
            "components": {
                [`tag:${blockTag_val}`]: {},
                "minecraft:display_name": displayName_val,
                "minecraft:geometry": `geometry.${blockGeometry_val}`,
                "minecraft:material_instances": {
                    "*": {
                        "texture": textureName_val,
                        "render_method": renderMethod_val
                    }
                },
                "minecraft:collision_box": collisionBox_val,
                "minecraft:selection_box": selectionBox_val,
                "minecraft:light_dampening": 0,
                "minecraft:light_emission": lightEmission_val // Ito number na ngayon
            }
        }
    };
 
    const jsonCodeElement = document.getElementById('jsonCode');
    if (jsonCodeElement) {
        jsonCodeElement.textContent = JSON.stringify(previewData, null, 4);
    }
}

async function copyCode() {
    // Get the text from the input field
    let inputElement = document.getElementById('jsonCode');
    let textToCopy = inputElement.textContent;

    try {
        await navigator.clipboard.writeText(textToCopy);
        console.log('Text copied to clipboard');
        alert('Copied the text: ' + textToCopy);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

function saveCode() {
    const previewContent = document.getElementById('jsonCode').textContent;
    const rawName = document.getElementById('block_id_name').value || 'custom_block1';
    const cleanName = rawName.replace(/ /g, '_');
    const fileName = `${cleanName}.json`;

    const blob = new Blob([previewContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}
    