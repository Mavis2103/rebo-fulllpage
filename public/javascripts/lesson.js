const bg_override = document.getElementById('bg-blur')
const box_override = document.getElementById('box')
const isOpen = document.getElementById('new')
const isClose = document.getElementById('close')
isOpen.addEventListener('click', () => {
  bg_override.classList.remove('d-none')
  box_override.classList.remove('d-none')
  isClose.addEventListener('click', () => {
    bg_override.classList.add('d-none')
    box_override.classList.add('d-none')
  })
})
