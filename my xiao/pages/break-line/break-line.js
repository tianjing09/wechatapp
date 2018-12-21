Page({
  data: {
    viewHeight: 300,
    viewWidth: 320,
    barWidth: 260,
    barHeight: 260,
    lineColor: "#121212",
    barColor: "#676767",
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    leftKeys: ['111', '2222', '3333', '4444', '5555'],
    rightKeys:[],
    viewDatas:{
      lineData: ['123', '223', '323', '223', '423', '823', '213', '243', '293', '123', '237', '723'],
      barData: ['0.18', '0.28', '0.18', '0.81', '0.58', '0.38', '0.88', '0.98', '0.48', '0.83', '0.68', '0.89']
    },
    points:[],
    rightPoints:[],
    isData:false,
    isScale:false,
  },

  onLoad() {
    this.refreshKeys()
  },

  onReady() {
    this.drawLine() 
  },

  refreshView(width,height) {
    let vw = width
    let vh = height
    let bw = vw - 60
    let bh = vh - 40
    this.setData({
      viewHeight: vh,
      viewWidth: vw,
      barWidth: bw,
      barHeight: bh,
    })
  },

  refreshKeys() {
    let linesData = this.data.viewDatas["lineData"]
    let barsData = this.data.viewDatas["barData"]
    let maxNumber = this.getMaxNumber(linesData, false)
    let barMax = this.getMaxNumber(barsData, true)
    const list = []
    const barList = []
    for (let i = 0; i < 6; i++) {
      let value = (maxNumber / 5) * (5 - i)
      list.push(value)

      let barValue = (barMax / 5) * (5 - i)
      let barFixed = barValue.toFixed(2) * 100
      let barString = barFixed.toString() + '%'
      barList.push(barString)
    }
    this.data.leftKeys = list
    this.data.rightKeys = barList
    this.setData({
      leftKeys: list,
      rightKeys: barList
    })
  },

  drawLine() {
    let vw = this.data.viewWidth
    let vh = this.data.viewHeight
    let bw = this.data.barWidth
    let bh = this.data.barHeight
    let linesData = this.data.viewDatas["lineData"]
    let barsData = this.data.viewDatas["barData"]
    let maxNumber = this.getMaxNumber(linesData, false)
    let barMax = this.getMaxNumber(barsData, true)
    this.data.points = []
    this.data.rightPoints = []
    for (let i = 0, len = linesData.length; i < len; i++) {
      let x = ((bw - 16) / (len - 1)) * i + 8
      let value = linesData[i]
      let y = bh - (value / maxNumber) * bh
      this.data.points.push({ xv: x, yv: y })

      let barValue = barsData[i]
      let bary = bh - (barValue / barMax) * bh
      this.data.rightPoints.push({ xv: x, yv: bary })
    }

    const context = wx.createCanvasContext('breakLine')
    for (let i = 1, len = 5; i < len; i++) {
      let bw = this.data.barWidth
      let bh = this.data.barHeight
      let yp = bh - ((bh - 2) / 5 * i)
      let start = { x: 0, y: yp }
      let end = { x: bw, y: yp }
      context.beginPath()
      context.setStrokeStyle('#000000')
      context.setLineJoin('round')
      context.setLineWidth(1)
      context.moveTo(start.x, start.y)
      context.lineTo(end.x, end.y)
      context.stroke()
    }

    context.beginPath()
    context.setStrokeStyle('#ebb6eb')
    context.setLineWidth(6)
    for (let i = 0, len = this.data.points.length; i < len; i++) {
      let p = this.data.points[i]
      context.moveTo(p.xv, this.data.barHeight)
      context.lineTo(p.xv, p.yv)
    }
    context.stroke()

    let barData = this.data.viewDatas["lineData"]
    for (let i = 0, len = this.data.points.length; i < len; i++) {
      let p = this.data.points[i]
      context.beginPath()
      context.setFontSize(10)
      context.setFillStyle('#000000')
      if (i == len - 1) {
        context.fillText(barData[i], (p.xv - 12), (p.yv + (this.data.barHeight - p.yv) / 2))
      } else {
        context.fillText(barData[i], (p.xv - 8), (p.yv + (this.data.barHeight - p.yv) / 2))
      }
    }
    

////////////////////
    context.beginPath()
    context.setStrokeStyle('#198aaf')
    context.setLineJoin('round')
    context.setLineWidth(2)
    for (let i = 0, len = this.data.rightPoints.length; i < len; i++) {
      let p = this.data.rightPoints[i]
      if (i == 0) {
        context.moveTo(p.xv, p.yv)
      } else {
        context.lineTo(p.xv, p.yv)
      }
    }
    context.stroke()

    let lineData = this.data.viewDatas["barData"]
    for (let i = 0, len = this.data.rightPoints.length; i < len; i++) {
      let p = this.data.rightPoints[i]
      context.beginPath()
      context.arc(p.xv, p.yv, 2, 0, 2 * Math.PI, true)
      context.setFillStyle('#df6c37')
      context.fill()
    }
    context.draw()
  },

  getMaxNumber(datas,isPercent) {
    var max = datas[0];
    for(let i = 1, len = datas.length; i < len; i++) {
       if (max < datas[i]) {
         max = datas[i];
       }
    }
    if (isPercent) {
      max = max * 100
    }
    max = ((max - (max % 5)) / 5 + 1) * 5;
    if (isPercent) {
      max = max / 100
    }
    return max;
  },

  changeData() {
    this.data.isData = !this.data.isData
    if (this.data.isData) {
      let datas = 
      {
        lineData: ['23', '73', '33', '23', '93', '53', '73'],
        barData: ['0.18', '1.28', '0.38', '0.81', '0.98', '2.38', '1.88']
      }
      let key = ["一", "二", "三", "四", "五", "六","七"]
      this.data.viewDatas = datas
      this.data.keys = key
      this.setData({
        keys: key
      })
    } else {
      let datas =
        {
          lineData: ['123', '223', '323', '223', '423', '823', '213', '243', '293', '123', '237', '723'],
          barData: ['0.18', '0.28', '0.18', '0.81', '0.58', '0.38', '0.88', '0.98', '0.48', '0.83', '0.68', '0.89']
        }
      let key = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      this.data.viewDatas = datas
      this.data.keys = key
      this.setData({
        keys: key
      })
    }
    this.drawLine()
    this.refreshKeys()
  },

  changeScale() {
   this.data.isScale = !this.data.isScale
   if (this.data.isScale) {
     this.refreshView(280,280)
   } else {
     this.refreshView(420,300)
   }
   this.drawLine()
  },

  navTo() {
    wx.navigateTo({
      url: "../test/test" 
    })
  }
})