// State management
let elements = []; // Array of element objects
let selectedId = null;
let nextId = 1;
let isDragging = false;
let isResizing = false;
let isRotating = false;
let dragStartX, dragStartY;
let resizeDirection = '';
let rotateStartAngle;

const canvas = document.getElementById('canvas');   //comment
const layersList = document.getElementById('layers-list');
const propWidth = document.getElementById('prop-width');
const propHeight = document.getElementById('prop-height');
const propBgColor = document.getElementById('prop-bgcolor');
const propText = document.getElementById('prop-text');

// Load from localStorage on init
function loadLayout() {
    const saved = localStorage.getItem('layout');
    if (saved) {
        elements = JSON.parse(saved);
        nextId = elements.reduce((max, el) => Math.max(max, el.id), 1) + 1;
        elements.forEach(createElementDOM);
        updateLayersPanel();
        updateZIndices();
    }
}

// Save to localStorage
function saveLayout() {
    localStorage.setItem('layout', JSON.stringify(elements));
}

// Create DOM element from data
function createElementDOM(data) {
    const el = document.createElement('div');
    el.classList.add('element');
    el.id = `el-${data.id}`;
    el.style.left = `${data.x}px`;
    el.style.top = `${data.y}px`;
    el.style.width = `${data.width}px`;
    el.style.height = `${data.height}px`;
    el.style.transform = `rotate(${data.rotation}deg)`;
    el.style.backgroundColor = data.styles.backgroundColor;
    if (data.type === 'text') {
        el.innerHTML = data.content;
    }
    canvas.appendChild(el);
    return el;
}

// Add new element
function addElement(type) {
    const data = {
        id: nextId++,
        type,
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        rotation: 0,
        styles: { backgroundColor: type === 'rect' ? '#ccc' : 'transparent' },
        content: type === 'text' ? 'Text' : ''
    };
    elements.push(data);
    createElementDOM(data);
    updateLayersPanel();
    updateZIndices();
    saveLayout();
}

// Update layers panel
function updateLayersPanel() {
    layersList.innerHTML = '';
    elements.forEach((data, index) => {
        const li = document.createElement('li');
        li.textContent = `${data.type} #${data.id}`;
        li.dataset.id = data.id;
        li.addEventListener('click', () => selectElement(data.id));
        const upBtn = document.createElement('button');
        upBtn.textContent = 'Up';
        upBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            moveLayer(index, -1);
        });
        const downBtn = document.createElement('button');
        downBtn.textContent = 'Down';
        downBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            moveLayer(index, 1);
        });
        li.appendChild(upBtn);
        li.appendChild(downBtn);
        layersList.insertBefore(li, layersList.firstChild); // Reverse for z-index order (top at top)
    });
}

// Move layer up/down
function moveLayer(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= elements.length) return;
    [elements[index], elements[newIndex]] = [elements[newIndex], elements[index]];
    updateZIndices();
    updateLayersPanel();
    saveLayout();
}

// Update z-indices based on array order
function updateZIndices() {
    elements.forEach((data, index) => {
        const el = document.getElementById(`el-${data.id}`);
        if (el) el.style.zIndex = index + 1;
    });
}

// Select element
function selectElement(id) {
    deselectAll();
    selectedId = id;
    const data = elements.find(e => e.id === id);
    const el = document.getElementById(`el-${id}`);
    if (!el) return;
    el.classList.add('selected');

    // Add resize handles
    ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(dir => {
        const handle = document.createElement('div');
        handle.classList.add('resize-handle');
        handle.dataset.dir = dir;
        positionHandle(handle, el, dir);
        canvas.appendChild(handle);
    });

    // Add rotate handle
    const rotateHandle = document.createElement('div');
    rotateHandle.classList.add('rotate-handle');
    positionRotateHandle(rotateHandle, el);
    canvas.appendChild(rotateHandle);

    // Update properties panel
    updatePropertiesPanel(data);
}

