const rectangle = 'rectangle'
const circle = 'circle'
const line = 'line'

function drawShape (
  context,
  type,
  shape,
  position = { x: 0, y: 0 },
  angle = 0,
  factor = { x: 1, y: 1 },
  width = 1,
  color = 'rgba(207, 255, 0, 1)'
) {
  context.lineWidth = width
  context.strokeStyle = color

  context.translate(position.x, position.y)
  context.rotate(angle)
  context.scale(factor.x, factor.y)

  if (type === rectangle) {
    context.strokeRect(shape[0], shape[1], shape[2], shape[3])
  } else if (type === circle) {
    context.beginPath()
    context.arc(shape[0], shape[1], shape[2], 0, Math.PI * 2)
    context.stroke()
  } else if (type === line) {
    context.beginPath()
    context.moveTo(shape[0], shape[1])
    context.lineTo(shape[2], shape[3])
    context.stroke()
  }
}

function lines (context, x, y, length = 320, angle = 0) {
  const factor = 0.67
  const rotation = Math.PI / 2
  const min = 1

  context.save()

  l = length === 320 ? 0 : length

  drawShape(context, line, [0, 0, 0, -l], { x, y }, angle)

  if (length < min) return context.restore()

  lines(context, 0, -length, length * factor, +rotation)
  lines(context, 0, -length, length * factor, -rotation)

  context.restore()
}

function triangles (context, x, y, length = 384, angle = 0) {
  const factor = 0.5
  const rotation = Math.PI * 0.666667
  const min = 1

  context.save()

  l = length === 384 ? 0 : length

  drawShape(context, line, [0, 0, 0, -l], { x, y }, angle)

  if (length < min) return context.restore()

  triangles(context, 0, -length, length * factor, +rotation)
  triangles(context, 0, -length, length * factor, 0)
  triangles(context, 0, -length, length * factor, -rotation)

  context.restore()
}

function squares (context, x, y, length = 144, angle = Math.PI) {
  const factor = 1 / Math.sqrt(2)
  const rotation = Math.PI / 4
  const min = 3

  context.save()

  drawShape(context, rectangle, [0, 0, length, length], { x, y }, angle)

  if (length < min) return context.restore()

  squares(
    context,
    length * 0.5,
    length * 1.5,
    length * factor,
    +rotation + Math.PI * 1.5
  )
  squares(context, 0, length, length * factor, -rotation + Math.PI * 0.5)

  context.restore()
}

function circles (context, x, y, length = 128, angle = Math.PI * 1.25) {
  const factor = 0.67
  const ratio = 1.185
  const rotation = Math.PI / 4
  const min = 2

  context.save()

  l = length === 128 ? 0 : length

  drawShape(context, circle, [0, 0, l], { x, y }, angle)

  if (length < min) return context.restore()

  circles(
    context,
    length * ratio,
    length * ratio,
    length * factor,
    +rotation + Math.PI * 0.075
  )
  circles(
    context,
    length * ratio,
    length * ratio,
    length * factor,
    -rotation + Math.PI * 0.15
  )

  context.restore()
}

function tree (context, x, y, length = 128, width = 4, angle = 0) {
  const factor = 0.825
  const ratio = 0.825
  const min = 12
  const rotation = Math.PI / 16

  context.save()

  drawShape(
    context,
    line,
    [0, 0, 0, -length],
    { x, y },
    angle,
    { x: 1, y: 1 },
    width
  )

  if (length < min) return context.restore()

  tree(context, 0, -length, length * factor, width * ratio, +rotation)
  tree(context, 0, -length, length * factor, width * ratio, -rotation)

  context.restore()
}

function spiral (context, x, y, length = 128, angle = Math.PI) {
  const factor = 0.999
  const rotation = Math.PI / 16
  const min = 16

  context.save()

  drawShape(context, line, [0, 0, length, length], { x, y }, angle)

  if (length < min) return context.restore()

  spiral(context, 0, length, length * factor, rotation)

  context.restore()
}
