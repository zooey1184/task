const descartFn = function(nums) {
  let t = nums.reduce((a, b)=> {
      let m = a.map(item=> {
          return b.map(i=> {
              return [i].concat(item)
          })
      })
      let f = m.reduce((c, d)=> {
          return c.concat(d)
      }, [])
      return f
  })
  return t
}

const dataMock = () => {
  const _d = []
  for(let i=0; i< 20; i++) {
    const KEY = Math.random().toString(36).substring(2, 5)
    const LANG = ['en', 'cn', 'jp', 'mk', 'pl', 'ko', 'ar_ae', 'ru']
    const VERSION = [1, 2, 3, 4, 5]
    const list = descartFn([LANG, VERSION])
    const _c = []
    list.forEach(item => {
      _c.push({
        title: `${item[1]}_${item[0]}_${KEY}`,
        key: `${item[1]}_${item[0]}_${KEY}`,
        lang: item[1],
        version: item[0]
      })
    });
    const obj = {
      title: KEY,
      key: KEY,
      children: _c
    }
    _d.push(obj)
  }
  return _d
}

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = dataMock()
      resolve(data)
    })
  })
}

export default getData