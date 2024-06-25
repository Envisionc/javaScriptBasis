<wxs module="filters" src="../../../../utils/addmul.wxs"></wxs>
<view>
  <view >
    <scroll-view scroll-y scroll-into-view='{{toView}}'  style='height: {{scrollHeight}};' refresher-enabled="true" bindrefresherrefresh="loadMore" refresher-triggered="{{triggered}}">
      <view class='scrollMsg' >
        <block wx:key="key" wx:for='{{msgList}}' wx:for-index="index">
            <!-- 时间显示，时间间隔为5分钟（5分钟内的消息不必再显示时间） -->
            <view class="showTime" wx:if="{{item.showTime !== null}}">
              {{item.showTime}}
            </view>

            <!-- 单个消息1 客服发出（左） -->
            <view class="server" wx:if="{{item.jid == 'server'}}" id='msg-{{index}}'>
              <view class="serverIcon">
                <image src='{{head_img}}'></image>
              </view>
              <view class="serverContent">
                <view class="Angle">
                </view>
                <view class="Data">
                  <view class="leftMsg" wx:if="{{item.type == '1' }}">{{item.msg}}</view>
                  
                  <view class="leftMsg" wx:if="{{item.type == '2' }}">
                      <image src="{{item.msg}}" class="image" catchtap="picture" data-src="{{item.msg}}"></image>
                  </view>
                  
                  <view class="leftMsg" wx:if="{{item.type == '3' }}">
                      <view bindtap='playVoice' data-item="{{item}}" data-index="{{index}}">
                        <image style='height:32rpx;width:32rpx;'
                          src="{{imgs.yyxx}}" mode="aspectFit"></image>
                          {{filters.toFix(item.duration / 1000)}}"
                      </view>
                    </view>
                </view>
            </view>
            </view>

            <!-- 单个消息2 用户发出（右） -->
            <view class="customer" wx:else id='msg-{{index}}'>
                <!-- 发起方的聊天框 -->
                <view class="customerContent">
                  <view class="Data">
                  
                    <view class="rightMsg" wx:if="{{item.type == '1' }}">{{item.msg}}</view>
                    
                    <view class="rightMsg" wx:if="{{item.type == '2' }}">
                      <image class="image" src="{{item.msg}}" catchtap="picture" data-src="{{item.msg}}"></image>
                    </view>
                    
                    <view class="rightMsg" wx:if="{{item.type == '3' }}">
                      <view bindtap='playVoice' data-item="{{item}}" data-index="{{index}}">
                        {{filters.toFix(item.duration / 1000)}}"
                        <image style='height:32rpx;width:32rpx;margin-right:28rpx;'
                          src="{{imgs.yyxx}}" mode="aspectFit"></image>
                      </view>
                    </view>
                  </view>
                  <view class="AngleRight">
              </view>
            </view>
              <!-- 发起方的头像 -->
              <view class="serverIcon">
                <image  src='{{head_img}}'></image>
              </view>
            </view>
        </block>
      </view>
    </scroll-view>
  </view>

  <!-- 底部键盘、语音、加号 -->
  <view class='inputRoom' style="bottom: {{inputBottom  + 'px'}}">
    <image src='{{!voice ? imgs.icon_yy : imgs.xjp}}' catchtap="addSpeakMsg"  mode='widthFix'></image>
    <input wx:if="{{!voice}}" bindconfirm='sendClick' adjust-position='{{false}}' value="{{inputVal}}" confirm-type='send' bindfocus='focus' bindblur='blur' bindinput="getInputVal" maxlength="100"></input>
    <view wx:else class="touch" bindtouchstart="touchdown"  bindtouchend="touchup" bindtouchmove="touchmove">长按 说话</view>
    <image src='{{imgs.icon_gdgn}}' mode='widthFix' catchtap="addOtherFormatMsg"></image>
  </view>

  <!-- 点击加号图标 -->
  <view class="chat-camera" wx:if="{{camera}}">
      <view wx:for="{{feature}}" wx:key="index" class="camera-feature" catchtap="featch" data-index="{{index}}">
        <view class="feature-src">
          <image src="{{item.src}}"></image>
        </view>
        <view class="feature-text">{{item.name}}</view>
      </view>
  </view>

</view>

<!-- 语音遮罩层 -->
<view class="voice-mask" wx:if="{{mask}}">
	<!--语音条 -->
	<view class="voice-bar {{needCancel ? 'voiceDel' : ''}}">
		<image src="{{imgs.sb_c}}" class="voice-volume {{needCancel ? 'voiceDel' : ''}}"></image>
	</view>
	<!-- 底部区域 -->
	<view class="voice-send">
		<!-- 取消图标 -->
		<view class="voice-middle-wrapper">
			<!-- 取消 -->
			<view class="voice-left-wrapper">
				<view class="voice-middle-inner close {{needCancel ? 'bigger' : ''}}">
					<image src="{{imgs.voiceCancel}}" class="close-icon"></image>
				</view>
			</view>
			<view class="send-tip {{needCancel ? sendTipNone:''}}">{{sendtip}}</view>
		</view>	
		<!-- 底部语音显示 -->
		<view class="mask-bottom">
			<image src="{{imgs.ht}}"></image>
		</view>
	</view>	
</view>



<scroll-view scroll-y="true" scroll-into-view="{{toView}}" scroll-with-animation="true" wx:if='{{doctorInfo}}' class="inquiry-swiper">
	<dialogue-box inquiry-info='{{inquiryInfo}}' role='{{1}}'></dialogue-box>
	<view id="toView" class="pb-100"></view>
</scroll-view>