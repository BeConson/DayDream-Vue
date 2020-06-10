<template>
    <div class="goods">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            订单信息
        </van-divider>
        <van-cell-group class="goods-cell-group">

            <van-cell>

                <van-col span="15"><van-icon name="manager-o" style="margin-right: 15px;" />收货人：{{data.name}}</van-col>

                <van-col><van-icon name="phone-o" style="margin-right: 15px;" />{{data.tel}}</van-col>

                <van-col span="21" style="font-size: 13px">
                    <van-icon name="location-o" style="margin-right: 15px;" />收货地址：{{data.address}}
                </van-col>

                <van-col span="21" style="font-size: 13px">
                    <van-icon name="coupon-o" style="margin-right: 15px;" />订单编号：{{data.orderId}}
                </van-col>

                <van-col span="21" style="font-size: 13px">
                    <van-icon name="underway-o" style="margin-right: 15px;" />下单时间：{{data.updateTime}}
                </van-col>
            </van-cell>

        </van-cell-group>

        <van-card
                :num="data.num"
                :price="data.price"
                :desc="data.specs"
                :title="data.shopName"
                :thumb="data.icon"
        />

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="21">配送方式</van-col>
                <van-col>无人机</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="17">商品金额</van-col>
                <van-col style="color: orange">￥{{data.amount - 520+'.00'}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell class="goods-cell-group" style="font-weight: bold">
                <van-col span="19">运费</van-col>
                <van-col style="color: orange">￥{{data.freight+'.00'}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell class="goods-cell-group" style="font-weight: bold">
                <van-col span="17">合计</van-col>
                <van-col style="color: orange">￥{{data.amount+'.00'}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">订单状态</van-col>
                <van-col style="color: orange">{{payStatusTrans(data.payStatus)}}</van-col>
            </van-cell>
        </van-cell-group>
        <br>
        <van-notice-bar mode="closeable"
                        color="#1989fa"
                        background="#ecf9ff"
                        text="消息提示 : 你的订单支付成功啦 ，这几天晚上就能见到哦"
                        left-icon="volume-o"/>

        <br><br>

        <div class="slider">
            <van-slider v-model="value" @change="onChange" />
        </div>
        <div style="padding-bottom: 150px"></div>
    </div>
</template>

<script>

    import {Toast} from 'vant';
    import {Dialog} from "vant";
    import {Notify} from 'vant';

    export default {
        data() {
            return {
                value: 50,
                data:{
                    orderId: "",
                    userName: "",
                    shopName: "",
                    payStatus: 1,
                    freight: 520,
                    tel: "",
                    address: "",
                    num: 1,
                    specs: "",
                    price: "",
                    icon: "",
                    amount: 2800
                }
            };
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/order/detail/'+this.$route.query.orderId).then(function (response) {
                //console.log(response)
                _this.data = response.data.data
            })
        },
        methods: {
            payStatusTrans(status){
                if(status == 1) return '已支付'
                if(status == 0) return '未支付'
            },
            onChange(value) {
                //console.log(this.$route.query.orderId)
                Notify({
                    type: 'success',
                    message: '当滑块移动到尽头时会删除此订单哦 , 当前：'+value+"%",
                    duration: 3500,
                });
                if (value == 100){
                    function beforeClose(action, done) {
                        if (action === 'confirm') {
                            setTimeout(done, 1000);
                        } else {
                            done();
                        }
                    }
                    Dialog.confirm({
                        title: '你好呀',
                        message: '确认要删除此订单信息吗？',
                        beforeClose
                    }).then(() => {
                        // on confirm
                        const _this = this
                        axios.get('http://localhost:8181/order/deleteOrder/' + this.$route.query.orderId)
                        setTimeout(() => {
                            let instance = Toast('成功删除订单');
                            instance.close();
                            _this.$router.push('/myOrder')
                        }, 1000)
                    }).catch(() => {
                        // on cancel
                    });
                }
            },
        }
    };
</script>

<style>

.slider{
    padding-left: 25px;
    padding-right: 25px;
}

</style>