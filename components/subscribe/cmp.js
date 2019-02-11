// components/subscribe/cmp.js
import { SubscribeModel} from "../../models/subscribe.js"

const subscribeModel = new SubscribeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tag: String,
    tagId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    class:"common"
  },

  attached(){
    this.judgeTag()

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){

      const mark ={
        tag: this.properties.tag,
        tagId: this.properties.tagId
      }

      if(this.data.class === "common"){
        const myTagList = this.getMyTagList()

        myTagList.push(mark)

        subscribeModel.setMyTagList(myTagList)
      }else{
        subscribeModel.removeMyTag(mark.tagId)
      }

     this.taggleClass()
     this.triggerEvent("tap")
    },
    getMyTagList(){
      const myTagList = subscribeModel.getMytagList()
      this.setData({
        myTagList
      })
      return myTagList
    },
    judgeTag(){
      const myTagList = this.getMyTagList()
      myTagList.forEach((item,index)=>{
        if(item.tagId == this.properties.tagId){
          this.setData({
            class:"subscribe"
          })
        }
      })
    },
    taggleClass(){
      let className = "";
      if (this.data.class === "common") {
        className = "subscribe"
      } else {
        className = "common"
      }
      this.setData({
        class: className
      })
    }
  }
})
