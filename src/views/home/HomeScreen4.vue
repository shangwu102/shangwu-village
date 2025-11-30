<script setup>
import { ref } from 'vue'
import { usePageView } from '@/composables/usePageView'
import { ElMessage } from 'element-plus'

// 分享功能相关函数
const shareTitle = '数字乡建 - 让每一份乡土记忆都被温柔托举'
const shareDesc = '以青年之智、数字之力，助力乡村走向可持续未来。'
const shareUrl = window.location.href

// 平台名称映射，用于提示信息
const platformNames = {
  wechat: '微信',
  qq: 'QQ',
  weibo: '微博',
  douyin: '抖音',
  kuaishou: '快手',
  xiaohongshu: '小红书'
}

// 防重复点击状态管理
const isSharing = ref(false)
const lastShareTime = ref(0)
const SHARE_DELAY = 1500 // 分享操作的最小间隔时间（毫秒）

// 检测是否在微信浏览器中（兼容各种微信版本和代理环境）
const isWechatBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger') || 
         ua.includes('wechat') || 
         ua.includes('wxwork') // 企业微信
}

// 检测是否在移动设备上
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 防抖函数 - 用于限制分享按钮的点击频率
const debounce = (func, delay) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// 分享到不同平台的通用函数
const shareToPlatform = (platform) => {
  // 防重复点击检查
  const now = Date.now()
  if (isSharing.value || (now - lastShareTime.value) < SHARE_DELAY) {
    ElMessage.info('请稍等片刻后重试分享')
    return
  }
  
  // 设置分享状态和时间
  isSharing.value = true
  lastShareTime.value = now
  
  try {
    // 显示分享开始提示
    // 开始分享
    
    let shareLink = ''
    
    switch(platform) {
      case 'wechat':
        // 微信分享改为复制链接方式
        if (isWechatBrowser()) {
          // 在微信内置浏览器中，仍然显示引导信息
          showWechatShareGuide()
        } else {
          // 复制分享链接
          copyToClipboard(shareUrl, platform)
        }
        break
      case 'qq':
        // QQ分享链接增强版，添加图片和更多参数
        try {
          // 添加默认分享图片（如果项目中有合适的图片，可以替换这个占位符）
          const shareImg = encodeURIComponent('https://example.com/share-image.jpg')
          
          shareLink = `https://connect.qq.com/widget/shareqq/index.html?
            url=${encodeURIComponent(shareUrl)}&
            title=${encodeURIComponent(shareTitle)}&
            desc=${encodeURIComponent(shareDesc)}&
            pics=${shareImg}&
            width=32&height=32`
            
          // 移除URL中的换行符
          shareLink = shareLink.replace(/\n\s*/g, '')
          
          // 打开分享窗口
          const qqShareWindow = window.open(shareLink, '_blank', 'width=700,height=500,top=100,left=100')
          
          if (qqShareWindow) {
            // 检查弹窗是否被阻止
            setTimeout(() => {
              if (qqShareWindow && !qqShareWindow.closed) {
                // QQ分享窗口打开
              } else {
                // QQ分享窗口可能被阻止
                copyToClipboard(shareUrl, platform)
              }
            }, 300)
          } else {
            // 如果弹窗被浏览器阻止，提供备用方案
            // QQ分享窗口被阻止
            copyToClipboard(shareUrl, platform)
          }
        } catch (error) {
          console.error('QQ分享出错:', error)
          ElMessage.error('QQ分享失败，请稍后重试')
        }
        break
      case 'weibo':
        // 微博分享链接增强版，添加图片和更多参数
        try {
          // 添加默认分享图片
          const shareImg = encodeURIComponent('https://example.com/share-image.jpg')
          
          // 组合微博分享文本，限制在140字以内
          let weiboText = `${shareTitle} ${shareDesc}`
          if (weiboText.length > 140) {
            weiboText = weiboText.substring(0, 137) + '...'
          }
          
          shareLink = `http://service.weibo.com/share/share.php?
            url=${encodeURIComponent(shareUrl)}&
            title=${encodeURIComponent(weiboText)}&
            pic=${shareImg}&
            appkey=&
            ralateUid=&
            language=zh_cn`
            
          // 移除URL中的换行符
          shareLink = shareLink.replace(/\n\s*/g, '')
          
          // 打开分享窗口
          const weiboShareWindow = window.open(shareLink, '_blank', 'width=600,height=400,top=100,left=100')
          
          if (weiboShareWindow) {
            // 检查弹窗是否被阻止
            setTimeout(() => {
              if (weiboShareWindow && !weiboShareWindow.closed) {
                // 微博分享窗口打开
              } else {
                // 微博分享窗口可能被阻止
                copyToClipboard(shareUrl, platform)
              }
            }, 300)
          } else {
            // 如果弹窗被浏览器阻止，提供备用方案
            // 微博分享窗口被阻止
            copyToClipboard(shareUrl, platform)
          }
        } catch (error) {
          console.error('微博分享出错:', error)
          ElMessage.error('微博分享失败，请稍后重试')
        }
        break
      case 'douyin':
        // 抖音分享改为复制链接方式
        copyToClipboard(shareUrl, platform)
        break
      case 'kuaishou':
        // 快手分享改为复制链接方式
        copyToClipboard(shareUrl, platform)
        break
      case 'xiaohongshu':
        // 小红书分享改为复制链接方式
        copyToClipboard(shareUrl, platform)
        break
      default:
        // 暂不支持该平台
    }
  } catch (error) {
    console.error('分享失败:', error)
    // 分享出错
  } finally {
    // 确保在任何情况下都能重置分享状态
    setTimeout(() => {
      isSharing.value = false
    }, SHARE_DELAY)
    }
  }
  // 复制文本到剪贴板（添加跨浏览器兼容性）
