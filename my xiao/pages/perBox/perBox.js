// pages/perBox/perBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    boxType: {
      type: Number,
      value: 1//2:filed,1:select
    },
    selectData: {
      type: Array,
      value: ['11','22','33']
    },
    text: {
      type: String,
      value: 'text'
    },
    boxId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(e){
      this.triggerEvent('onSelect',{data:this.properties.selectData,
                                    text:this.properties.text,
                                    boxId:this.properties.boxId,
                                    position:e.detail})
    }
  }
})
