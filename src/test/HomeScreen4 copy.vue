<script setup>
import { ref, onMounted } from 'vue'
import { usePageView } from '@/composables/usePageView'

// 使用页面访问量追踪
const { currentPageViews, isLoading } = usePageView('about')

// 响应式状态
const showFeatures = ref(false)
const activeSection = ref('intro')

// 组件挂载时执行的动画
onMounted(() => {
  // 页面加载动画效果
  setTimeout(() => {
    showFeatures.value = true
  }, 300)
})

// 团队成员数据（从AboutView迁移）
const teamMembers = [
  {
    id: 1,
    name: "青山渔村",
    position: "项目负责人",
    expertise: "数字乡村建设、乡村规划",
    bio: "北京大学城乡规划博士，深耕数字乡村建设领域十余年，主导多个国家级数字乡村试点项目。"
  },
  {
    id: 2,
    name: "大渔岛村",
    position: "技术总监",
    expertise: "地理信息系统、大数据分析",
    bio: "清华大学计算机科学硕士，专注于GIS技术在乡村发展中的应用，曾参与多个省级数字乡村平台建设。"
  },
  {
    id: 3,
    name: "周戈庄村",
    position: "文化顾问",
    expertise: "传统文化保护、乡村遗产",
    bio: "南京大学文化遗产研究院研究员，致力于传统村落文化遗产的数字化保护与传承研究。"
  }
]

// 项目目标数据（从AboutView迁移）
const projectGoals = [
  {
    id: 1,
    title: "数字建档",
    description: "系统构建村落数字档案，实现文化活态传承。通过\"乡忆寻踪\"记录历史非遗，\"乡忆漫游\"打造沉浸体验，将文化记忆转化为可传播的数字资产，为品牌赋能奠定基础。"
  },
  {
    id: 2,
    title: "品牌赋能",
    description: "打造\"乡忆好物\"品牌生态，形成产品与文化互哺的闭环。我们精选村落特色物产，挖掘背后的文化故事，通过统一品牌升级，将普通土产转化为承载乡愁的\"文化好物\"，实现可持续发展。"
  },
  {
    id: 3,
    title: "模式推广",
    description: "探索可复制的\"数字乡建\"模式，助力乡村品牌化崛起。我们致力于总结实践经验，打造可适配不同村落特性的开放框架，推动传统村落文化传承与产业增效，为乡村振兴贡献青年智慧。"
  }
]

