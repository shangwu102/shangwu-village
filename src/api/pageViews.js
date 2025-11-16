// Backend API service for page views
// const API_BASE_URL = 'http://localhost:8081/api/page-views'
// const API_BASE_URL = 'http://www.hiwcq.com/api/page-views'
const API_BASE_URL = '/api/page-views'

/**
 * 增加页面访问量
 * @param {string} pageName - 页面名称
 * @returns {Promise<Object>} - 返回格式: { success: boolean, data: { page, viewCount, timestamp }, message }
 */
export const incrementPageViewAPI = async (pageName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/increment/${pageName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP错误！状态码: ${response.status}`)
    }
    
    const result = await response.json()
    // 后端返回格式: { success, data: { page, viewCount, timestamp }, message }
    return result
  } catch (error) {
    console.error('API调用错误:', error)
    // 后端不可用时使用localStorage降级方案
    return incrementPageViewFallback(pageName)
  }
}

/**
 * 获取指定页面的访问量
 * @param {string} pageName - 页面名称
 * @returns {Promise<Object>} - 返回格式: { success: boolean, data: { page, viewCount, timestamp }, message }
 */
export const getPageViewsAPI = async (pageName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${pageName}`)
    
    if (!response.ok) {
      throw new Error(`HTTP错误！状态码: ${response.status}`)
    }
    
    const result = await response.json()
    // 后端返回格式: { success, data: { page, viewCount, timestamp }, message }
    return result
  } catch (error) {
    console.error('API调用错误:', error)
    return getPageViewsFallback(pageName)
  }
}

/**
 * 获取所有页面的访问量
 * @returns {Promise<Object>} - 返回格式: { success: boolean, data: { pageName: viewCount, ... }, message }
 */
export const getAllPageViewsAPI = async () => {
  try {
    const response = await fetch(API_BASE_URL)
    
    if (!response.ok) {
      throw new Error(`HTTP错误！状态码: ${response.status}`)
    }
    
    const result = await response.json()
    // 后端返回格式: { success, data: { about: 123, home: 456, ... }, message }
    return result
  } catch (error) {
    console.error('API调用错误:', error)
    return getAllPageViewsFallback()
  }
}

/**
 * 批量更新页面访问量
 * @param {Object} updates - 更新数据对象，格式: { pageName: viewCount, ... }
 * @returns {Promise<Object>} - 返回格式: { success: boolean, data: { pageName: viewCount, ... }, message }
 */
export const batchUpdatePageViewsAPI = async (updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/batch`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP错误！状态码: ${response.status}`)
    }
    
    const result = await response.json()
    // 后端返回格式: { success, data: { about: 100, home: 200, ... }, message }
    return result
  } catch (error) {
    console.error('API调用错误:', error)
    return batchUpdatePageViewsFallback(updates)
  }
}

/**
 * 重置所有页面访问量（管理员功能）
 * @returns {Promise<Object>} - 返回格式: { success: boolean, data: string, message }
 */
export const resetAllViewsAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP错误！状态码: ${response.status}`)
    }
    
    const result = await response.json()
    // 后端返回格式: { success, data: "所有页面访问量已重置", message }
    return result
  } catch (error) {
    console.error('API调用错误:', error)
    return resetAllViewsFallback()
  }
}

// ==================== 降级方案：后端不可用时使用localStorage ====================
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const incrementPageViewFallback = async (pageName) => {
  await delay(100)
  
  try {
    const stored = localStorage.getItem('pageViewsBackend')
    let data = {}
    
    if (stored) {
      data = JSON.parse(stored)
    }
    
    if (!data[pageName]) {
      data[pageName] = 0
    }
    data[pageName]++
    
    localStorage.setItem('pageViewsBackend', JSON.stringify(data))
    
    return {
      success: true,
      data: {
        page: pageName,
        viewCount: data[pageName],
        timestamp: new Date().toISOString()
      },
      message: '页面访问量增加成功（本地缓存）'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '增加访问量失败：' + error.message
    }
  }
}

const getPageViewsFallback = async (pageName) => {
  await delay(50)
  
  try {
    const stored = localStorage.getItem('pageViewsBackend')
    let data = {}
    
    if (stored) {
      data = JSON.parse(stored)
    }
    
    return {
      success: true,
      data: {
        page: pageName,
        viewCount: data[pageName] || 0,
        timestamp: new Date().toISOString()
      },
      message: '查询成功（本地缓存）'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '查询失败：' + error.message
    }
  }
}

const getAllPageViewsFallback = async () => {
  await delay(50)
  
  try {
    const stored = localStorage.getItem('pageViewsBackend')
    let data = {}
    
    if (stored) {
      data = JSON.parse(stored)
    }
    
    return {
      success: true,
      data: data,
      message: '查询所有页面访问量成功（本地缓存）'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '查询失败：' + error.message
    }
  }
}

const batchUpdatePageViewsFallback = async (updates) => {
  await delay(100)
  
  try {
    const stored = localStorage.getItem('pageViewsBackend')
    let data = stored ? JSON.parse(stored) : {}
    
    data = { ...data, ...updates }
    
    localStorage.setItem('pageViewsBackend', JSON.stringify(data))
    
    return {
      success: true,
      data: data,
      message: '批量更新成功（本地缓存）'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '批量更新失败：' + error.message
    }
  }
}

const resetAllViewsFallback = async () => {
  await delay(100)
  
  try {
    localStorage.removeItem('pageViewsBackend')
    
    return {
      success: true,
      data: '所有页面访问量已重置',
      message: '重置成功（本地缓存）'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '重置失败：' + error.message
    }
  }
}
