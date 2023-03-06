let diff_start = false
let left = null
let right = null
let handler = null
let current_diff = null
let position = null

function update_diff() {
    let diff_position = left.getBoundingClientRect().left
    let diff_width = left.querySelector('.image').clientWidth
    let left_position = position - diff_position
    let percents = (left_position / diff_width) * 100
    let percents_left = 100 - percents

    percents = Math.max(0, Math.min(percents, 100))
    percents_left = Math.max(0, Math.min(percents_left, 100))

    handler.style.left = percents + '%'
    left.style.width = percents + '%'
    right.style.width = percents_left + '%'
}

let moveEvents = ['mousemove', 'touchmove']

for (let event of moveEvents) {
    window.addEventListener(event, (e) => {
        if (diff_start) {
            position = e.clientX || e.originalEvent.changedTouches[0].clientX
            update_diff()
        }
    })
}

////

let stopEvents = ['mouseup', 'touchend']

for (let event of stopEvents) {
    window.addEventListener(event, (e) => {
        diff_start = false

        if (current_diff) {
            current_diff.classList.remove('active')
        }
    })
}

function update_diff_size() {
    let diff = document.querySelectorAll('.difference')

    if (diff.length) {
        for (let elem of diff) {
            let ratio = elem.dataset.ratio.split(':')
            let width = elem.clientWidth
            let height = (ratio[1] / ratio[0]) * width
            let images = elem.querySelectorAll('.image')

            if (images.length) {
                for (let image of images) {
                    image.style.width = width + 'px'
                }
            }

            elem.style.height = height + 'px'
        }
    }
}

update_diff_size()

let diff = document.querySelectorAll('.difference')

if (diff.length) {
    for (let elem of diff) {
        let events = ['mousedown', 'touchstart']

        for (let event of events) {
            elem.addEventListener(event, (e) => {
                left = elem.querySelector('.left')
                right = elem.querySelector('.right')
                position = e.clientX || e.originalEvent.changedTouches[0].clientX
                handler = elem.querySelector('.handler')

                elem.classList.add('active')
                diff_start = true
                update_diff()
            })
        }
    }
}

window.addEventListener('resize', update_diff_size)
