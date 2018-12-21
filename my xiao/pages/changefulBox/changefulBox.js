// pages/changefulBox/changefulBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    viewHeight: {
      type: Float32Array,
      value: 320,
    },
    viewWidth: {
      type: Float32Array,
      value: 318,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftKeys:[{id:'1',name:'left1'},{id:'2',name:'left2'}],
    topKeys:[{id:'1',name:'top1'},{id:'2',name:'top2'},{id:'3',name:'top3'}],
    datas: {
      '1-1': { type: '1', text: 'b滴滴答答滴滴答答的呢', selectData: ['a','b滴滴答答滴滴答答的呢','c']}, 
            '1-2':{ type: '1', text: 'c1',selectData:['a1','b1','c1']}, 
            '2-1': {type: '2', text: '21' }, 
            '2-2': {type: '1', text: 'a2',selectData:['a2','b2','c2']}, 
            '3-1': {type: '2',text: '31' }, 
            '3-2': {type: '2', text: '32' }},
    boxW:40,
    boxH:30,
    perW:4,
    perH:3,
    selectTop:3,
    selectLeft:3,
    boxId:""
  },
  ready(){
    this._refreshView()
    this.select = this.selectComponent("#select")
  },
  /**
   * 组件的方法列表
   */
  methods: {
   _refreshView(){
     let pw = (this.properties.viewWidth) / (this.data.topKeys.length + 1)
     let ph = (this.properties.viewHeight) / (this.data.leftKeys.length + 1)
     let w = pw * this.data.topKeys.length
     let h = ph * this.data.leftKeys.length
     this.setData({
       boxW: w,
       boxH: h,
       perW: pw,
       perH: ph
     })
   },

    onSelect(e){
      this.data.boxId = e.detail.boxId
      const query = this.createSelectorQuery()
      query.select('#ddd').boundingClientRect(function (res) {
        var position = { x: 0, y: 0 }
        position.x = res.left 
        position.y = res.bottom
        console.log(res)
        console.log(position)
        this.setData({
          selectTop: position.x,
          selectLeft: position.y
        })
      })
      query.exec()
      let text = e.detail.text
      let data = e.detail.data
      this.select.refreshView(data,text)
      this.select.showView()
    },

    didSelect(e) {
      let text = e.detail.text
      var data = this.data.datas[this.data.boxId]
      data.text = text
      this.data.datas[this.data.boxId] = data
      this.setData({
        datas:this.data.datas
      })

    }
  }
})
