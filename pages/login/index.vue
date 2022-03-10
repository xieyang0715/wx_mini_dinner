<template>
	<view>
		<open-data type="getUserProfile"> 获取头像昵称 </open-data>
		<!-- <view @click="getPhoneNumber">获取手机号</view> -->
		<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber2">获取手机号</button>
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号2</button>
		<view>{{data2}}</view>
		<view>{{phone}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: "",
				data2: "2",
				phone: "phone"
			};
		},
		methods: {
			login(e) {
				console.log("login")
				let self = this;
				console.log("login2")

			},
			getUserInfo() {
				//授权弹窗-获取用户信息
				uni.authorize({
					scope: 'scope.userInfo',
					success() {
						console.log("authorize success")
						// 获取用户信息
						uni.getUserProfile({
							provider: 'weixin',
							success: function(infoRes) {
								console.log('用户昵称为：' + infoRes.userInfo.nickName);
								console.log('用户信息：' + JSON.stringify(infoRes));
							}
						});
					},
					fail(err) {
						console.log("authorize fail:" + JSON.stringify(err))

					}
				})
			},
			getUserProfile() {
				console.log("getUserProfile")
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log('用户信息：' + JSON.stringify(res));
					}
				})
			},
			wxLogin() {
				let self = this;
				uni.login({
					success(res) {
						console.log("33333")
						console.log(res)
						if (res.code) {
							//发起网络请求
							uni.$u.http.get("/api/Wx", {
								params: {
									code: res.code
								}
							}).then(data => {
								console.log(data)
								this.goHome();
							}).catch(err => {

							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
			getPhoneNumber(e, data) {
				console.log(JSON.stringify(e))
				console.log(e.detail.code)
				console.log(JSON.stringify(data))
				console.log(data)
				let self = this;
				//发起网络请求
				uni.$u.http.get("/api/Wx/getPhoneNumber", {
					params: {
						code: e.detail.code
					}
				}).then(data => {
					console.log(data)
					self.phone = data;
				}).catch(err => {

				})
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		},
		getPhoneNumber2: function(e) {
			console.log(JSON.stringify(e))
			console.log(e.detail.code)
			let self = this;
			//发起网络请求
			uni.$u.http.get("/api/Wx/getPhoneNumber", {
				params: {
					code: e.detail.code
				}
			}).then(data => {
				console.log(data)
				self.phone = data;
			}).catch(err => {

			})
		},
		onShow() {
			// this.getPhoneNumber();
			this.wxLogin();
		}
	}
</script>

<style lang="scss">

</style>
