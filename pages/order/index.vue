<template>
	<view>
		<view>
			<u-empty v-if="cartList.length==0" mode="order" icon="http://cdn.uviewui.com/uview/empty/car.png">
				<button type="default" class="goMenu" @click="goPage('/pages/menu/index')">去选餐</button>
			</u-empty>
			<view v-else>
				<view v-for="(item, index) in cartList" :key="index">
					<view style="display: flex;flex-direction: row;margin-top: 40rpx;">
						<view style="width: 35%;padding-top: 35%;position: relative;height: 0;">
							<image class="logo" :src="item.path"></image>
						</view>
						<view style="width: 35%;padding: 0 20rpx;position: relative;">
							<view>
								<view>{{item.name}} 数量：{{item.count}}</view>
								<view style="position: absolute;bottom: 0;display: flex;">
									<view style="font-size: 22rpx;margin-top: 8rpx;">￥</view>{{item.price * item.count}}
								</view>
							</view>
						</view>
						<view style="width: 40%;align-items: flex-end;display: flex;">
							<view @click="buyRqt(item)" class="buyBtn" type="primary" text="">去结算</view>
							<view @click="removeOrder(item)" class="buyBtn" style="width: 36%;" type="primary" text="">
								删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList: []
			}
		},
		methods: {
			buyRqt(data) {
				let cartListTmp = uni.getStorageSync("cartList") || [];
				let index = cartListTmp.indexOf(data);
				if (index) {
					cartListTmp.splice(index, 1)
				}
				uni.setStorageSync('cartList', cartListTmp);
				this.cartList = cartListTmp;

				this.$refs.uToast.show({
					message: '结算成功'
				});
			},
			removeOrder(data) {
				let index = this.cartList.indexOf(data)
				this.cartList.splice(index, 1);
				uni.setStorageSync('cartList', this.cartList);
				this.$refs.uToast.show({
					message: '订单删除成功'
				});
			},
			clearDinner() {
				uni.removeStorageSync("cartList")
				this.cartList = [];
			},
			//初始化徽标数量
			initBadge() {
				let badgeCount = this.cartList.length;
				if (badgeCount > 0) {
					uni.setTabBarBadge({
						index: 2,
						text: badgeCount.toString(),
						success() {
							console.log("success")
						},
						fail(e) {
							console.log("fail:", e)
						},
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
					})
				}
			}
		},
		watch: {
			// 如果 `question` 发生改变，这个函数就会运行
			cartList: function(newQuestion, oldQuestion) {
				this.initBadge()
			}
		},
		onShow() {
			console.log("order onLoad")

			let cartListTmp = uni.getStorageSync("cartList") || [];
			this.cartList = cartListTmp;
			this.initBadge();
			console.log(cartListTmp)
		}
	}
</script>

<style lang="scss">
	.logo {
		border-radius: 6px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.buyBtn {
		width: 51%;
		border-radius: 12px;
		height: 24px;
		background-color: $uni-bg-color-home;
		text-align: center;
		line-height: 24px;
		margin-right: 5px;
		color: white;
	}

	.goMenu {
		margin-top: 20px;
		height: 32px;
		line-height: 32px;
		border-radius: 22px;
		background-color: $uni-bg-color-home;
		color: white;
	}
</style>