// Deselect all
function deselectAll() {
    selectedId = null;
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.resize-handle, .rotate-handle').forEach(h => h.remove());
    updatePropertiesPanel(null);
}

// Position resize handle
function positionHandle(handle, el, dir) {
    const rect = el.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    let left = rect.left - canvasRect.left;
    let top = rect.top - canvasRect.top;
    const width = rect.width;
    const height = rect.height;

    if (dir.includes('right')) left += width - 4;
    if (dir.includes('bottom')) top += height - 4;
    if (dir.includes('left')) left -= 4;
    if (dir.includes('top')) top -= 4;

    handle.style.left = `${left}px`;
    handle.style.top = `${top}px`;
}

// Position rotate handle (top middle)
function positionRotateHandle(handle, el) {
    const rect = el.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const left = (rect.left - canvasRect.left) + (rect.width / 2) - 4;
    const top = (rect.top - canvasRect.top) - 12; // Above top
    handle.style.left = `${left}px`;
    handle.style.top = `${top}px`;
}

// Update positions of handles when resizing/dragging
function updateHandles() {
    if (!selectedId) return;
    const el = document.getElementById(`el-${selectedId}`);
    document.querySelectorAll('.resize-handle').forEach(h => positionHandle(h, el, h.dataset.dir));
    const rotateHandle = document.querySelector('.rotate-handle');
    if (rotateHandle) positionRotateHandle(rotateHandle, el);
}

// Update properties panel
function updatePropertiesPanel(data) {
    if (!data) {
        propWidth.value = '';
        propHeight.value = '';
        propBgColor.value = '';
        propText.value = '';
        propText.style.display = 'none';
        return;
    }
    propWidth.value = data.width;
    propHeight.value = data.height;
    propBgColor.value = data.styles.backgroundColor || '#ffffff';
    if (data.type === 'text') {
        propText.value = data.content;
        propText.style.display = 'block';
    } else {
        propText.style.display = 'none';
    }
}

// Get element data by id
function getElementData(id) {
    return elements.find(e => e.id === id);
}

// Event handlers
canvas.addEventListener('mousedown', (e) => {
    const target = e.target;
    if (target.classList.contains('resize-handle')) {
        isResizing = true;
        resizeDirection = target.dataset.dir;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
    } else if (target.classList.contains('rotate-handle')) {
        isRotating = true;
        const data = getElementData(selectedId);
        const el = document.getElementById(`el-${selectedId}`);
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        rotateStartAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI - data.rotation;
    } else if (target.classList.contains('element')) {
        const id = parseInt(target.id.replace('el-', ''));
        selectElement(id);
        // console.log(selectedId);
        isDragging = true;
        dragStartX = e.clientX - target.offsetLeft;
        dragStartY = e.clientY - target.offsetTop;
    } else {
        deselectAll();
    }
});

document.addEventListener('mousemove', (e) => {
    if (!selectedId) return;
    console.log(selectedId);
    const data = getElementData(selectedId);
    const el = document.getElementById(`el-${selectedId}`);
    if (isDragging) {
        let newX = e.clientX - dragStartX;
        let newY = e.clientY - dragStartY;
        newX = Math.max(0, Math.min(newX, canvas.clientWidth - data.width));
        newY = Math.max(0, Math.min(newY, canvas.clientHeight - data.height));
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
        data.x = newX;
        data.y = newY;
        updateHandles();
    } else if (isResizing) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        let newX = data.x;
        let newY = data.y;
        let newWidth = data.width;
        let newHeight = data.height;

        if (resizeDirection.includes('right')) newWidth += dx;
        if (resizeDirection.includes('bottom')) newHeight += dy;
        if (resizeDirection.includes('left')) {
            newX += dx;
            newWidth -= dx;
        }
        if (resizeDirection.includes('top')) {
            newY += dy;
            newHeight -= dy;
        }

        newWidth = Math.max(10, newWidth);
        newHeight = Math.max(10, newHeight);
        newX = Math.max(0, Math.min(newX, canvas.clientWidth - newWidth));
        newY = Math.max(0, Math.min(newY, canvas.clientHeight - newHeight));

        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
        el.style.width = `${newWidth}px`;
        el.style.height = `${newHeight}px`;
        data.x = newX;
        data.y = newY;
        data.width = newWidth;
        data.height = newHeight;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        updateHandles();
    } else if (isRotating) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI - rotateStartAngle;
        el.style.transform = `rotate(${angle}deg)`;
        data.rotation = angle;
        updateHandles();
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    isResizing = false;
    isRotating = false;
    saveLayout();
});

