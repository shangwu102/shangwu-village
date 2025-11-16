import { ref, onMounted } from 'vue'
import { usePageViewsStore } from '@/stores/pageViews'
import { getPageViewsAPI } from '@/api/pageViews'

/**
 * 页面访问量追踪 Composable
 * @param {string} pageName - 页面名称 (about, home, culture, etc.)
 * @returns {Object} - 包含访问量数据和加载状态
 */
export function usePageView(pageName) {
  const pageViewsStore = usePageViewsStore()
  const currentPageViews = ref(0)
  const isLoading = ref(false)
  const error = ref(null)

  // 初始化页面访问量
  const initPageView = async () => {
    isLoading.value = true
    error.value = null

    try {
      // 调用后端API增加访问量
      const response = await pageViewsStore.incrementPageView(pageName)
      
      if (response.success && response.data) {
        // 从响应中获取访问量（后端返回的字段是 viewCount）
        currentPageViews.value = response.data.viewCount || 0
        console.log(`页面 ${pageName} 访问量:`, currentPageViews.value)
      } else {
        // 如果增加失败，尝试从 store 中获取
        currentPageViews.value = pageViewsStore.getPageViews(pageName)
      }
    } catch (err) {
      error.value = err.message
      console.error('更新页面访问量失败:', err)
      
      // 即使 API 失败，也尝试从 store 获取数据
      currentPageViews.value = pageViewsStore.getPageViews(pageName)
    } finally {
      isLoading.value = false
    }
  }

  // 组件挂载时自动初始化
  onMounted(() => {
    initPageView()
  })

  return {
    currentPageViews,
    isLoading,
    error,
    initPageView
  }
}
