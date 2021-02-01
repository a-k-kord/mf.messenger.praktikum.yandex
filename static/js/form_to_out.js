function preventSubmit(event) {
    const obj = {}
    for (let form of document.forms) {
        event.preventDefault();
        const inputs = form.querySelectorAll('input');
        for (let input of inputs) {
            var event = new Event('blur', {
                bubbles: true,
                cancelable: true,
            });

            input.dispatchEvent(event);
            obj[input.id] = input.value
        }
        console.log(obj);
    }
}

function setUploadedFileName(input, fileNameLabelSelector, errorLabelSelector) {
    const filename = input.value.split('\\').pop()
    const labelEl = document.querySelector(fileNameLabelSelector)
    const errorEl = document.querySelector(errorLabelSelector)
    if (filename) {
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