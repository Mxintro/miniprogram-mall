// components/CommentItem/CommentItem.js
import { formatTime } from '../../utils/util'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: {
      type: Object,
      //为什么原始是null
      value: {},
      observer: function() {
        this.formatCreatedTime()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    createdTime: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    formatCreatedTime() {
      if (this.properties.comment) {
        let date = new Date(this.properties.comment.created*1000)
        const formatValue= formatTime(date, 'yyyy-mm-dd hh:mi:ss')
        this.setData({
          createdTime: formatValue
        })
      }     
    }
  }
})
