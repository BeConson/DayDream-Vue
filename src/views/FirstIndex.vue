<template>
    <div>
        <div class="main" v-title data-title="DayDream"></div>

        <van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
            <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
            <template #pulling="props">
                <img
                        class="doge"
                        src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/money2.gif"
                        :style="{ transform: `scale(${props.distance / 80})` }"
                />
            </template>

            <!-- 释放提示 -->
            <template #loosing>
                <img class="doge" src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/money2.gif"/>
            </template>

            <!-- 加载提示 -->
            <template #loading>
                <img class="doge" src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/money2.gif"/>
            </template>

            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img style="width: 370px;height: 200px" v-lazy="image"/>
                </van-swipe-item>
            </van-swipe>

            <van-grid style="padding-top: 20px" :border="false" :column-num="3" :gutter="5">
                <van-grid-item>
                    <van-image
                            src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/house/%E5%BA%84%E5%9B%AD%2B%E5%9F%8E%E5%A0%A1.jpg"/>
                </van-grid-item>
                <van-grid-item>
                    <van-image
                            src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/house/u%20%E5%9E%8B%E7%8E%B0%E4%BB%A3%E5%B0%8F%E6%88%BF%E5%AD%90.jpg"/>
                </van-grid-item>
                <van-grid-item>
                    <van-image
                            src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/house/%E6%B3%B3%E6%B1%A0%E5%B0%8F%E6%88%BF%E5%AD%90.jpg"/>
                </van-grid-item>
            </van-grid>

            <van-grid :border="false">
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/cheBiao/Lamborghini.png"
                        text=""/>
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/cheBiao/Bentley.png"
                        text=""/>
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/cheBiao/Maserati.png"
                        text=""/>
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/cheBiao/Porsche.png"
                        text=""/>
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/cheBiao/lutesi.png"
                        text=""/>
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/car/laosilaisi.png"
                        text=""/>
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/cheBiao/falali.png"
                        text=""/>
                <van-grid-item
                        icon="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/cheBiao/maibahe.png"
                        text=""/>
            </van-grid>

        </van-pull-refresh>

        <div style="padding-bottom: 300px"></div>

        <van-button @click="showConsonMsg" type="primary" block plain>温馨提示</van-button>
        <van-dialog v-model="show" title="温馨提示" >
            <br>
            <van-image width="100" height="100" src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/conson.jpg" />
            <p>此项目为康森练习技术所作</p>
            <p>如有侵犯请联系csonc@qq.com , 谢谢！</p>
        </van-dialog>
        <div style="padding-bottom: 55px"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Swipe, SwipeItem, Toast} from 'vant';
    import {Lazyload} from 'vant';
    import { Dialog } from 'vant';

    Vue.use(Lazyload);
    Vue.use(Swipe);
    Vue.use(SwipeItem);

    export default {
        data() {
            return {
                show: false,
                count: 0,
                isLoading: false,
                images: [
                    'https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/car/%E6%9F%AF%E5%B0%BC%E5%A1%9E%E6%A0%BC%20Jesko%20%202019%E6%AC%BE%20%E5%9F%BA%E6%9C%AC%E5%9E%8B.jpg',
                    'https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/car/%E9%98%BF%E6%96%AF%E9%A1%BF%C2%B7%E9%A9%AC%E4%B8%81DBS%20%202019%E6%AC%BE%20DBS%20Superleggera%20black.jpg',
                    'https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/DayDreamShop/FirstIndex/Reventon%20%202008%E6%AC%BE%206.5.jpg',
                ],
                time: 24 * 60 * 60 * 1000,
            };
        },
        methods: {
            onRefresh() {
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 1000);
            },
            showConsonMsg(){
                this.show=true
            }
        },
    };
</script>

<style>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>
