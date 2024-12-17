<template>
  <div class="venue-form">
    <div class="upload-container" @click="triggerFileUpload">
      <input 
        type="file" 
        ref="fileInput" 
        @change="handleFileChange" 
        accept="image/*" 
        class="hidden"
      >
      <div v-if="!previewImage && !currentCourt.image" class="upload-placeholder">
        <div class="upload-icon">📷</div>
        <div>+ 上傳圖片</div>
      </div>
      <img 
        v-else
        :src="previewImage || currentCourt.image" 
        class="preview-image" 
        alt="場地圖片"
      >
    </div>

    <div class="form-group">
      <label>場地名稱</label>
      <input 
        type="text" 
        :value="currentCourt.title" 
        readonly
        class="form-input"
      >
    </div>

    <div class="form-group">
      <label>營業時間</label>
      <input 
        type="text" 
        v-model="formData.operatingHours" 
        class="form-input"
      >
    </div>

    <div class="form-group">
      <label>收費標準</label>
      <div class="price-info">
        <div>尖峰時段：每節{{ formData.peakPrice }}元/時</div>
        <div>離峰時段：每節{{ formData.offPeakPrice }}元/時</div>
      </div>
    </div>

    <div class="button-group">
      <button class="btn-cancel" @click="handleCancel">返回</button>
      <button class="btn-submit" @click="handleSubmit">確定新增</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const courts = ref([
  {
    id: 'A',
    title: '籃球A場',
    image: '/courts/b01.png'
  },
  {
    id: 'B',
    title: '籃球B場',
    image: '/courts/b02.png'
  },
  {
    id: 'C',
    title: '籃球C場',
    image: '/courts/b03.png'
  },
  {
    id: 'D',
    title: '籃球D場',
    image: '/courts/b04.png'
  },
  {
    id: 'E',
    title: '籃球E場',
    image: '/courts/b05.png'
  },
  {
    id: 'F',
    title: '籃球F場',
    image: '/courts/b06.png'
  }
])

const currentCourt = computed(() => {
  return courts.value.find(court => court.id === route.params.id) || courts.value[0]
})

const formData = ref({
  operatingHours: '06:00-22:00',
  peakPrice: 1500,
  offPeakPrice: 1000,
})

const previewImage = ref(null)
const uploadedFile = ref(null)
const fileInput = ref(null)

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const handleSubmit = () => {
  console.log('提交表單數據:', {
    courtId: currentCourt.value.id,
    title: currentCourt.value.title,
    ...formData.value,
    image: uploadedFile.value || currentCourt.value.image
  })
}

const handleCancel = () => {
  router.back()
}

// 組件卸載時清理圖片預覽的 URL
onMounted(() => {
  return () => {
    if (previewImage.value) {
      URL.revokeObjectURL(previewImage.value)
    }
  }
})
</script>

<style scoped>
.venue-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 0 20px;
}

.upload-container {
  border: 2px dashed #ccc;
  background-color: #f5f5f5;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 4px;
  cursor: pointer;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-icon {
  font-size: 24px;
  color: #666;
  margin-bottom: 10px;
}

.hidden {
  display: none;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  object-fit: contain;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.form-input[readonly] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.price-info {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-cancel {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}

.btn-submit {
  background-color: #333;
  color: white;
}
</style>