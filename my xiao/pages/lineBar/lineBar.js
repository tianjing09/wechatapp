// pages/lineBar/lineBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    viewHeight: {
      type: Float32Array,
      value: 300,
    },
    viewWidth: {
      type: Float32Array,
      value: 320,
    },
    lineColor: {
      type: String,
      value: "#121212"
    },
    barColor: {
      type: String,
      value: "#676767",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    barWidth: 260,
    barHeight: 260,
    leftKeys: ['111', '2222', '3333', '4444', '5555'],
    rightKeys: [],
    points: [],
    rightPoints: [],
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    viewDatas: {
      lineData: ['123', '223', '323', '223', '423', '823', '213', '243', '293', '123', '237', '723'],
      barData: ['0.18', '0.28', '0.18', '0.81', '0.58', '0.38', '0.88', '0.98', '0.48', '0.83', '0.68', '0.89']
    },
  },

  attached() {
  },
  ready() {
    this.refreshView()
    this.refreshKeys()
    this.drawLine()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    refreshView() {
      let bw = this.properties.viewWidth - 60
      let bh = this.properties.viewHeight - 40
      this.setData({
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
      let vw = this.properties.viewWidth
      let vh = this.properties.viewHeight
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

      const context = wx.createCanvasContext('lineBar',this)
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

    getMaxNumber(datas, isPercent) {
      var max = datas[0];
      for (let i = 1, len = datas.length; i < len; i++) {
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

    refreshViews(oData) {
      this.data.keys = oData["keys"]
      this.data.viewDatas = {
        lineData:oData['line'],
        barData:oData['bar'] 
      }
      this.refreshKeys()
      this.drawLine()
    }
  
  }
})