const copyToClipboard = (text, platform = null) => {
  // 现代浏览器使用 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showCopySuccessFeedback(platform)
    }).catch(err => {
      console.error('Clipboard API 复制失败:', err)
      // 降级到传统方法
      fallbackCopyTextToClipboard(text, platform)
    })
  } else {
    // 降级到传统方法
    fallbackCopyTextToClipboard(text, platform)
  }
}

// 降级复制方法，兼容旧浏览器
const fallbackCopyTextToClipboard = (text, platform = null) => {
  try {
    // 创建临时文本区域
    const textArea = document.createElement('textarea')
    textArea.value = text
    
    // 设置样式使其不可见
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    textArea.setAttribute('readonly', '')
    
    // 添加到DOM
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    // 执行复制命令
    const successful = document.execCommand('copy')
    
    // 清理 - 使用try-finally确保无论如何都会清理
      try {
        if (successful) {
          showCopySuccessFeedback(platform)
        } else {
          showCopyErrorFeedback(platform)
        }
      } finally {
        // 确保即使在显示反馈时出现错误，也会移除临时元素
        if (document.body.contains(textArea)) {
          document.body.removeChild(textArea)
        }
      }
  } catch (err) {
    console.error('传统复制方法失败:', err)
    showCopyErrorFeedback(platform)
  }
}

// 分享反馈辅助函数
// 使用debounce避免短时间内多次显示提示
const debouncedShowInfo = debounce((message) => {
  ElMessage.info(message)
}, 500)

const showCopySuccessFeedback = (platform = null) => {
  if (platform) {
    const platformName = platformNames[platform] || '平台'
    ElMessage({
      message: `链接已复制，请在${platformName}中粘贴分享`,
      type: 'success',
      duration: 4000,
      showClose: true
    })
  } else {
    ElMessage({
      message: '链接已复制，请粘贴到相应平台分享',
      type: 'success',
      duration: 4000,
      showClose: true
    })
  }
}

const showCopyErrorFeedback = (platform = null) => {
  if (platform) {
    const platformName = platformNames[platform] || '平台'
    ElMessage({
      message: `复制失败，请手动复制链接到${platformName}分享`,
      type: 'error',
      duration: 4000,
      showClose: true
    })
  } else {
    ElMessage({
      message: '复制失败，请手动复制链接',
      type: 'error',
      duration: 4000,
      showClose: true
    })
  }
}

const showWechatShareGuide = () => {
  ElMessage({
    message: '请点击右上角「···」按钮，选择「发送给朋友」或「分享到朋友圈」',
    type: 'info',
    duration: 5000,
    showClose: true
  })
}

// 微信分享对话框状态
const showWechatDialog = ref(false)

// 显示微信分享对话框
const showWechatShareDialog = () => {
  showWechatDialog.value = true
}

// 关闭微信分享对话框
const closeWechatShareDialog = () => {
  showWechatDialog.value = false
}

// 检查是否在微信内置浏览器中 (已在前面声明)

