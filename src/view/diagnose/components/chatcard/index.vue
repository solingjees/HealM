<template>
    <router-link :to="{name:'chat',query:{'id':id,'name':name,'opponentId':opponentId}}">
        <Card class="chatCard">
            <Row slot="title" type="flex" align="middle">
                <Col span='3' offset='1'>
                    <Avatar :src='avatar'/>
                </Col>
                <Col span='15' offset='1'>
                    <p>{{name}}</p>
                </Col>
                <Col span='1' offset='2'>
                    <div class="notReadNum" v-if='notReadNum!=0'>{{notReadNum}}</div>
                </Col>
            </Row>
            <p class="content">{{chat}}</p>
        </Card>
    </router-link>
</template>
<script>
import index from '@/components/inputItem/index.vue'
export default {
  components: { index },
    name:'ChatCard',
    props:{
        id:{
            type:String | Number,
            default:''
        },
        opponentId:{
            type:Number,
            default:0
        },
        avatar:{
            type:String,
            default:''
        },
        name:{
            type:String,
            default:''
        },
        notReadNum:{
            type:Number,
            default:0
        },
        chat:{
            type:String,
            default:0
        }
    },
    data(){
        return {

        }
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.chatCard{
    margin-top:1.5em;
    .notReadNum{
        background-color: red;
        border-radius: 50%;
        color:#fff;
        text-align: center;
    }
    .content{
        font-size :1.1em;;
    }
}
</style>