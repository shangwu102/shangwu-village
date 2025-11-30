<script setup>
import { ref } from 'vue'
import { usePageView } from '@/composables/usePageView'
import { ElMessage } from 'element-plus'
import VillageCard from '@/components/HomeScreen4Com/VillageCard.vue'
import GoalCard from '@/components/HomeScreen4Com/GoalCard.vue'

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
  bilibili: 'bilibili'
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

    switch (platform) {
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
      case 'bilibili':
        // bilibili分享改为复制链接方式
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
          <VillageCard v-for="village in villages" :key="village.id" :village="village" />
        </div>
      </div>

      <!-- 右侧：项目目标 -->
      <div class="right-section villages-section">
        <h3 class="column-title villages-title">项目目标</h3>
        <div class="villages-grid-horizontal">
          <GoalCard v-for="goal in goals" :key="goal.id" :goal="goal" />
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
          <p class="email">
            <span class="icon">
              <svg t="1764473226056" style="width: 26px; height: 28px;" class="icon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9026" width="200" height="200"><path d="M300.7 449.5c0 25.8 20.9 46.8 46.8 46.8 25.8 0 46.8-20.9 46.8-46.8 0-25.8-20.9-46.8-46.8-46.8-25.8 0-46.8 21-46.8 46.8zM629.4 449.5c0 25.8 20.9 46.8 46.8 46.8 25.8 0 46.8-20.9 46.8-46.8 0-25.8-20.9-46.8-46.8-46.8s-46.8 21-46.8 46.8z" fill="#3259CE" p-id="9027"></path><path d="M511.8 116.9c-247.3 0-448.6 166.7-448.6 371.5 0 29.5 4.6 58.4 12.7 86.4h0.4c1.4 6.8 7.2 11.9 14.3 11.9 8.3 0 15-6.7 15-15 0-0.6-0.3-1.2-0.4-1.8 0-0.2 0.3-0.4 0.3-0.5-8-26.4-12.4-53.1-12.4-81.1 0-188.4 187.8-341.6 418.7-341.6 230.8 0 418.6 153.2 418.6 341.6 0 188.4-187.8 341.6-418.6 341.6-45.2 0-90.2-6.1-133.8-18.1l-133.8 77.8c-3.3 1.7-6.9 2.5-10.4 2.5-5.6 0-11.1-2-15.4-5.9-7.1-6.3-9.6-16.3-6.4-25.2l27.2-113.6c-40.8-28.5-73.4-62.7-97.7-100.3h-0.1c-2.4-5-7.5-8.6-13.4-8.6-8.3 0-15 6.7-15 15 0 2.4 0.6 4.5 1.6 6.5 0 0.1-0.1 0.1 0 0.2 23.2 37.1 53.3 70.5 90.9 99.6l-22.3 93c-6.5 20-0.6 41.8 15.2 55.8 9.7 8.7 22.2 13.5 35.3 13.5 8.3 0 16.5-2 25.4-6.5L382.2 844c42.3 10.6 85.8 16 129.4 16 247.3 0 448.6-166.7 448.6-371.5 0.2-204.9-201-371.6-448.4-371.6z" fill="#3259CE" p-id="9028"></path></svg>
            </span> 
            微信公众号：（邢申请）</p>
        </div>gongzhonghao
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
            <div class="share-item" @click="shareToPlatform('weibo')">
              <svg t="1764472414845" class="icon share-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="7798" width="200" height="200">
                <path
                  d="M851.4 590.193c-22.196-66.233-90.385-90.422-105.912-91.863-15.523-1.442-29.593-9.94-19.295-27.505 10.302-17.566 29.304-68.684-7.248-104.681-36.564-36.14-116.512-22.462-173.094 0.866-56.434 23.327-53.39 7.055-51.65-8.925 1.89-16.848 32.355-111.02-60.791-122.395C311.395 220.86 154.85 370.754 99.572 457.15 16 587.607 29.208 675.873 29.208 675.873h0.58c10.009 121.819 190.787 218.869 412.328 218.869 190.5 0 350.961-71.853 398.402-169.478 0 0 0.143-0.433 0.575-1.156 4.938-10.506 8.71-21.168 11.035-32.254 6.668-26.205 11.755-64.215-0.728-101.66z m-436.7 251.27c-157.71 0-285.674-84.095-285.674-187.768 0-103.671 127.82-187.76 285.674-187.76 157.705 0 285.673 84.089 285.673 187.76 0 103.815-127.968 187.768-285.673 187.768z"
                  fill="#E71F19" p-id="7799"></path>
                <path
                  d="M803.096 425.327c2.896 1.298 5.945 1.869 8.994 1.869 8.993 0 17.7-5.328 21.323-14.112 5.95-13.964 8.993-28.793 8.993-44.205 0-62.488-51.208-113.321-114.181-113.321-15.379 0-30.32 3.022-44.396 8.926-11.755 4.896-17.263 18.432-12.335 30.24 4.933 11.662 18.572 17.134 30.465 12.238 8.419-3.46 17.268-5.33 26.41-5.33 37.431 0 67.752 30.241 67.752 67.247 0 9.068-1.735 17.857-5.369 26.202a22.832 22.832 0 0 0 12.335 30.236l0.01 0.01z"
                  fill="#F5AA15" p-id="7800"></path>
                <path
                  d="M726.922 114.157c-25.969 0-51.65 3.744-76.315 10.942-18.423 5.472-28.868 24.622-23.5 42.91 5.509 18.29 24.804 28.657 43.237 23.329a201.888 201.888 0 0 1 56.578-8.064c109.253 0 198.189 88.271 198.189 196.696 0 19.436-2.905 38.729-8.419 57.16-5.508 18.289 4.79 37.588 23.212 43.053 3.342 1.014 6.817 1.442 10.159 1.442 14.943 0 28.725-9.648 33.37-24.48 7.547-24.906 11.462-50.826 11.462-77.175-0.143-146.588-120.278-265.813-267.973-265.813z"
                  fill="#F5AA15" p-id="7801"></path>
                <path
                  d="M388.294 534.47c-84.151 0-152.34 59.178-152.34 132.334 0 73.141 68.189 132.328 152.34 132.328 84.148 0 152.337-59.182 152.337-132.328 0-73.15-68.19-132.334-152.337-132.334zM338.53 752.763c-29.454 0-53.39-23.755-53.39-52.987 0-29.228 23.941-52.989 53.39-52.989 29.453 0 53.39 23.76 53.39 52.989 0 29.227-23.937 52.987-53.39 52.987z m99.82-95.465c-6.382 11.086-19.296 15.696-28.726 10.219-9.43-5.323-11.75-18.717-5.37-29.803 6.386-11.09 19.297-15.7 28.725-10.224 9.43 5.472 11.755 18.864 5.37 29.808z"
                  fill="#040000" p-id="7802"></path>
              </svg>
              <!-- <span class="share-name">微博</span> -->
            </div>
             <div class="share-item" @click="shareToPlatform('qq')">
              <svg t="1764472050365" class="icon share-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1648" width="200" height="200">
                <path
                  d="M666.122449 909.061224c-10.44898 0-21.420408-1.044898-31.869388-2.612244-39.183673-4.702041-74.710204-23.510204-100.832653-53.289796-13.583673 5.22449-28.212245 5.22449-41.795918 0-21.420408 28.212245-61.64898 48.065306-108.669388 53.289796-66.35102 7.314286-138.44898-11.493878-144.718367-55.379592-5.22449-34.481633 37.093878-61.126531 81.502041-75.755102-25.6-28.212245-43.363265-63.738776-51.2-101.355102l-0.522449 0.522449c-25.077551 31.346939-41.795918 50.155102-61.126531 50.155102-2.089796 0-4.179592-0.522449-6.269388-1.044898-7.314286-2.612245-13.061224-8.881633-17.240816-18.808164-16.195918-34.481633-9.404082-100.310204 15.15102-150.465306 0 0 0-0.522449 0.522449-0.522449 12.538776-22.465306 27.689796-43.363265 45.453061-62.171428-6.269388-11.493878-10.44898-24.032653-12.016326-37.093878v-3.134694c0.522449-19.330612 10.44898-37.093878 26.644898-47.542857-10.971429-73.142857 9.926531-147.330612 58.514286-203.232653 49.110204-56.946939 120.163265-88.816327 194.873469-86.204081h4.702041c65.306122 0 129.567347 26.122449 177.110204 72.097959 49.110204 47.542857 76.8 112.326531 77.844898 180.767347v7.314285c0.522449 9.926531 0 19.330612-1.044898 29.257143 14.106122 8.881633 21.420408 20.37551 21.420408 48.065306 0 13.583673-1.044898 27.689796-9.926531 36.04898 13.061224 17.763265 28.734694 42.840816 41.27347 62.693877l2.612245 4.179592c20.37551 32.391837 23.510204 74.187755 22.987755 96.130613 0 17.240816-2.089796 58.514286-18.285714 70.530612-3.657143 2.612245-7.314286 3.657143-12.016327 3.657143h-4.179592c-26.122449 0-41.273469-23.510204-57.991837-48.587755l-1.567347-2.089796c-8.881633 36.571429-26.122449 71.053061-50.677551 99.265306 27.167347 9.404082 83.069388 31.346939 75.755103 73.142857-5.746939 35.526531-55.902041 62.171429-114.416327 62.171428z m-388.702041-63.738775z m250.253061-11.493878z m276.375511-140.016326z m-47.020409-235.102041z"
                  fill="#7BD4EF" p-id="1649"></path>
              </svg>
              <!-- <span class="share-name">QQ</span> -->
            </div>
            <div class="share-item" @click="shareToPlatform('wechat')">
              <svg t="1764472267639" class="icon share-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4550" width="200" height="200">
                <path
                  d="M183.379592 699.559184c-4.179592 0-8.359184-1.044898-11.493878-3.657143-6.269388-4.702041-9.404082-12.016327-7.836734-19.330612l13.061224-77.322449C136.881633 553.273469 114.938776 496.326531 114.938776 437.289796 114.938776 292.571429 246.073469 175.020408 408.032653 175.020408c76.8 0 149.420408 26.644898 204.8 74.710204 55.379592 48.587755 86.726531 113.893878 88.293878 183.379592 0 5.746939-2.089796 10.971429-6.269388 14.628572s-9.404082 5.746939-15.151021 5.746938c-5.22449-0.522449-9.404082-0.522449-13.583673-0.522449-112.326531 0-203.232653 79.934694-203.232653 178.677551 0 13.583673 1.567347 27.167347 5.22449 40.751021 1.567347 5.746939 0.522449 11.493878-2.612245 16.195918-3.134694 4.702041-8.359184 7.836735-14.106123 8.881633-14.106122 2.089796-28.734694 3.134694-43.363265 3.134694-52.767347 0-104.489796-12.538776-149.420408-36.571429l-65.828572 34.481633c-3.134694 0-6.269388 1.044898-9.404081 1.044898z"
                  fill="#0B9682" p-id="4551"></path>
                <path
                  d="M303.542857 352.653061m-35.004081 0a35.004082 35.004082 0 1 0 70.008163 0 35.004082 35.004082 0 1 0-70.008163 0Z"
                  fill="#DCFFFA" p-id="4552"></path>
                <path
                  d="M512 352.653061m-35.004082 0a35.004082 35.004082 0 1 0 70.008164 0 35.004082 35.004082 0 1 0-70.008164 0Z"
                  fill="#DCFFFA" p-id="4553"></path>
                <path
                  d="M849.502041 849.502041c-3.134694 0-6.269388-0.522449-9.404082-2.089796l-52.244898-27.167347c-37.093878 19.330612-78.889796 29.779592-122.253061 29.779592-134.269388 0-242.938776-98.220408-242.938776-218.383674S531.853061 412.734694 665.6 412.734694 909.061224 510.955102 909.061224 631.118367c0 48.065306-17.763265 95.085714-50.677551 133.22449l10.44898 61.64898c1.044898 7.314286-1.567347 15.15102-7.836735 19.330612-3.134694 3.134694-7.314286 4.179592-11.493877 4.179592z"
                  fill="#16C4AF" p-id="4554"></path>
                <path
                  d="M576.261224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z"
                  fill="#DCFFFA" p-id="4555"></path>
                <path
                  d="M755.461224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z"
                  fill="#DCFFFA" p-id="4556"></path>
              </svg>
              <!-- <span class="share-name">微信</span> -->
            </div>
            <div class="share-item" @click="shareToPlatform('douyin')">
              <svg t="1764472383650" class="icon share-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6777" width="200" height="200">
                <path
                  d="M208.323765 0h607.35247C922.262588 0 1008.941176 89.088 1008.941176 198.595765V822.814118c0 109.507765-86.678588 198.595765-193.264941 198.595764H208.323765C101.737412 1021.379765 15.058824 932.291765 15.058824 822.784V198.595765C15.058824 89.088 101.737412 0 208.323765 0z"
                  fill="#170B1A" p-id="6778"></path>
                <path
                  d="M503.356235 309.458824c0.572235-63.427765 0-126.855529 0.572236-190.283295h128.150588c-0.572235 11.203765 1.114353 22.437647 2.770823 33.129412h-94.32847v515.312941a124.295529 124.295529 0 0 1-15.510588 62.85553c-16.655059 29.214118-47.736471 49.392941-81.016471 52.224a107.580235 107.580235 0 0 1-61.590588-12.950588A106.134588 106.134588 0 0 1 346.352941 737.249882c32.737882 18.522353 75.444706 16.835765 107.068235-3.915294 30.509176-19.094588 50.507294-55.024941 50.507295-92.069647-0.572235-110.592-0.572235-221.184-0.572236-331.776z m211.395765-36.472471c17.769412 11.203765 37.707294 20.178824 58.247529 24.696471 12.197647 2.800941 24.395294 3.915294 37.165177 3.915294v29.214117a182.302118 182.302118 0 0 1-95.412706-57.825882z"
                  fill="#25F4EE" p-id="6779"></path>
                <path
                  d="M275.576471 427.459765a223.111529 223.111529 0 0 1 153.6-33.520941v31.232a267.956706 267.956706 0 0 0-42.255059 5.12 236.664471 236.664471 0 0 0-94.328471 43.730823c-30.177882 23.280941-53.217882 55.115294-69.12 90.322824a250.277647 250.277647 0 0 0-22.497882 107.911529c0 40.899765 10.962824 80.655059 29.605647 116.434824 8.794353 16.474353 18.672941 32.376471 31.834353 45.447529-26.895059-19.335529-49.392941-45.477647-65.837177-74.992941-22.497882-39.183059-33.430588-85.202824-32.37647-131.192471A256.210824 256.210824 0 0 1 198.776471 508.084706a236.212706 236.212706 0 0 1 76.8-80.624941z"
                  fill="#25F4EE" p-id="6780"></path>
                <path
                  d="M540.491294 153.208471h94.780235c3.312941 18.582588 9.999059 36.050824 18.31153 52.946823 13.312 25.901176 32.135529 49.031529 56.530823 64.240941a13.071059 13.071059 0 0 1 3.915294 3.915294 181.428706 181.428706 0 0 0 95.894589 58.066824c0.542118 33.792 0 68.156235 0 101.978353a297.020235 297.020235 0 0 1-176.308706-56.922353c0 81.136941 0 162.273882 0.542117 243.380706 0 10.721882 0.572235 21.413647 0 32.677647a269.312 269.312 0 0 1-34.334117 112.700235 243.802353 243.802353 0 0 1-66.56 76.619294 211.516235 211.516235 0 0 1-121.404235 42.255059c-22.166588 0.572235-44.363294-0.572235-65.957648-5.632a235.459765 235.459765 0 0 1-84.841411-37.737412l-1.656471-1.716706c-12.769882-12.950588-23.311059-28.732235-32.165647-45.056-18.853647-34.936471-29.936941-74.932706-29.936941-115.501176a246.061176 246.061176 0 0 1 22.738823-107.038118c16.052706-34.936471 39.905882-66.499765 69.872942-89.6a241.242353 241.242353 0 0 1 95.322353-43.369411c13.854118-2.831059 28.310588-4.517647 42.706823-5.059765 0.542118 12.950588 0 25.901176 0.542118 38.309647v65.897412c-16.082824-5.632-33.822118-5.632-50.447059-1.686589a124.084706 124.084706 0 0 0-54.332235 27.045648c-9.426824 8.432941-17.769412 18.582588-23.280942 29.876705-9.999059 19.154824-13.312 41.682824-11.083294 63.096471 2.198588 20.841412 11.083294 41.110588 24.395294 56.922353 8.854588 11.233882 20.48 19.696941 32.13553 27.587765 9.426824 13.522824 21.624471 24.786824 36.050823 32.677647a111.796706 111.796706 0 0 0 61.530353 12.950588c33.28-2.258824 64.301176-23.100235 80.956236-52.404706 10.541176-19.154824 16.082824-41.110588 15.510588-63.096471 1.114353-173.537882 0.572235-345.931294 0.572235-518.324705z"
                  fill="#FFFFFF" p-id="6781"></path>
                <path
                  d="M650.119529 136.192c10.992941 0.542118 21.985882 0 33.490824 0a189.138824 189.138824 0 0 0 32.948706 106.616471c2.740706 3.975529 5.481412 7.348706 8.252235 10.752-24.154353-15.239529-43.369412-38.369882-56.018823-64.331295a216.335059 216.335059 0 0 1-18.672942-53.037176z m172.965647 179.440941c12.047059 2.800941 24.154353 3.915294 36.773648 3.915294v131.493647c-62.584471 0.602353-125.168941-20.871529-176.248471-58.669176v260.698353a233.833412 233.833412 0 0 1-5.481412 58.669176c-12.047059 58.699294-46.110118 111.736471-93.334588 146.160941a225.520941 225.520941 0 0 1-83.425882 38.369883 225.942588 225.942588 0 0 1-109.808942-1.686588A230.309647 230.309647 0 0 1 280.094118 825.735529a222.780235 222.780235 0 0 0 84.028235 37.797647c21.383529 5.089882 43.369412 6.204235 65.295059 5.662118a207.932235 207.932235 0 0 0 120.259764-42.345412c26.895059-20.299294 48.850824-46.832941 65.867295-76.739764a271.962353 271.962353 0 0 0 34.032941-112.850824c0.542118-10.721882 0.542118-21.443765 0-32.737882-0.542118-81.227294-0.542118-162.484706-0.542118-243.742118a291.900235 291.900235 0 0 0 174.592 56.982588c-0.542118-33.852235 0-68.276706-0.542118-102.128941z"
                  fill="#FE2C55" p-id="6782"></path>
                <path
                  d="M440.380235 425.562353c12.649412 0 25.840941 0.602353 38.490353 2.258823v134.866824a106.706824 106.706824 0 0 0-58.006588-2.258824 110.983529 110.983529 0 0 0-79.299765 69.421177c-12.649412 33.852235-7.469176 73.366588 14.366118 102.128941a120.229647 120.229647 0 0 1-33.310118-27.648 105.502118 105.502118 0 0 1-25.298823-56.982588c-2.288941-21.443765 1.174588-44.032 11.504941-63.216941 5.722353-11.264 14.366118-21.443765 24.124235-29.906824 16.082824-13.552941 36.201412-21.985882 56.32-27.075765 17.227294-3.945412 35.599059-3.945412 52.254118 1.686589v-66.017883c-1.144471-11.294118-0.572235-24.274824-1.144471-37.255529z"
                  fill="#FE2C55" p-id="6783"></path>
              </svg>
              <!-- <span class="share-name">抖音</span> -->
            </div>
            <div class="share-item" @click="shareToPlatform('bilibili')">
              <svg t="1764472147351" class="icon share-icon" viewBox="0 0 1129 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3525" width="200" height="200">
                <path
                  d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0"
                  fill="#20B0E3" p-id="3526"></path>
                <path
                  d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0"
                  fill="#20B0E3" p-id="3527"></path>
              </svg>
              <!-- <span class="share-name">bilibili</span> -->
            </div>
            <div class="share-item" @click="shareToPlatform('kuaishou')">
              <svg t="1764472316111" class="icon share-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="5581" width="200" height="200">
                <path
                  d="M0 0m184.32 0l655.36 0q184.32 0 184.32 184.32l0 655.36q0 184.32-184.32 184.32l-655.36 0q-184.32 0-184.32-184.32l0-655.36q0-184.32 184.32-184.32Z"
                  fill="#FF6734" p-id="5582"></path>
                <path
                  d="M716.8 225.28a81.92 81.92 0 1 0 81.92 81.92 82.01216 82.01216 0 0 0-81.92-81.92m0-71.68a153.6 153.6 0 1 1-153.6 153.6 153.6 153.6 0 0 1 153.6-153.6z"
                  fill="#FFFFFF" p-id="5583"></path>
                <path
                  d="M450.56 163.84a112.64 112.64 0 1 0 112.64 112.64 112.76288 112.76288 0 0 0-112.64-112.64m0-71.68a184.32 184.32 0 1 1-184.32 184.32 184.32 184.32 0 0 1 184.32-184.32z"
                  fill="#FFFFFF" p-id="5584"></path>
                <path
                  d="M532.48 563.2a81.92 81.92 0 0 0-81.92 81.92v92.16a81.92 81.92 0 0 0 81.92 81.92h194.56a81.92 81.92 0 0 0 81.92-81.92v-92.16a81.92 81.92 0 0 0-81.92-81.92h-194.56m0-71.68h194.56a153.77408 153.77408 0 0 1 153.6 153.6v92.16a153.77408 153.77408 0 0 1-153.6 153.6h-194.56a153.77408 153.77408 0 0 1-153.6-153.6v-92.16a153.77408 153.77408 0 0 1 153.6-153.6z"
                  fill="#FFFFFF" p-id="5585"></path>
                <path
                  d="M373.44256 691.2a20.28544 20.28544 0 0 0-10.32192-17.77664l-117.44256-67.11296a20.48 20.48 0 0 0-30.63808 17.77664v134.22592a20.48 20.48 0 0 0 30.63808 17.77664l117.44256-67.11296a20.28544 20.28544 0 0 0 10.32192-17.77664m71.68 0a92.3648 92.3648 0 0 1-46.4384 80.01536l-117.44256 67.11296A92.16 92.16 0 0 1 143.36 758.31296v-134.22592a92.16 92.16 0 0 1 137.8816-80.01536l117.44256 67.11296a92.3648 92.3648 0 0 1 46.4384 80.01536z"
                  fill="#FFFFFF" p-id="5586"></path>
              </svg>
              <!-- <span class="share-name">快手</span> -->
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
  position: relative;
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
  display: inline-block;
  vertical-align: top;
  line-height: 1;
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

/* 保持网格布局样式 */
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
  /* 确保在任何父容器设置下都保持横向排列 */
  flex-direction: row !important;
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
  position: absolute;
  bottom: 3rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(74, 144, 226, 0.1) 100%);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 16px;
  padding: 0.5rem 1rem;
  width: auto;
  height: 45px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 10;
}

.page-views-counter:hover {
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.25) 0%, rgba(74, 144, 226, 0.15) 100%);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.25);
  transform: translateY(-2px);
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

/* 响应式调整 */
@media (max-width: 768px) {
  .page-views-counter {
    bottom: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
    height: 40px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .page-views-counter {
    bottom: 0.8rem;
    right: 0.8rem;
    padding: 0.3rem 0.7rem;
    height: 35px;
    font-size: 0.8rem;
  }
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
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
}

.footer-bottom img {
  margin-top: -5px;
}

.footer-bottom a {
  font-size: 0.8rem;
  color: #999;
  margin-left: 0;
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