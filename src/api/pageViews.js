// Backend API service for page views
const API_BASE_URL = 'http://localhost:8081/api/page-views'

// 模拟API响应延迟
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Increment page view count
 * @param {string} pageName - Page name
 * @returns {Promise<Object>} - Updated view count
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
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('API Error:', error)
    // Fallback to localStorage if backend is unavailable
    return incrementPageViewFallback(pageName)
  }
}

/**
 * Get page view count
 * @param {string} pageName - Page name
 * @returns {Promise<Object>} - View count data
 */
export const getPageViewsAPI = async (pageName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${pageName}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('API Error:', error)
    return getPageViewsFallback(pageName)
  }
}

/**
 * Get all page views
 * @returns {Promise<Object>} - All page view counts
 */
export const getAllPageViewsAPI = async () => {
  try {
    const response = await fetch(API_BASE_URL)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('API Error:', error)
    return getAllPageViewsFallback()
  }
}

/**
 * Batch update page views
 * @param {Object} updates - Update data object
 * @returns {Promise<Object>}
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
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('API Error:', error)
    return batchUpdatePageViewsFallback(updates)
  }
}

// Fallback functions using localStorage when backend is unavailable
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
        views: data[pageName],
        timestamp: new Date().toISOString()
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
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
        views: data[pageName] || 0
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
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
      data: data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
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
      data: data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}
