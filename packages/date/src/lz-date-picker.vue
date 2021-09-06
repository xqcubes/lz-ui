<template>
  <div class="lz-date-picker">
    <el-radio-group :value="dateType" @input="radioChange"  :szie="size" style="margin-right:10px;" >
      <template v-for="(radio,index) in radioData">
          <el-radio-button :key="`radio${index}`" :label="radio.label">{{radio.labelName}}</el-radio-button>
      </template>
    </el-radio-group>
  
   <div   class="year-picker" v-if="dateType==='year'||dateType==='week'">
       <el-date-picker
          :value ="startTime"
          style="margin-right:10px;"
          :szie="size"
          :type="dateType==='week'?'week':'year'"
          value-format="yyyy-MM-dd-HH:mm:ss"
          @input="inputHandle($event,'startTime')"
          :placeholder="dateType==='year'?'选择开始年':'选择开始周'">
       </el-date-picker>
       <span>→</span>
       <el-date-picker
          :value="endTime"
          :szie="size"
          :type="dateType==='week'?'week':'year'"
          value-format="yyyy-MM-dd-HH:mm:ss"
          @input="inputHandle($event,'endTime')"
          :placeholder="dateType==='year'?'选择结束年':'选择结束周'">
       </el-date-picker>
    </div>

    <el-date-picker  v-else v-model="date" 
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :type="typeRange"
      :szie="size"
      range-separator="→"
      value-format="yyyy-MM-dd-HH:mm:ss"
      v-bind="$attrs"
      v-on="$listeners">
    </el-date-picker>


  </div>
</template>

<script>
import { 
  RadioGroup,
  RadioButton,
  DatePicker,
  } from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css';
export default {
    name:'lz-date-picker',
    components:{
      'el-radio-group':RadioGroup,
      'el-radio-button':RadioButton,
      'el-date-picker':DatePicker

    },
    props:{
      isDateTime:{
        type:Boolean,
        dafault:false
      },
      dateType:{
        type:String,
        dafault:''
      },
      startTime:{
        type:String,
        dafault:''
      },
      endTime:{
        type:String,
        dafault:''
      },
      size:{
       validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['mini', 'small', 'medium'].indexOf(value) !== -1
       }, 
       default:'mini'
      },
      layout:{
        type:String,
        default:'date,month,year'
      }
     
    },
    data(){
       return {
          date:[],
          startYear:'',
          endYear:'',
       }
    },
    watch:{
      date:{
        handler(v){
          if(v&&v.length){
            this.$emit('update:startTime',v[0])
            this.$emit('update:endTime',v[1])
          }else{
            this.$emit('update:startTime','')
            this.$emit('update:endTime','')
          }
        },immediate:true
      },
      startTime:{
        handler(v){
           if(!this.startTime&&!this.endTime){
             this.date = []
           }

           if(this.endTime&& v > this.endTime){
              let time = this.startTime
              this.$emit('update:startTime',this.endTime)
              this.$emit('update:endTime',time)
           } 
        }
      },
      endTime:{
        handler(v){
           if(!this.startTime&&!this.endTime){
             this.date = []
           }
          if(this.startTime > v){
              let time = this.startTime
              this.$emit('update:startTime',this.endTime)
              this.$emit('update:endTime',time)
           } 
        }
      }
    },
    computed:{
      typeRange(){
          //日
          if(this.dateType ==='date'){
            if(this.isDateTime){
              return 'datetimerange'
            }
            return 'daterange'
            

          }
          //月
          else if(this.dateType ==='month'){
            return 'monthrange'
          }
          //年
          else{
            return 'daterange'
          }
  
      },
      radioData(){
        const layoutAllData = [
          {
            label:'date',
            labelName:'日'
          },
          {
            label:'week',
            labelName:'周'
          },
          {
            label:'month',
            labelName:'月'
          },
          {
            label:'year',
            labelName:'年'
          },
        ]
      
        let layoutStr = this.layout.replace(/\s*/g,"");
        let layoutData = layoutStr.split(',')
     
        if(!layoutData.length){
          return [  { label:'date', labelName:'日' }, { label:'month', labelName:'月' },{ label:'year', labelName:'年'}
             ]
           }
           else{
             return  layoutAllData.filter((item)=>{
                 return layoutData.includes(item.label)
               })
           }

      }
    },
    methods:{
      radioChange(v){
        this.$emit('update:dateType',v)
        this.date = []
      },
      inputHandle(e,v){
        this.$emit(`update:${v}`,e)
      },
      clear(){
         this.$emit('update:dateType','')
        this.date = []

      }
    }

}
</script>

<style lang="scss">
.lz-date-picker{
  display: flex;
  
  align-items: center;
  .year-picker{
    display: inline-flex;
    align-items: center;
    >div{
      width:140px;
    }
    >span{
      margin-right:5px;
    }
  }

}
</style>