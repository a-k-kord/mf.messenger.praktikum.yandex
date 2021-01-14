const obj = {}
for(let form of document.forms) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        for (let input of event.target.elements) {
            if (input.tagName === 'INPUT') {
                obj[input.id] = input.value
            }
        }
        console.log(obj);
    });
}

function setUploadedFileName(input, fileNameLabelSelector, errorLabelSelector) {
    const filename = input.value.split('\\').pop()
    const labelEl = document.querySelector(fileNameLabelSelector)
    const errorEl = document.querySelector(errorLabelSelector)
    if(filename) {
        labelEl.textContent = filename
        labelEl.hidden = false
        input.parentNode.style.display = 'none'
        errorEl.hidden = true
    } else {
        labelEl.hidden = true
        errorEl.hidden = false
        input.parentNode.style.display = 'block'
    }

    
}