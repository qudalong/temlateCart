// components/cart-contart/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    food: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectFoods: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add() {
      let food = this.properties.food
      food.count = food.count + 1
      this.setData({
        food
      });
      //激活自定义事件
      this.triggerEvent('selectFoods')

    },

    minus() {
      let food = this.properties.food
      food.count > 0 ? food.count = food.count - 1 : 0
      this.setData({
        food
      });
      //激活自定义事件
      this.triggerEvent('selectFoods', food)
    },
    uniq(array) {
      let temp = [];
      for (let i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
        }
      }
      return temp;
    }
  }
})