// 使用页面访问量追踪
const { currentPageViews, isLoading } = usePageView('about')

// 简化乡村推荐数据，确保内容简洁
const villages = [
  {
    id: 1,
    name: "青山渔村",
    description: "风景秀丽的沿海渔村，保存着完整的海洋文化和传统渔业生活方式。"
  },
  {
    id: 2,
    name: "大渔岛村",
    description: "美丽海岛上的传统村落，以丰富的海洋资源和特色海产品闻名。"
  },
  {
    id: 3,
    name: "周戈庄村",
    description: "历史悠久的古村落，保存有大量明清建筑和独特的传统手工艺。"
  }
]

// 项目目标数据
const goals = [
  {
    id: 1,
    title: '数字建档',
    description: '系统构建村落数字档案，实现文化活态传承。通过“乡忆寻踪”记录历史非遗，“乡忆漫游”打造沉浸体验，将文化记忆转化为可传播的数字资产，为品牌赋能奠定基础。'
  },
  {
    id: 2,
    title: '品牌赋能',
    description: '打造“乡忆好物”品牌生态，形成产品与文化互哺的闭环。我们精选村落特色物产，挖掘背后的文化故事，通过统一品牌升级，将普通土产转化为承载乡愁的“文化好物”，实现可持续发展。'
  },
  {
    id: 3,
    title: '模式推广',
    description: '探索可复制的“数字乡建”模式，助力乡村品牌化崛起。我们致力于总结实践经验，打造可适配不同村落特性的开放框架，推动传统村落文化传承与产业增效，为乡村振兴贡献青年智慧。'
  }
];
</script>

