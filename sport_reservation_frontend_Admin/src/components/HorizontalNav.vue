<template>
    <nav class="nav-container">
      <!-- 桌面版導航 -->
      <div class="nav-wrapper">
        <ul class="nav-tabs">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" exact-active-class="active">
              <span class="nav-text">首頁</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/order" class="nav-link" active-class="active">
              <span class="nav-text">訂單預約管理</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink 
              to="/venue" 
              class="nav-link"
              :class="{ 'active': isReservationActive }"
            >
              <span class="nav-text">場地管理</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const isReservationActive = computed(() => {
    console.log('Current route path:', route.path);
    return route.path === '/reservation' || 
    route.path.includes('/cardInfoView/') ||
    route.path.includes('/bookingCardView')
  })
  </script>
  
  <style scoped>
  .nav-container {
    width: 100%;
    background: rgb(249, 249, 249);
    padding: 0 1rem;
  }
  
  .nav-wrapper {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .nav-tabs {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    border-bottom: 2px solid #3F3F3F;
    flex-wrap: wrap;
  }
  
  .nav-item {
    position: relative;
    margin-bottom: -2px;
  }
  
  .nav-link {
    display: block;
    padding: 0.75rem 1.25rem;
    text-decoration: none;
    color: #000;
    font-size: clamp(14px, 2.5vw, 18px);
    white-space: nowrap;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    border-bottom: none;
  }
  
  .nav-text {
    position: relative;
    z-index: 1;
  }
  
  .nav-link.active {
    background: rgb(249, 249, 249);
    border-color: #3F3F3F;
    border-bottom: 2px solid rgb(249, 249, 249);
  }
  
  .nav-link:hover {
    color: #fff;
    background-color: #3F3F3F;
    border-color: #3F3F3F;
  }
  
  /* 響應式設計 */
  @media screen and (max-width: 768px) {
    .nav-container {
      padding: 0 0.5rem;
    }
    
    .nav-link {
      padding: 0.625rem 1rem;
    }
  }
  
  @media screen and (max-width: 640px) {
    .nav-tabs {
      justify-content: space-between;
    }
    
    .nav-link {
      padding: 0.5rem 0.75rem;
    }
  }
  
  @media screen and (max-width: 480px) {
    .nav-tabs {
      gap: 0.25rem;
    }
    
    .nav-link {
      padding: 0.4rem 0.5rem;
      font-size: clamp(12px, 2vw, 14px);
    }
  }
  
  /* 確保內容不會在極小螢幕上換行 */
  @media screen and (max-width: 360px) {
    .nav-tabs {
      justify-content: flex-start;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; /* Firefox */
    }
    
    .nav-tabs::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }
    
    .nav-item {
      flex: 0 0 auto;
    }
  }
  </style>