<template>
    <div>
        <van-cell>
            <van-divider :style="{ color: '#1AC66D', borderColor: '#1AC66D', padding: '0 16px' }">
                订单编号：{{data.orderId}}
            </van-divider>
        </van-cell>

        <van-steps direction="vertical" :active="0">
            <van-step>
                <h3>无人机状态：飞行</h3>
                <h3>目的地：{{data.userAddress}}</h3>
                <p>{{data.updateTime | formatTimer}}</p>
            </van-step>
            <van-step>
                <h3>无人机状态 : 充电ing</h3>
                <p>{{data.updateTime | formatTimer}}</p>
            </van-step>
            <van-step>
                <h3>{{ data.userName }} : 下单成功</h3>
                <p>{{data.updateTime | formatTimer}}</p>
            </van-step>
        </van-steps>
        <van-image
                width="20rem"
                height="10rem"
                fit="contain"
                src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/wurenji.jpg"
        />
        <div style="padding-bottom: 150px"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Notify, Step, Steps} from 'vant';

    Vue.use(Step);
    Vue.use(Steps);
    export default {
        name: "UAVInfo",

        data() {
            return {
                data:{
                    data: null
                }
            };
        },
        created() {
            let data = JSON.parse(this.$route.query.conson)
            this.data = data
            //console.log(data)
            Notify({
                type: 'success',
                message: '房产, 飞机, 邮轮, 以寄送钥匙为准哦~',
                duration: 3000,
            });
        },
        filters: {
            formatTimer: function(value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? "0" + MM : MM;
                let d = date.getDate();
                d = d < 10 ? "0" + d : d;
                let h = date.getHours();
                h = h < 10 ? "0" + h : h;
                let m = date.getMinutes();
                m = m < 10 ? "0" + m : m;
                let s = date.getSeconds();
                s = s < 10 ? "0" + s : s;
                return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
            }
        },
    }
</script>

<style scoped>

</style>