<template>
  <div class="footer-screen">
    <!-- 乡村推荐和项目目标左右分栏容器 -->
    <div class="top-content-container">
      <!-- 左侧：乡村推荐 -->
      <div class="left-section villages-section">
        <h3 class="column-title villages-title">乡村推荐</h3>
        <div class="villages-grid-horizontal">
          <div v-for="village in villages" :key="village.id" class="village-card-3d">
            <div class="village-card-inner">
              <div class="village-card-front">
                <div class="village-image-container">
                  <img src="@/assets/search/3/1.jpg" alt="乡村风光" class="village-image">
                </div>
                <h3 class="village-name-3d">{{ village.name }}</h3>
                <div class="flip-hint">翻转查看详情</div>
              </div>
              <div class="village-card-back">
                <p class="village-description-back">{{ village.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：项目目标 -->
      <div class="right-section villages-section">
        <h3 class="column-title villages-title">项目目标</h3>
        <div class="villages-grid-horizontal">
          <div v-for="goal in goals" :key="goal.id" class="goal-card-3d">
            <div class="goal-card-inner">
              <div class="goal-card-front">
                <div class="goal-icon-container">
                  <!-- 根据不同目标显示不同图标 -->
                  <div v-if="goal.id === 1" class="goal-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4a90e2" stroke-width="2" />
                      <path d="M2 17L12 22L22 17" stroke="#4a90e2" stroke-width="2" />
                      <path d="M2 12L12 17L22 12" stroke="#4a90e2" stroke-width="2" />
                    </svg>
                  </div>
                  <div v-else-if="goal.id === 2" class="goal-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="4" width="16" height="16" rx="2" stroke="#4a90e2" stroke-width="2" />
                      <rect x="9" y="9" width="6" height="6" stroke="#4a90e2" stroke-width="2" />
                      <line x1="12" y1="1" x2="12" y2="3" stroke="#4a90e2" stroke-width="2" />
                      <line x1="12" y1="21" x2="12" y2="23" stroke="#4a90e2" stroke-width="2" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#4a90e2" stroke-width="2" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#4a90e2" stroke-width="2" />
                      <line x1="1" y1="12" x2="3" y2="12" stroke="#4a90e2" stroke-width="2" />
                      <line x1="21" y1="12" x2="23" y2="12" stroke="#4a90e2" stroke-width="2" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#4a90e2" stroke-width="2" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#4a90e2" stroke-width="2" />
                    </svg>
                  </div>
                  <div v-else class="goal-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                      <path d="M18 13L12 19L6 13" stroke="#4a90e2" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <circle cx="12" cy="12" r="9" stroke="#4a90e2" stroke-width="2" />
                    </svg>
                  </div>
                </div>
                <h3 class="goal-name-3d">{{ goal.title }}</h3>
                <div class="flip-hint">翻转查看详情</div>
              </div>
              <div class="goal-card-back">
                <p class="goal-description-back">{{ goal.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 三栏布局容器 -->
    <div class="footer-container">
      <!-- 左侧：联系我们 -->
      <div class="footer-column contact-column">
        <h3 class="column-title">联系我们</h3>
        <div class="contact-info">
          <p class="address"><span class="icon">🏠</span> Address: 山东省烟台市高新区海兴路15号2D201室</p>
          <p class="phone"><span class="icon">📞</span> phone: 15105490597（赵）</p>
          <p class="email"><span class="icon">✉️</span> E-mail: 1764065163@qq.com</p>
          <p class="email"><span class="icon">✉️</span> 微信公众号：（邢申请）</p>
        </div>
      </div>

      <!-- 中间：问题解答 -->
      <div class="footer-column faq-column">
        <h3 class="column-title">问题解答</h3>
        <div class="faq-content">
          <div class="faq-item">
            <div class="faq-question">
              <span class="faq-toggle">-</span>
              我们是谁？团队介绍？
            </div>
            <div class="faq-answer">
              答：我们是山东商务职业学院“云行阡陌”团队，致力于让每一份乡土记忆都被数字技术温柔托举，让每一个传统村落都在时代浪潮中找回自己的声音与价值。以青年之智、数字之力，踏云而行，重走阡陌，助力乡村走向一个更可持续、更美好的未来。
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：分享按钮 -->
      <div class="footer-column share-column">
        <h3 class="column-title">分享我们</h3>
        <!-- 重新设计的分享布局 -->
        <div class="share-section">
          <!-- 分享按钮网格布局 -->
          <div class="share-grid">
            <div class="share-item" @click="shareToPlatform('kuaishou')">
              <div class="share-icon">🔔</div>
              <span class="share-name">快手</span>
            </div>
            <div class="share-item" @click="shareToPlatform('wechat')">
              <div class="share-icon">🔴</div>
              <span class="share-name">微信</span>
            </div>
            <div class="share-item" @click="shareToPlatform('xiaohongshu')">
              <div class="share-icon">💚</div>
              <span class="share-name">小红书</span>
            </div>
            <div class="share-item" @click="shareToPlatform('qq')">
              <div class="share-icon">🔵</div>
              <span class="share-name">QQ</span>
            </div>
            <div class="share-item" @click="shareToPlatform('weibo')">
              <div class="share-icon">🐦</div>
              <span class="share-name">微博</span>
            </div>
            <div class="share-item" @click="shareToPlatform('douyin')">
              <div class="share-icon">⭕</div>
              <span class="share-name">抖音</span>
            </div>
          </div>
        </div>

        <!-- 访问量统计组件 - 与新布局协调 -->
        <div class="page-views-counter">
          <div class="views-content">
            <div class="views-header">
              <el-icon class="view-icon">
                <View />
              </el-icon>
              <span class="views-label">访问量 : {{ isLoading ? '...' : currentPageViews.toLocaleString() }}</span>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- 微信分享对话框 -->
    <div v-if="showWechatDialog" class="wechat-share-dialog-overlay" @click="closeWechatShareDialog">
      <div class="wechat-share-dialog" @click.stop>
        <div class="wechat-dialog-header">
          <h3>微信分享</h3>
          <div class="close-btn" @click="closeWechatShareDialog">×</div>
        </div>
        <div class="wechat-dialog-content">
          <div class="wechat-share-qrcode">
            <!-- 这里使用一个占位符，实际项目中应该生成真实的分享二维码 -->
            <div class="qrcode-placeholder">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- 二维码背景 -->
                <rect width="200" height="200" fill="white"/>
                <!-- 二维码定位图案 -->
                <rect x="20" y="20" width="40" height="40" fill="black"/>
                <rect x="140" y="20" width="40" height="40" fill="black"/>
                <rect x="20" y="140" width="40" height="40" fill="black"/>
                <rect x="30" y="30" width="20" height="20" fill="white"/>
                <rect x="150" y="30" width="20" height="20" fill="white"/>
                <rect x="30" y="150" width="20" height="20" fill="white"/>
                <!-- 模拟二维码内容 -->
                <rect x="20" y="70" width="10" height="10" fill="black"/>
                <rect x="40" y="70" width="10" height="10" fill="black"/>
                <rect x="70" y="70" width="10" height="10" fill="black"/>
                <rect x="90" y="70" width="10" height="10" fill="black"/>
                <rect x="120" y="70" width="10" height="10" fill="black"/>
                <rect x="140" y="70" width="10" height="10" fill="black"/>
                <rect x="160" y="70" width="10" height="10" fill="black"/>
                <rect x="20" y="90" width="10" height="10" fill="black"/>
                <rect x="50" y="90" width="10" height="10" fill="black"/>
                <rect x="80" y="90" width="10" height="10" fill="black"/>
                <rect x="100" y="90" width="10" height="10" fill="black"/>
                <rect x="130" y="90" width="10" height="10" fill="black"/>
                <rect x="160" y="90" width="10" height="10" fill="black"/>
                <rect x="30" y="110" width="10" height="10" fill="black"/>
                <rect x="60" y="110" width="10" height="10" fill="black"/>
                <rect x="90" y="110" width="10" height="10" fill="black"/>
                <rect x="110" y="110" width="10" height="10" fill="black"/>
                <rect x="140" y="110" width="10" height="10" fill="black"/>
                <rect x="160" y="110" width="10" height="10" fill="black"/>
                <rect x="20" y="130" width="10" height="10" fill="black"/>
                <rect x="40" y="130" width="10" height="10" fill="black"/>
                <rect x="70" y="130" width="10" height="10" fill="black"/>
                <rect x="90" y="130" width="10" height="10" fill="black"/>
                <rect x="120" y="130" width="10" height="10" fill="black"/>
              </svg>
              <p>扫码分享</p>
            </div>
          </div>
          <div class="wechat-share-info">
            <h4>分享步骤：</h4>
            <ul>
              <li v-if="isWechatBrowser()">
                1. 点击右上角<span class="share-tip-icon">···</span>
              </li>
              <li v-if="isWechatBrowser()">
                2. 选择「发送给朋友」或「分享到朋友圈」
              </li>
              <li v-else>
                1. 使用微信扫描左侧二维码
              </li>
              <li>
                2. 在微信内点击右上角<span class="share-tip-icon">···</span>进行分享
              </li>
            </ul>
          </div>
        </div>
        <div class="wechat-dialog-footer">
          <button class="copy-link-btn" @click="copyToClipboard(shareUrl)">复制链接</button>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="footer-bottom">
      <img src="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png" alt="公安备案" width="16" height="16">

      <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37028102001616"
        target="_blank">鲁公网安备37028102001616号</a>
      <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2024091574号-1</a>

    </div>
  </div>
</template>

<style scoped>
.footer-screen {
  width: 100%;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 2rem 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  height: 300px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 2rem;
}

/* 通用列样式 */
.footer-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
}

.column-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
  position: relative;
  padding-bottom: 0.5rem;
}

.column-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #4a90e2;
}

/* 确保分享我们的标题对齐 */
.share-column .column-title {
  text-align: center;
}

.share-column .column-title::after {
  left: 50%;
  transform: translateX(-50%);
}

/* 左侧：联系我们样式 */
.contact-column {
  justify-content: space-between;
  min-height: 400px;
}

.contact-info {
  flex: 1;
  margin-bottom: 1.5rem;
}

.contact-info p {
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  line-height: 1.5;
  font-size: 0.9rem;
}

.contact-info .icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.logo-container {
  margin-top: auto;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 0.5rem;
}

.logo-text {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 1rem;
}

.qrcode {
  width: 100px;
  height: 100px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
}

.qrcode-placeholder {
  color: #999;
  font-size: 0.8rem;
  text-align: center;
  line-height: 1.2;
}

/* 中间：问题解答样式 */
.faq-column {
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.faq-content {
  flex: 1;
}

.faq-item {
  margin-bottom: 1rem;
}

.faq-question {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #ffffff;
  border-bottom: 1px solid #333;
}

.faq-toggle {
  margin-right: 0.5rem;
  color: #4a90e2;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.faq-answer {
  padding: 1rem 0 0.5rem 1.5rem;
  font-size: 0.9rem;
  color: #cccccc;
  line-height: 1.6;
}

.visitors-count {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.visitors-title {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 0.5rem;
}

.visitors-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a90e2;
  letter-spacing: 1px;
}

/* 顶部内容左右分栏容器 */
.top-content-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 1.5rem;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* 左侧乡村推荐样式 */
.left-section {
  flex: 2;
}

/* 右侧项目目标样式 */
.right-section {
  flex: 1;
  /* 确保项目目标部分可以横向排列 */
}

/* 项目目标网格布局 - 已改为使用villages-grid-horizontal */
.goals-grid {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* 项目目标3D卡片样式 */
.goal-card-3d {
  /* 使用相对宽度以适应横向排列，最小宽度确保卡片不会太小 */
  width: calc(33.333% - 20px);
  min-width: 160px;
  height: 170px;
  perspective: 800px;
}

.goal-card-inner {
  position: relative;
  width: 100%;
  height: 90%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

/* 3D翻转效果 */
.goal-card-3d:hover .goal-card-inner {
  transform: rotateY(180deg);
}

.goal-card-front,
.goal-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
}

.goal-card-front {
  background-color: #2a2a2a;
  border: 1px solid rgba(95, 140, 207, 0.3);
}

.goal-card-back {
  background-color: #4a90e2;
  color: white;
  transform: rotateY(180deg);
  text-orientation: mixed;
  writing-mode: horizontal-tb;
  border: 1px solid rgba(132, 184, 84, 0.3);
}

/* 图标容器样式 */
.goal-icon-container {
  margin-bottom: 5px;
}

.goal-name-3d {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.goal-name-back {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 5px;
}

.goal-description-back {
  font-size: 0.85rem;
  line-height: 1.3;
  color: #ffffff;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  text-align: center;
  width: 100%;
}

.villages-section {
  width: 100%;
  margin: 0;
  padding: 0;
}

.villages-title {
  text-align: left;
  margin-bottom: 1rem;
}

.villages-title::after {
  left: 0;
  transform: none;
}

.villages-grid-horizontal {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  /* flex-wrap: wrap; */
  /* 确保在任何父容器设置下都保持横向排列 */
  flex-direction: row !important;
}

/* 3D卡片样式 */
.village-card-3d {
  width: 180px;
  height: 150px;
  perspective: 800px;
  flex-shrink: 0;
}

.village-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

/* 3D翻转效果 */
.village-card-3d:hover .village-card-inner {
  transform: rotateY(180deg);
}

.village-card-front,
.village-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
}

.village-card-front {
  background-color: #2a2a2a;
  border: 1px solid rgba(95, 140, 207, 0.3);
}

.village-card-back {
  background-color: #4a90e2;
  color: white;
  transform: rotateY(180deg);
  border: 1px solid rgba(132, 184, 84, 0.3);
  text-orientation: mixed;
  writing-mode: horizontal-tb;
}

.village-image-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 4px;
  border: 1px solid #4a90e2;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.village-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.village-card-3d:hover .village-image {
  transform: scale(1.1);
}

.village-name-3d {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.village-name-back {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.village-description-back {
  font-size: 0.75rem;
  line-height: 1.3;
  color: #ffffff;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  text-align: center;
  width: 100%;
}

.flip-hint {
  font-size: 8px;
  color: #999;
  margin-top: 4px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {

  0%,
  50% {
    opacity: 0.5;
  }

  51%,
  100% {
    opacity: 1;
  }
}

/* 右侧：分享按钮样式 */
.share-column {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* 重新设计的分享区域样式 */
.share-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 分享按钮网格布局 - 添加响应式设计 */
.share-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 240px;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

/* 分享项样式 */
.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  padding: 5px;
}

.share-item:hover {
  transform: translateY(-3px);
  opacity: 0.9;
}

/* 分享图标样式 */
.share-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(74, 144, 226, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* 响应式分享按钮调整 */
@media (max-width: 768px) {
  .share-grid {
    gap: 0.8rem;
    max-width: 200px;
  }
  
  .share-icon {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
  
  .share-name {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .share-grid {
    gap: 0.6rem;
    max-width: 180px;
  }
  
  .share-icon {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
  
  .share-name {
    font-size: 0.7rem;
  }
}

.share-item:hover .share-icon {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  box-shadow: 0 6px 12px rgba(74, 144, 226, 0.3);
  transform: scale(1.1);
}

/* 分享名称样式 */
.share-name {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

/* 分享提示文字 */
.share-tip {
  text-align: center;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 3px solid #4a90e2;
  width: 100%;
  max-width: 240px;
}

.share-tip p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}

/* 访问量统计样式 - 与新布局协调 */
.page-views-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(74, 144, 226, 0.08) 100%);
  border: 1px solid rgba(74, 144, 226, 0.25);
  border-radius: 16px;
  padding: 0 1rem;
  width: 100%;
  height: 50px;
  max-width: 240px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.page-views-counter:hover {
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(74, 144, 226, 0.12) 100%);
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.2);
  transform: translateY(-3px);
}

.views-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

.views-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.view-icon {
  color: #4a90e2;
  font-size: 1.1rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.views-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.views-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-count {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
}

.view-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}



/* 底部版权信息 */
.footer-bottom {
  width: 100%;
  max-width: 1200px;
  margin: 1.5rem auto 0;
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.footer-bottom img {
  margin-top: -5px;
}
.footer-bottom a {
  font-size: 0.8rem;
  color: #999;
  margin-left:0;
  margin-right: 10px;
  margin-top: -5px;
}

.footer-bottom img {
  vertical-align: middle;
  margin-right: 6px;
}

/* 微信分享对话框样式 */
.wechat-share-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.wechat-share-dialog {
  background-color: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: dialogFadeIn 0.3s ease;
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.wechat-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  background-color: #f8f8f8;
}

.wechat-dialog-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.close-btn {
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  color: #333;
  background-color: #eee;
}

.wechat-dialog-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wechat-share-qrcode {
  margin-bottom: 1.5rem;
}

.qrcode-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-placeholder p {
  margin-top: 0.5rem;
  color: #333;
  font-size: 0.9rem;
}

.wechat-share-info {
  width: 100%;
}

.wechat-share-info h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1rem;
  text-align: center;
}

.wechat-share-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.wechat-share-info li {
  margin-bottom: 0.5rem;
  color: #666;
  line-height: 1.4;
  padding-left: 1rem;
  position: relative;
}

.wechat-share-info li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #4a90e2;
}

.share-tip-icon {
  background-color: #f0f0f0;
  padding: 0 0.5rem;
  border-radius: 4px;
  font-size: 1.2rem;
  margin: 0 0.2rem;
}

.wechat-dialog-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
}

.copy-link-btn {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.copy-link-btn:hover {
  background-color: #357abd;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wechat-share-dialog {
    width: 95%;
    margin: 1rem;
  }
  
  .qrcode-placeholder svg {
    width: 160px;
    height: 160px;
  }
}

/* 中等屏幕响应式设计 */
@media (max-width: 992px) {
  .top-content-container {
    /* 保持flex布局但调整为row方向以支持项目目标横向排列 */
    flex-direction: row;
    gap: 1.5rem;
    padding: 0 1.5rem;
    flex-wrap: wrap;
  }

  .left-section,
  .right-section {
    flex: 1;
    width: 100%;
  }

  .villages-grid-horizontal {
    justify-content: center;
  }

}

/* 小屏幕响应式设计 */
@media (max-width: 768px) {
  .top-content-container {
    padding: 0 1rem;
    /* 保持flex布局但调整为row方向以支持项目目标横向排列 */
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }

  .villages-grid-horizontal {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .village-card-3d {
    width: 120px;
    height: 110px;
  }

  .column-title {
    font-size: 1.3rem;
  }

  .contact-info p {
    font-size: 0.85rem;
  }

  .village-name-3d,
  .village-name-back {
    font-size: 1.1rem;
  }

  .village-description-back {
    font-size: 0.8rem;
  }

  .visitors-number {
    font-size: 1.3rem;
  }

  .share-buttons-large {
    gap: 0.8rem;
  }


  .goal-card-3d {
    height: 150px;
    width: 150px;
  }

  .goal-name-3d,
  .goal-name-back {
    font-size: 0.9rem;
  }

  .goal-description-back {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .footer-screen {
    padding: 1.5rem 0;
  }

  .footer-container {
    padding: 0 1rem;
  }

  .column-title {
    font-size: 1.2rem;
  }

  .contact-info p {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .logo {
    font-size: 1.8rem;
  }

  .logo-text {
    font-size: 0.8rem;
  }

  .qrcode {
    width: 80px;
    height: 80px;
  }

  .faq-question {
    font-size: 0.9rem;
  }

  .faq-answer {
    font-size: 0.85rem;
    padding-left: 1.2rem;
  }

  .share-buttons {
    gap: 0.4rem;
  }

  .share-btn {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }

  .footer-bottom p {
    font-size: 0.75rem;
  }
}
</style>