<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const headerRef = ref(null)

// 处理滚动事件，添加动画效果
const handleScroll = () => {
  const scrollY = window.scrollY
  if (headerRef.value) {
    if (scrollY > 50) {
      headerRef.value.classList.add('scrolled')
    } else {
      headerRef.value.classList.remove('scrolled')
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="header-container" ref="headerRef">
    <div class="header-content">
      <!-- Logo -->
      <div class="logo-section">
        <RouterLink to="/" class="logo-link">
          <img src="@/assets/logo.svg" alt="乡村记忆" class="logo-image" />
          <span class="logo-title" style="font-weight: bold;">云行阡陌，找寻记忆中的中国传统村落</span>
        </RouterLink>
      </div>
      
      <!-- 主导航 -->
      <nav class="main-nav">
        <RouterLink to="/map" class="nav-link">乡忆漫游</RouterLink>
        <RouterLink to="/search" class="nav-link">乡忆寻踪</RouterLink>
        <RouterLink to="/culture" class="nav-link">乡忆好物</RouterLink>
        <!-- <RouterLink to="/villages" class="nav-link">乡野艺创</RouterLink>
        <RouterLink to="/academic" class="nav-link">乡村记忆</RouterLink> -->
        <RouterLink to="/about" class="nav-link">关于我们</RouterLink>
      </nav>
      
      <!-- 右侧功能区 -->
      <div class="header-right">
        <!-- <div class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="language-selector">
          <span>LANG</span>
        </div> -->
      </div>
    </div>
  </header>

  <RouterView />
</template>
<style>
::-webkit-scrollbar {
  display: none;
}

html, body {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

</style>
<style scoped>
.header-container {
  background: linear-gradient(90deg, #3a923a 0%, #71b635 100%);
  color: #fff;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  will-change: transform, box-shadow;
  transition: transform 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
}

/* 滚动时的动画效果 */
.header-container.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
  animation: slideDown 0.3s ease forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-10px);
    opacity: 0.9;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.logo-image {
  width: 40px;
  height: 40px;
  margin-right: 0.8rem;
  object-fit: contain;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 0.5rem;
}

.logo-title {
  font-size: 0.9rem;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #fef3c7;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover {
  color: #fef3c7;
  transform: translateY(-2px);
}

.nav-link:hover::after {
  width: 100%;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-icon {
  cursor: pointer;
}

.language-selector {
  font-size: 0.8rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 1rem 0;
    gap: 1rem;
  }
  
  .main-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .logo-title {
    font-size: 0.8rem;
  }
}
</style>
