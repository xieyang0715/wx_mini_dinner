<template>
	<view>
		<view class="top"></view>
		<view ref="fff" class="content">
			<u-row customStyle="margin-bottom: 10px;align-items: normal;">
				<u-col span="3">
					<view style="padding: 0;">
						<view :class="{'backgroundColor':item.id == activeMenu.id}"
							style="height: 84rpx;color: #999999;line-height: 84rpx;padding-left: 30rpx;"
							v-for="(item, index) in categoryList" :key="index" @click.stop="changeMenu(item)">
							·{{item.name}}
						</view>
					</view>
				</u-col>
				<u-col span="9" style="overflow:hidden">
					<view :style="{height: contentHeight + 'px'}">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" @scroll="scroll"
							:scroll-with-animation="true" class="scroll-Y menu-class-items"
							:style="{height: contentHeight + 'px'}">
							<view style="padding-bottom: 24rpx;" :class="'menu_'+category.id"
								v-for="(category,indexc) in categoryList">
								<view style="padding-top: 22rpx;">{{category.name}}</view>
								<view v-for="(item, index) in menuList.filter(p=>p.categoryId == category.id)"
									:key="index">
									<view style="display: flex;flex-direction: row;margin-top: 40rpx;">
										<view style="width: 35%;padding-top: 35%;position: relative;height: 0;">
											<image class="logo" :src="item.path"></image>
										</view>
										<view style="width: 35%;padding: 0 20rpx;position: relative;">
											<view>
												<view>{{item.name}}</view>
												<view style="font-size: 22rpx;color: #C0C0C0;">
													月售{{item.monthSoleCount}}+
												</view>
												<view style="position: absolute;bottom: 0;display: flex;">
													<view style="font-size: 22rpx;margin-top: 8rpx;">￥</view>
													{{item.price}}起
												</view>
											</view>
										</view>
										<view style="width: 30%;align-items: flex-end;display: flex;">
											<view @click="buyRqt(item)" class="buy-btn" type="primary" text="">点餐</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</u-col>
			</u-row>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				oldScrollTop: 0,
				contentHeight: 100,
				//存储菜单内容到顶部得距离
				menuContentDicList: [],
				//手动点击菜单
				isHandleChangeMenu: false,
				categoryList: [{
						id: "11",
						name: "蒸菜"
					},
					{
						id: "22",
						name: "烧菜"
					},
					{
						id: "33",
						name: "小炒"
					},
					{
						id: "44",
						name: "干锅"
					},
					{
						id: "55",
						name: "汤类"
					},
					{
						id: "66",
						name: "小吃"
					}
				],
				menuList: [{
					categoryId: "11",
					id: "11111",
					path: "/static/menu/fenzhengrou.jpg",
					name: "粉蒸肉",
					price: 65,
					monthSoleCount: 88
				}, {
					categoryId: "11",
					id: "22222",
					path: "/static/menu/fenzhengpaigu.jpg",
					name: "粉蒸排骨",
					price: 65,
					monthSoleCount: 88
				}, {
					categoryId: "22",
					id: "33333",
					path: "/static/menu/tudoushaoji.jpg",
					name: "土豆烧鸡",
					price: 65,
					monthSoleCount: 88
				}, {
					categoryId: "33",
					id: "234555",
					path: "/static/menu/qingjiaotudousi.jpg",
					name: "青椒土豆丝",
					price: 65,
					monthSoleCount: 88
				}, {
					categoryId: "44",
					id: "44444",
					path: "/static/menu/ganguoxia.jpg",
					name: "干锅虾",
					price: 65,
					monthSoleCount: 88
				}, {
					categoryId: "66",
					id: "5555",
					path: "/static/menu/hongtangziba.jpg",
					name: "红糖滋巴",
					price: 16,
					monthSoleCount: 86
				}, ],
				activeMenu: {
					id: "11",
					name: "蒸菜"
				}
			}
		},
		methods: {
			scroll: function(e) {
				//处理滚动（非手动点击菜单滚动）
				if (!this.isHandleChangeMenu) {
					let data = this.getMenuContentDicByDistance(e.detail.scrollTop);
					if (data && data.menu != this.activeMenu) {
						this.activeMenu = data.menu;
						this.scrollTop = e.detail.scrollTop;
					}
				}
				this.oldScrollTop = e.detail.scrollTop;
				this.isHandleChangeMenu = false;
			},
			//获取ref元素到顶部得距离
			getElToTopInfo(refId, menu, callBack) {
				//获取某元素距离顶部的距离
				// uni.createSelectorQuery()需要在生命周期 mounted 后进行调用。
				var query = uni.createSelectorQuery().in(this);
				query.select(`.${refId}`).boundingClientRect(res => {
					callBack({
						top: res.top,
						height: res.height,
						menu: menu
					});
				}).exec()
			},
			changeMenu(menu) {
				let data = this.getMenuContentDicById(menu.id);
				this.isHandleChangeMenu = true;
				this.activeMenu = menu;
				this.scrollTop = data.distance;
			},
			//获取菜单menuId得高度数据
			getMenuContentDicById(menuId) {
				return this.menuContentDicList.find(function(item) {
					return item.menuId == menuId
				});
			},
			//获取菜单menuId得高度数据
			getMenuContentDicByDistance(distance) {
				//往上滑动
				if (this.oldScrollTop > distance) {
					return this.menuContentDicList.find(function(item) {
						return item.distance < distance && item.height + item.distance >
							distance; //当前滑动距离在整个菜单模块中间
					});
				} else {
					//往下滑动
					return this.menuContentDicList.find(function(item) {
						return item.distance < distance && distance < item.height + item
							.distance; //当前滑动距离在整个菜单模块中间
					});
				}
			},
			//初始化每个菜单内容到顶部得距离
			initMenuToTopDis() {
				let self = this;
				this.categoryList.forEach(ctg => {
					this.getElToTopInfo(`menu_${ctg.id}`, ctg, function(data) {
						self.menuContentDicList.push({
							distance: data.top,
							height: data.height,
							menu: data.menu,
							menuId: data.menu.id
						});
					});
				});
			},
			buyRqt(data) {
				data.count = 1;
				let cartList = uni.getStorageSync("cartList") || [];
				let existMenu = cartList.find(p => p.id == data.id);
				if (existMenu) {
					cartList.splice(cartList.indexOf(existMenu), 1)
					existMenu.count += 1;
					data = existMenu;
				}
				cartList.push(data)
				uni.setStorageSync('cartList', cartList);
				uni.setTabBarBadge({
					index: 2,
					text: cartList.length.toString(),
					success() {
						console.log("success")
					},
					fail(e) {
						console.log("fail:", e)
					},
				})

				this.$refs.uToast.show({
					message: '点餐成功'
				});
			},
			setMenuContentHeight() {
				let self = this;
				uni.getSystemInfo({
					success: function(res) {
						//高度 = 屏幕宽度 - tabbar - title
						self.contentHeight = res.windowHeight - 10;
						// console.log(res.model);
						// console.log(res.pixelRatio);
						// console.log(res.windowWidth);
						// console.log(res.windowHeight);
						// console.log(res.language);
						// console.log(res.version);
						// console.log(res.platform);
					}
				});
			}
		},
		computed: {
			menuObjectClass() {
				return function(id) {
					//激活选项
					if (id == this.activeMenu.id) {
						return "backgroundColor"
					}
				}
			}
		},
		onShow() {

		},
		onReady() {
			this.setMenuContentHeight();

			//1.这里初始化接口数据 
		},
		mounted() {
			this.initMenuToTopDis();
			//1.这里初始化接口数据 
		},
		onPullDownRefresh() {
			this.initMenuToTopDis();
			//2.这里下拉刷新调用列表接口
			//3.接口获取结束调用uni.stopPullDownRefresh();关闭下拉刷新
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="scss">
	.backgroundColor {
		color: #000000 !important;
		border-left: 4px solid $uni-bg-color-home;
	}

	.logo {
		border-radius: 6px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.buy-btn {
		width: 80%;
		border-radius: 12px;
		height: 24px;
		background-color: $uni-bg-color-home;
		text-align: center;
		line-height: 24px;
		color: white;
	}
</style>
