<template>
	<view>
		<u-notice-bar :text="promotionTxt"></u-notice-bar>
		<view class="content">
			<image class="logo" src="/static/meishi.jpg"></image>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
			<view class="slogan">{{slogan}}</view>
			<!-- <u-tag text="标签" plain size="mini" type="warning"></u-tag> -->
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: '欢迎光临好吃客',
				slogan: '吃好、喝好，好吃客，生活好好好',
				promotionTxt: '最新活动，充值会员全场8.5折起...'
			}
		},
		onLoad() {
			this.getmethod();
			this.initBadge();
		},
		methods: {
			getmethod() {
				uni.$u.http.post("/api/auth/RefreshToken1").then(res => {
					console.log(res)
				}).catch(err => {

				})
			},
			initBadge() {
				let cartList = uni.getStorageSync("cartList") || [];
				let badgeCount = cartList.length;
				if (badgeCount > 0) {
					uni.setTabBarBadge({
						index: 2,
						text: badgeCount.toString()
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		/* 	height: 200rpx;
		width: 200rpx; */
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.slogan{
		color: $uni-bg-color-home;
	}
</style>
