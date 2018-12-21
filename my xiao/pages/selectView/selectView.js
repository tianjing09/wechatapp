// pages/selectView/selectView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   vW: {
     type: Float32Array,
     value: 200
   },
   vH: {
     type: Float32Array,
     value: 300
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: ['ww', 'eee', 'rrr'],
    selectText: 'ww',
    isShow: true,
  },

  ready(){
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
   _select(e){
    let index = e.currentTarget.id
    let text = ''
    if (this.data.data[index] == this.data.selectText) {
      text = ''
    } else {
      text = this.data.data[index]
    }
    this.setData({
      selectText: text
    })
    this.hideView()
    this.triggerEvent('didSelect', {
       text:this.data.selectText,
     })
   },
   
   refreshView(d,t) {
     this.setData({
       data:d,
       selectText:t
     })
   },

   showView(){
    this.setData({
      isShow: false
    })
   },

    hideView() {
      this.setData({
        isShow: true
      })
    },
  }
})
