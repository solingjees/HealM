<template>
    <Row type='flex' :justify='location' class="perMessage" align='middle'>
        <Col span="2" offset='1' v-if="location=='start'">
            <Avatar icon='ios-person' :src='avatar'/>
        </Col>
        <Col offset='1'>
            <div class='cardContent' v-html="message.content" @click='clickCard($event)'></div>
        </Col>
        <Col span="2" offset='1' v-if="location=='end'">
            <Avatar icon='ios-person' :src='avatar'/>
        </Col>
    </Row>
</template>
<script>
export default {
    name:'Bubble',
    props:{
        message:{},
        opponentId:0
    },
    data(){
        return {
            avatar:''
        }
    },
    methods:{
        clickCard(event){
            switch(event.target.dataset.id){
                case 'refuseBtn':
                    this.$socket.emit('refuseContract',{
                        windowChatId:this.message.id,
                        userId:parseInt(this.opponentId)
                    })
                    break;
                case 'agreeBtn':
                    this.$socket.emit('agreeContract',{
                        windowChatId:this.message.id,
                        userId:parseInt(this.opponentId)
                    })
                    break;
            }
        }
    },
    computed:{
        location(){
            if(this.message.senderId==this.$store.state.user.id){
                if(this.message.senderIdentity==this.$store.state.user.identity){
                    return 'end'
                }
            }
            return 'start'
        }
    },
    async mounted(){
        //决定头像和名字
        if(this.location=='end'){
            this.avatar=this.$store.state.user.avatar
        }else{
            this.avatar=this.message.avatar
        }
    }
}
</script>
<style lang="less" scoped>
.perMessage{
    margin-top:1em;
    .cardContent{
        padding: 0.5em;
        background-color: white;
        border:1px solid rgb(218, 218, 218);
        border-radius: 5px;
    }
    img{
        width: 70vw;
        height: auto;
    }
}
</style>