// 导航到指定部分
const navigateToSection = (sectionId) => {
  activeSection.value = sectionId
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="creative-about-screen">
    <!-- 浮动导航 -->
    <div class="floating-nav nav-visible">
      <div 
        v-for="navItem in ['intro', 'goals', 'team', 'contact']"
        :key="navItem"
        :class="['nav-item', { active: activeSection === navItem }]"
        @click="navigateToSection(navItem)"
      >
        <div class="nav-dot"></div>
        <span class="nav-label">{{ {
          'intro': '团队介绍',
          'goals': '项目目标',
          'team': '乡村推荐',
          'contact': '联系我们'
        }[navItem] }}</span>
      </div>
    </div>

    <!-- 视觉震撼的页头 -->
    <header class="hero-section" :class="{ 'animate-in': showFeatures }">
      <div class="hero-content">
        <h1 class="hero-title">关于我们</h1>
        <p class="hero-subtitle">用数字之云，守护乡土之根；以品牌之术,打通振兴之路</p>
        <div class="hero-scroll-indicator">
          <div class="scroll-text">向下探索</div>
          <div class="scroll-line"></div>
          <div class="scroll-circle"></div>
        </div>
      </div>
      
      <!-- 动态波浪背景 -->
      <div class="wave-container">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
      </div>
    </header>

    <!-- 创意设计的内容部分 -->
    <main class="content-container">
      <!-- 简介部分 - 圆形卡片设计 -->
      <!-- <section id="intro" class="intro-section" :class="{ 'animate-in': showFeatures }">
        <div class="section-header">
          <div class="section-number">01</div>
          <h2 class="section-title">团队介绍</h2>
          <div class="section-divider"></div>
        </div>
        
        <div class="intro-content">
          <div class="intro-circle">
            <div class="circle-inner">
              <p class="intro-text">我们是山东商务职业学院"云行阡陌"团队，致力于让每一份乡土记忆都被数字技术温柔托举，让每一个传统村落都在时代浪潮中找回自己的声音与价值。以青年之智、数字之力，踏云而行，重走阡陌，助力乡村走向一个更可持续、更美好的未来。</p>
            </div>
          </div>
        </div>
      </section> -->

      <!-- 项目目标 - 3D卡片翻转设计 -->
      <!-- <section id="goals" class="goals-section" :class="{ 'animate-in': showFeatures }">
        <div class="section-header">
          <div class="section-number">02</div>
          <h2 class="section-title">项目目标</h2>
          <div class="section-divider"></div>
        </div>
        
        <div class="goals-grid">
          <div 
            v-for="goal in projectGoals" 
            :key="goal.id"
            class="goal-card-3d"
            :style="{ animationDelay: `${goal.id * 0.2}s` }"
          >
            <div class="goal-card-inner">
              <div class="goal-card-front">
                <div class="goal-icon-3d" :class="`goal-${goal.id}`">
                  {{ goal.id }}
                </div>
                <h3 class="goal-title-3d">{{ goal.title }}</h3>
                <div class="flip-hint">翻转查看详情</div>
              </div>
              <div class="goal-card-back">
                <h3 class="goal-title-back">{{ goal.title }}</h3>
                <p class="goal-description-back">{{ goal.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <!-- 乡村推荐 - 动态悬停卡片 -->
      <!-- <section id="team" class="team-section" :class="{ 'animate-in': showFeatures }">
        <div class="section-header">
          <div class="section-number">03</div>
          <h2 class="section-title">乡村推荐</h2>
          <div class="section-divider"></div>
        </div>
        
        <div class="team-slider">
          <div 
            v-for="member in teamMembers" 
            :key="member.id"
            class="team-card-hover"
            :style="{ animationDelay: `${member.id * 0.15}s` }"
          >
            <div class="team-card-content">
              <div class="team-card-avatar">
                <span class="avatar-text">{{ member.name.charAt(0) }}</span>
                <div class="avatar-bg"></div>
              </div>
              <h3 class="team-card-name">{{ member.name }}</h3>
              <div class="team-card-details">
                <p class="team-card-position">{{ member.position }}</p>
                <p class="team-card-expertise">{{ member.expertise }}</p>
                <p class="team-card-bio">{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <!-- 联系我们 - 动态表单风格 -->
      <!-- <section id="contact" class="contact-section" :class="{ 'animate-in': showFeatures }">
        <div class="section-header">
          <div class="section-number">04</div>
          <h2 class="section-title">联系我们</h2>
          <div class="section-divider"></div>
        </div>
        
        <div class="contact-form-container">
          <div class="contact-form">
            <div class="form-field">
              <div class="field-label">地址</div>
              <div class="field-value">山东省烟台市高新区海兴路15号2D201室</div>
            </div>
            <div class="form-field">
              <div class="field-label">电话</div>
              <div class="field-value">15105490597（赵）</div>
            </div>
            <div class="form-field">
              <div class="field-label">邮箱</div>
              <div class="field-value">1764065163@qq.com</div>
            </div>
            <div class="form-field">
              <div class="field-label">微信公众号</div>
              <div class="field-value">（邢申请）</div>
            </div>
          </div>
        </div>
      </section> -->
    </main>

    <!-- 访问量统计 - 动态数字计数器 -->
    <div class="page-views-creative" :class="{ 'animate-in': showFeatures }">
      <div class="views-content">
        <div class="views-icon">
          <div class="eye-icon">👁️</div>
        </div>
        <div class="views-stats">
          <div class="views-count">{{ isLoading ? '...' : currentPageViews.toLocaleString() }}</div>
          <div class="views-text">次访问</div>
        </div>
      </div>
    </div>

    <!-- 装饰元素 -->
    <div class="decorative-elements">
      <div class="decor decor-1"></div>
      <div class="decor decor-2"></div>
      <div class="decor decor-3"></div>
      <div class="decor decor-4"></div>
    </div>
  </div>
</template>

<style scoped>
/* 创意风格主容器 */
.creative-about-screen {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #0f172a;
  color: #f1f5f9;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 装饰元素 */
.decorative-elements {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.1;
}

.decor {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(95, 140, 207, 0.3) 0%, rgba(95, 140, 207, 0) 70%);
}

.decor-1 {
  width: 500px;
  height: 500px;
  top: 10%;
  left: -10%;
  animation: float 15s ease-in-out infinite;
}

.decor-2 {
  width: 400px;
  height: 400px;
  bottom: 15%;
  right: -5%;
  animation: float 12s ease-in-out infinite reverse;
}

.decor-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  right: 20%;
  animation: float 18s ease-in-out infinite;
}

.decor-4 {
  width: 200px;
  height: 200px;
  bottom: 30%;
  left: 25%;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, 20px) scale(1.05);
  }
}

/* 浮动导航 */
.floating-nav {
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%) translateX(0);
  display: flex;
  flex-direction: column;
  gap: 25px;
  z-index: 100;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.nav-visible {
  transform: translateY(-50%) translateX(0);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #5f8ccf;
  transition: all 0.3s ease;
}

.nav-item.active .nav-dot {
  background: #5f8ccf;
  box-shadow: 0 0 15px rgba(95, 140, 207, 0.8);
  transform: scale(1.5);
}

.nav-label {
  color: #ffffff;
  font-size: 14px;
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-item:hover .nav-label,
.nav-item.active .nav-label {
  opacity: 1;
  transform: translateX(0);
  color: #5f8ccf;
}

/* 英雄区域 */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform: translateY(50px);
  opacity: 0;
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 900px;
  padding: 0 20px;
}

.hero-title {
  font-size: 6rem;
  font-weight: 900;
  margin-bottom: 30px;
  background: linear-gradient(90deg, #5f8ccf, #84b854, #667eea, #764ba2);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientText 8s ease infinite;
  line-height: 1.1;
}

@keyframes gradientText {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero-subtitle {
  font-size: 1.8rem;
  color: #94a3b8;
  margin-bottom: 80px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* 波浪背景 */
.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.wave {
  position: absolute;
  width: 200%;
  height: 100%;
  left: -50%;
  background: #1e293b;
  animation: waveAnimation 20s linear infinite;
}

.wave-1 {
  bottom: 0;
  transform: translateX(0) translateY(0);
  animation-duration: 10s;
  background: #1e293b;
}

.wave-2 {
  bottom: 5px;
  transform: translateX(0) translateY(0);
  animation-duration: 15s;
  opacity: 0.5;
  background: #334155;
}

.wave-3 {
  bottom: 10px;
  transform: translateX(0) translateY(0);
  animation-duration: 20s;
  opacity: 0.3;
  background: #475569;
}

@keyframes waveAnimation {
  0% { transform: translateX(-50%) translateZ(0); }
  100% { transform: translateX(0) translateZ(0); }
}

/* 滚动指示器 */
.hero-scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  animation: fadeInUp 1.5s ease-out 1s both;
}

.scroll-text {
  font-size: 14px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, #5f8ccf, transparent);
  position: relative;
}

.scroll-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #5f8ccf;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollAnimation 2s ease-in-out infinite;
}

@keyframes scrollAnimation {
  0% {
    top: 0;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    top: 50px;
    opacity: 1;
  }
  100% {
    top: 60px;
    opacity: 0;
  }
}

/* 内容容器 */
.content-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
}

/* 通用部分样式 */
.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 50px;
}

