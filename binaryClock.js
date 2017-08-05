function binaryClock(container, options = {
  height : 200,
  width : 800,
  id : "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)] + Date.now()
}) {
  //takes a container and options object as input
  //side-effects: adds binaryClock to the dom in the specified container
  //returns id of binaryClock

  let clock = document.createElement('canvas')
  for (let attribute in options) {
    clock.setAttribute(attribute, options[attribute])
  }
  let ctx = clock.getContext("2d")
  setInterval(() => {
    tick(ctx, options)
  }, 1000)

  container.appendChild(clock)
  return options.id
}

function tick(context, options) {
  const now = new Date()
  const units = [now.getHours(), now.getMinutes(), now.getSeconds()]
  const secondsInDay = units.reduce((total, unit) => total * 60 + unit, 0)
  const binarySeconds = secondsInDay.toString(2).padStart(24, '0').split('')

  draw(binarySeconds, context, options)
}

function draw(binarySeconds, context, options) {
  const gridWidth = options.width / 8 
  const gridHeight = options.height / 2
  context.fillStyle = "black";
  context.fillRect(0, 0, options.width, options.height);
  //17 bits
  //each row 9 bits
  //x = 8 - i % 9
  //y equals Math.floor(i / 9)
  binarySeconds.reverse().forEach(function (bit, i) {
    const x = 8 - i % 9
    const y = Math.floor(i / 9)
    if (bit === '1') {
      context.fillStyle = "lime";
    } else {
      context.fillStyle = "gray";
    }
    context.fillRect(x * gridWidth, y * gridHeight, gridWidth - 2, gridHeight - 2)
  })
  }