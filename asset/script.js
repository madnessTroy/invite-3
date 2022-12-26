window.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.querySelector('input[type=file]')
    const downloadBtn = document.querySelector('#download__btn')

    init()

    if (fileInput.files.length) preview()

    downloadBtn.addEventListener('click', download)
})

function init() {
    // set style cho thẻ (.invite__preview img)
    // trục X, Y -> object-position: X% Y%; (mặc định 50%)
    // zoom -> transform: scale(1); (mặc định >= 1)

    const zoomRange = document.querySelector('#input__zoom')
    const horizontalRange = document.querySelector('#input__x')
    const verticalRange = document.querySelector('#input__y')
    const imageOutput = document.querySelector('#output')
    let zoomVal = 1
    let horizonVal = 0
    let verticalVal = 0
    zoomRange.oninput = e => {
        const value = e.target.value
        zoomRange.style.background = `linear-gradient(90deg, #212c3c 0%, #212c3c ${value * 50}%, #fff ${value * 50}%, #fff 100%)`
        zoomVal = +value + 1
        imageOutput.style.transform = `scale(${zoomVal}) translateX(${horizonVal}px) translateY(${verticalVal}px)`
    }

    horizontalRange.oninput = e => {
        const value = e.target.value
        horizontalRange.style.background = `linear-gradient(90deg, #212c3c 0%, #212c3c ${value * 100}%, #fff ${value * 100}%, #fff 100%)`
        horizonVal = (value * 600) - 300
        imageOutput.style.transform = `scale(${zoomVal}) translateX(${horizonVal}px) translateY(${verticalVal}px)`
    }

    verticalRange.oninput = e => {
        const value = e.target.value
        verticalRange.style.background = `linear-gradient(90deg, #212c3c 0%, #212c3c ${value * 100}%, #fff ${value * 100}%, #fff 100%)`
        verticalVal = (value * 600) - 300
        imageOutput.style.transform = `scale(${zoomVal}) translateX(${horizonVal}px) translateY(${verticalVal}px)`
    }

    // input name
    const inputName = document.querySelector('.input__name')
    const showName = document.querySelector('.invite__name')
    showName.innerText = inputName.value
    inputName.addEventListener('input', e => {
        showName.innerText = e.target.value
    })

    // Auto fit font-size
    window.fitText(showName, 1.2)
}

// Upload img
function preview() {
    const output = document.querySelector('#output')
    if (output) output.src = URL.createObjectURL(event.target.files[0])
}

// Download img
async function download() {
    const target = document.querySelector('#boundary')
    const downloadURI = document.querySelector('#download__link')
    const showName = document.querySelector('.invite__name')


    const config = {
        windowWidth: 2048,
        windowHeight: 1000,
        backgroundColor: null
    }
    try {
        showName.style.top = '52%'
        const canvas = await html2canvas(target, config)
        showName.style.top = '57%'

        // Download section
        const base64image = canvas.toDataURL('image/png')
        downloadURI.href = base64image
        downloadURI.download = 'invitation'
        return downloadURI.click()
    } catch (e) {
        console.log(e)
    }
}
