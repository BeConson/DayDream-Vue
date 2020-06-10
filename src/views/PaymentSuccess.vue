<template>
    <div>
        <van-image
                width="100"
                height="100"
                src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/paySuccess.png"
        />
        <h1><strong><van-cell :title="'￥ '+amount+'.00 元'"/></strong></h1>
        <p>收款方</p>
        <van-image width="100" height="100" src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/conson.jpg" />
        <p>康森</p><br>
        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="21">配送方式</van-col>
                <van-col>无人机</van-col>
            </van-cell>
        </van-cell-group>
        <br><br>
        <van-button type="primary" size="large" @click="showInfo">查看订单详情</van-button>
    </div>
</template>

<script>
    export default {
        name: "Success",
        data() {
            return {
                orderId: null,
                amount: null
            }
        },
        created(){
            this.orderId = this.$route.query.orderId
            this.amount = this.$route.query.amount
            //console.log(this.$route.query)
        },
        methods:{
            showInfo(){
                this.$router.push('/orderInfo?orderId='+this.orderId)
            }
        }
    }
</script>

<style scoped>
</style>