.section-number {
  font-size: 1.5rem;
  color: #5f8ccf;
  font-weight: 700;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #f8fafc;
}

.section-divider {
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, #5f8ccf, transparent);
}

.intro-section,
.goals-section,
.team-section,
.contact-section {
  margin-bottom: 150px;
  transform: translateY(50px);
  opacity: 0;
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.intro-section {
  transition-delay: 0.2s;
}

.goals-section {
  transition-delay: 0.3s;
}

.team-section {
  transition-delay: 0.4s;
}

.contact-section {
  transition-delay: 0.5s;
}

.animate-in {
  transform: translateY(0);
  opacity: 1;
}

/* 简介部分 - 圆形设计 */
.intro-content {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.intro-circle {
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(95, 140, 207, 0.2) 0%, rgba(95, 140, 207, 0.05) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 30px rgba(95, 140, 207, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(95, 140, 207, 0.4);
  }
}

.circle-inner {
  width: 85%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.intro-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #e2e8f0;
}

/* 项目目标 - 3D卡片翻转 */
.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 50px;
}

.goal-card-3d {
  perspective: 1000px;
  opacity: 0;
  transform: translateY(50px);
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.goal-card-inner {
  width: 100%;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
}

.goal-card-3d:hover .goal-card-inner {
  transform: rotateY(180deg);
}

.goal-card-front,
.goal-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.goal-card-front {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 2px solid rgba(95, 140, 207, 0.3);
}

.goal-card-back {
  background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
  border: 2px solid rgba(132, 184, 84, 0.3);
  transform: rotateY(180deg);
}

.goal-icon-3d {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 30px;
  background: linear-gradient(135deg, rgba(95, 140, 207, 0.2), rgba(132, 184, 84, 0.2));
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.goal-1 {
  color: #5f8ccf;
}

.goal-2 {
  color: #84b854;
}

.goal-3 {
  color: #667eea;
}

.goal-title-3d {
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 20px;
}

.goal-title-back {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 30px;
}

.goal-description-back {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e2e8f0;
}

.flip-hint {
  font-size: 14px;
  color: #64748b;
  margin-top: 20px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 50% { opacity: 0.5; }
  51%, 100% { opacity: 1; }
}

/* 团队部分 - 动态悬停卡片 */
.team-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.team-card-hover {
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: 2px solid transparent;
  opacity: 0;
  transform: translateY(50px);
  animation: fadeUp 0.8s ease forwards;
}

.team-card-hover:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(95, 140, 207, 0.5);
}

.team-card-content {
  padding: 30px;
  position: relative;
}

.team-card-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 25px;
  position: relative;
  overflow: hidden;
}

.avatar-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #5f8ccf, #84b854);
  animation: rotateGradient 8s linear infinite;
}

