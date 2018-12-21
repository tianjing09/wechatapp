// pages/bar/bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    viewWidth: {
      type: Float32Array,
      value: 300
    },
    viewHeight: {
      type: Float32Array,
      value: 200
    },
    lineData: {
      type: Array,
      value: ['0.1', '0.5', '0.4', '0.9', '0.6']
    },
    barData: {
      type: Array,
      value: ['30', '130', '30', '430', '130']
    },
    keys: {
      type: Array,
      value:['1', '1', '1', '1', '1']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   processData:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
   refreshBar(){
     var data = [];
     for (let i = 0; i < this.properties.lineData.length; i++) {
        let a = this.properties.lineData[i]
        let b = a * 100
        data.push(b)
     }
     this.setData({
       processData:data,
     })
   },

   refreshBar(oData) {
    var data = [];
    for (let i = 0; i < oData.length; i++) {
      let a = oData[i]
      let b = a * 100
      data.push(b)
    }
    this.setData({
      processData: data,
    })
   }
  }
})
