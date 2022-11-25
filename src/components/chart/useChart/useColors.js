const getRandomColor = () => {
  return '#'+('00000'+ (Math.random()*0x1000000<<0)?.toString(16)).substring(-6); 
}

const getColors = (len) => {
  const safeColors = [
    '#1890ff', '#13c2c2', '#ffc53d',
    '#c04851', '#7a7374', '#806d9e', '#1177b0', '#40a070',
    '#d2b116', '#c1651a', 
    '#73d13d'
  ]
  const LEN = safeColors.length
  if (len <= LEN) {
    return safeColors.slice(0, len)
  } else {
    const l = len - LEN
    const arr = []
    for(let i=0; i< l; i++) {
      arr.push(getRandomColor())
    }
    return [...safeColors, ...arr]
  }
}

export default getColors