@keyframes rotateGradient {
  0% { background-position: 0% 0%; }
  100% { background-position: 300% 0%; }
}

.avatar-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 900;
  color: white;
  z-index: 1;
}

.team-card-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f8fafc;
  text-align: center;
  margin-bottom: 15px;
}

.team-card-details {
  background: rgba(30, 41, 59, 0.5);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #5f8ccf;
}

.team-card-position {
  font-size: 1.1rem;
  font-weight: 600;
  color: #5f8ccf;
  margin-bottom: 10px;
}

.team-card-expertise {
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 15px;
}

.team-card-bio {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #cbd5e1;
}

/* 联系我们 - 表单风格 */
.contact-form-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.contact-form {
  width: 100%;
  max-width: 600px;
  background: #1e293b;
  border-radius: 20px;
  padding: 40px;
  border: 2px solid rgba(95, 140, 207, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.form-field {
  margin-bottom: 30px;
  position: relative;
}

.field-label {
  font-size: 1rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 10px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.field-value {
  font-size: 1.1rem;
  color: #e2e8f0;
  background: rgba(30, 41, 59, 0.5);
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid rgba(95, 140, 207, 0.2);
  transition: all 0.3s ease;
}

.form-field:hover .field-value {
  border-color: #5f8ccf;
  box-shadow: 0 0 20px rgba(95, 140, 207, 0.2);
}

/* 访问量统计 - 创意设计 */
.page-views-creative {
  position: fixed;
  bottom: 30px;
  right: 30px;
  transform: translateX(100px) translateY(30px);
  opacity: 0;
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1) 1s;
  z-index: 100;
}

.page-views-creative.animate-in {
  transform: translateX(0) translateY(0);
  opacity: 1;
}

.views-content {
  background: linear-gradient(135deg, #1e293b, #334155);
  border-radius: 25px;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 2px solid rgba(95, 140, 207, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.views-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  border-color: #5f8ccf;
}

.views-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5f8ccf, #84b854);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulseSmall 4s ease-in-out infinite;
}

@keyframes pulseSmall {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.eye-icon {
  font-size: 1.8rem;
}

.views-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.views-count {
  font-size: 1.5rem;
  font-weight: 700;
  color: #5f8ccf;
}

.views-text {
  font-size: 0.9rem;
  color: #94a3b8;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .hero-title {
    font-size: 4.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
  }
}

@media (max-width: 992px) {
  .floating-nav {
    right: 20px;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .intro-circle {
    width: 400px;
    height: 400px;
  }
  
  .goals-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .floating-nav {
    display: none;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .intro-circle {
    width: 300px;
    height: 300px;
  }
  
  .intro-text {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .team-slider {
    grid-template-columns: 1fr;
  }
  
  .contact-form {
    padding: 30px;
  }
  
  .content-container {
    padding: 80px 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .section-divider {
    width: 100%;
  }
  
  .goal-card-front,
  .goal-card-back {
    padding: 25px;
  }
  
  .goal-card-inner {
    height: 350px;
  }
  
  .page-views-creative {
    right: 20px;
    bottom: 20px;
  }
  
  .views-content {
    padding: 10px 20px;
    gap: 15px;
  }
}
</style>