// Keyboard events
document.addEventListener('keydown', (e) => {
    if (!selectedId) return;
    const data = getElementData(selectedId);
    const el = document.getElementById(`el-${selectedId}`);
    if (e.key === 'Delete') {
        el.remove();
        elements = elements.filter(e => e.id !== selectedId);
        deselectAll();
        updateLayersPanel();
        updateZIndices();
        saveLayout();
    } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        let dx = 0, dy = 0;
        if (e.key === 'ArrowLeft') dx = -5;
        if (e.key === 'ArrowRight') dx = 5;
        if (e.key === 'ArrowUp') dy = -5;
        if (e.key === 'ArrowDown') dy = 5;
        let newX = data.x + dx;
        let newY = data.y + dy;
        newX = Math.max(0, Math.min(newX, canvas.clientWidth - data.width));
        newY = Math.max(0, Math.min(newY, canvas.clientHeight - data.height));
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
        data.x = newX;
        data.y = newY;
        updateHandles();
        saveLayout();
    }
});

// Properties changes
propWidth.addEventListener('input', (e) => {
    if (!selectedId) return;
    const data = getElementData(selectedId);
    const el = document.getElementById(`el-${selectedId}`);
    data.width = Math.max(10, parseInt(e.target.value) || 100);
    el.style.width = `${data.width}px`;
    updateHandles();
    saveLayout();
});

propHeight.addEventListener('input', (e) => {
    if (!selectedId) return;
    const data = getElementData(selectedId);
    const el = document.getElementById(`el-${selectedId}`);
    data.height = Math.max(10, parseInt(e.target.value) || 50);
    el.style.height = `${data.height}px`;
    updateHandles();
    saveLayout();
});

propBgColor.addEventListener('input', (e) => {
    if (!selectedId) return;
    const data = getElementData(selectedId);
    const el = document.getElementById(`el-${selectedId}`);
    data.styles.backgroundColor = e.target.value;
    el.style.backgroundColor = e.target.value;
    saveLayout();
});

propText.addEventListener('input', (e) => {
    if (!selectedId) return;
    const data = getElementData(selectedId);
    const el = document.getElementById(`el-${selectedId}`);
    if (data.type === 'text') {
        data.content = e.target.value;
        el.innerHTML = e.target.value;
        saveLayout();
    }
});

// Add buttons
document.getElementById('add-rect').addEventListener('click', () => addElement('rect'));
document.getElementById('add-text').addEventListener('click', () => addElement('text'));

// Export JSON
document.getElementById('export-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(elements, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.json';
    a.click();
});

// Export HTML
document.getElementById('export-html').addEventListener('click', () => {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = `${canvas.clientWidth}px`;
    container.style.height = `${canvas.clientHeight}px`;
    elements.forEach(data => {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = `${data.x}px`;
        el.style.top = `${data.y}px`;
        el.style.width = `${data.width}px`;
        el.style.height = `${data.height}px`;
        el.style.transform = `rotate(${data.rotation}deg)`;
        el.style.backgroundColor = data.styles.backgroundColor;
        el.style.zIndex = elements.indexOf(data) + 1;
        if (data.type === 'text') el.innerHTML = data.content;
        container.appendChild(el);
    });
    const html = `<html><body>${container.outerHTML}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.html';
    a.click();
});

// Initialize
loadLayout();