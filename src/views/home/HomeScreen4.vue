<script setup>
import { ref } from 'vue'
import { usePageView } from '@/composables/usePageView'

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
            <div class="share-item">
              <div class="share-icon">🔔</div>
              <span class="share-name">通知</span>
            </div>
            <div class="share-item">
              <div class="share-icon">🔴</div>
              <span class="share-name">微信</span>
            </div>
            <div class="share-item">
              <div class="share-icon">💚</div>
              <span class="share-name">小红书</span>
            </div>
            <div class="share-item">
              <div class="share-icon">🔵</div>
              <span class="share-name">QQ</span>
            </div>
            <div class="share-item">
              <div class="share-icon">🐦</div>
              <span class="share-name">微博</span>
            </div>
            <div class="share-item">
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

/* 分享按钮网格布局 */
.share-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 240px;
  margin-bottom: 1.5rem;
}

/* 分享项样式 */
.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.share-item:hover {
  transform: translateY(-5px);
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