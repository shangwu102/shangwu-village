import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllPageViewsAPI, incrementPageViewAPI } from '@/api/pageViews'

export const usePageViewsStore = defineStore('pageViews', () => {
  // 存储各个页面的访问量
  const pageViews = ref({
    about: 0,
    home: 0,
    culture: 0,
    academic: 0,
    map: 0,
    search: 0,
    villages: 0
  })

  // 从后端加载数据
  const loadFromBackend = async () => {
    try {
      const response = await getAllPageViewsAPI()
      if (response.success && response.data) {
        // 更新 pageViews 数据
        Object.keys(response.data).forEach(key => {
          if (pageViews.value.hasOwnProperty(key)) {
            pageViews.value[key] = response.data[key]
          }
        })
        console.log('从后端加载访问量成功:', response.data)
      }
    } catch (error) {
      console.error('从后端加载访问量失败:', error)
    }
  }

  // 增加页面访问量 - 调用后端API
  const incrementPageView = async (pageName) => {
    try {
      const response = await incrementPageViewAPI(pageName)
      
      if (response.success && response.data) {
        // 更新本地状态（后端返回的字段是 viewCount）
        if (pageViews.value.hasOwnProperty(pageName)) {
          pageViews.value[pageName] = response.data.viewCount
        }
        
        console.log('访问量更新成功:', pageName, '当前值:', response.data.viewCount)
        
        return {
          success: true,
          data: {
            page: pageName,
            viewCount: pageViews.value[pageName]
          }
        }
      } else {
        throw new Error(response.message || '增加访问量失败')
      }
    } catch (error) {
      console.error('增加访问量失败:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // 获取指定页面的访问量
  const getPageViews = (pageName) => {
    return pageViews.value[pageName] || 0
  }

  // 获取所有页面访问量
  const getAllPageViews = () => {
    return { ...pageViews.value }
  }

  // 重置所有访问量（管理员功能）
  const resetAllViews = () => {
    Object.keys(pageViews.value).forEach(key => {
      pageViews.value[key] = 0
    })
  }

  // 初始化时从后端加载数据
  loadFromBackend()

  return {
    pageViews,
    incrementPageView,
    getPageViews,
    getAllPageViews,
    resetAllViews,
    loadFromBackend
  }
})
