<script setup>
// 地图页面逻辑
</script>

<template>
  <div class="map-view-container">
    <div class="page-header">
      <h1>乡村地图</h1>
      <p>探索乡村文化资源分布</p>
    </div>
    
    <div class="map-content">
      <!-- 地图显示区域 -->
      <!-- <div class="map-container">
        <div class="map-placeholder">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="#2d8f40">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <p>地图加载中...</p>
        </div>
      </div> -->
      
      <!-- 侧边栏信息 -->
      <!-- <div class="sidebar">
        <div class="sidebar-header">
          <h3>地区筛选</h3>
        </div>
        <div class="filter-options">
          <div class="filter-item">
            <label>省份</label>
            <select>
              <option>全部省份</option>
              <option>江苏省</option>
              <option>浙江省</option>
              <option>安徽省</option>
            </select>
          </div>
          <div class="filter-item">
            <label>文化类型</label>
            <select>
              <option>全部类型</option>
              <option>传统建筑</option>
              <option>民间艺术</option>
              <option>民俗活动</option>
            </select>
          </div>
        </div>
        
        <div class="hot-spots">
          <h4>热门景点</h4>
          <div class="spot-list">
            <div class="spot-item">
              <span class="spot-name">历史古村A</span>
              <span class="spot-location">江苏省</span>
            </div>
            <div class="spot-item">
              <span class="spot-name">民俗村落B</span>
              <span class="spot-location">浙江省</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.map-view-container {
  min-height: calc(100vh - 60px);
  background-color: #f5f9f2;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2d8f40;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.map-content {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.map-container {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 600px;
  position: relative;
  overflow: hidden;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.map-placeholder p {
  margin-top: 1rem;
  font-size: 1.1rem;
}

.sidebar {
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.sidebar-header h3 {
  color: #2d8f40;
  margin-bottom: 1rem;
}

.filter-options {
  margin-bottom: 2rem;
}

.filter-item {
  margin-bottom: 1rem;
}

.filter-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.filter-item select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.hot-spots h4 {
  color: #333;
  margin-bottom: 1rem;
}

.spot-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.spot-item {
  padding: 0.75rem;
  background: #f8f8f8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.spot-item:hover {
  background: #e8f5e9;
  transform: translateX(5px);
}

.spot-name {
  font-weight: 500;
  color: #2d8f40;
}

.spot-location {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .map-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}
</style>