// components/TabControl/TabControl.js
Component({
  properties: {
    titles: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },
  methods: {
    itemTap(e) {
      this.triggerEvent("titleTap", {id:parseInt(e.currentTarget.id)})
    }
  }
})
