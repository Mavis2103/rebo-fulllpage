let oh = document.querySelector('.circle.oh')
document.addEventListener('mousemove', (e) => {
  let t = [0, document.body.clientWidth],
    n = [0, document.body.clientHeight],
    o = [-10, 10],
    i = o[0] + ((e.clientX - t[0]) * (o[1] - o[0])) / (t[1] - t[0]),
    l = o[0] + ((e.clientY - n[0]) * (o[1] - o[0])) / (n[1] - n[0])
  ;(oh.style.animation = 'none'),
    (oh.style.transform = `translate(${i}px, ${l}px)`)
}),
  document.addEventListener('mouseleave', (e) => {
    oh.style.animation = 'floating 3s linear infinite'
  })
