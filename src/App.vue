<template>
    <div id="app">
        <div id="nav">
            <van-search left-icon="" placeholder="欢迎来到白日梦商城" input-align="center"/>
            <van-tabbar v-model="active">
                <van-tabbar-item icon="home-o">
                    <router-link to="/">首页</router-link>
                </van-tabbar-item>
                <van-tabbar-item index icon="gem-o">
                    <router-link to="/shop">商品页</router-link>
                </van-tabbar-item>
                <van-tabbar-item icon="shopping-cart-o">
                    <router-link to="/myOrder">已销售</router-link>
                </van-tabbar-item>
            </van-tabbar>
        </div>
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'index',
        components: {},
        data() {
            return {
                active: 0,
            }
        }
    }
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 15px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
