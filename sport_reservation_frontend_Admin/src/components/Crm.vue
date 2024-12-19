<template>
  <div class="statistics-container">
    <div class="card">
      <h2>月度預訂統計</h2>
      <div style="height: 300px; position: relative;">
        <Line v-if="monthlyStats.length" :data="monthlyChartData" :options="lineChartOptions" />
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>月份</th>
              <th>預訂數量</th>
              <th>總收入</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in monthlyStats" :key="stat.month">
              <td>{{ stat.month }}</td>
              <td>{{ stat.totalReservations }}</td>
              <td>{{ formatCurrency(stat.totalRevenue) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h2>支付方式分析</h2>
      <div style="height: 300px; position: relative;">
        <Pie v-if="paymentStats.length" :data="paymentChartData" :options="pieChartOptions" />
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>支付方式</th>
              <th>使用次數</th>
              <th>占比</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in paymentStats" :key="stat.paymentMethod">
              <td>{{ stat.paymentMethod }}</td>
              <td>{{ stat.count }}</td>
              <td>{{ stat.percentage }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h2>場地使用率</h2>
      <div style="height: 300px; position: relative;">
        <Bar v-if="venueStats.length" :data="venueChartData" :options="barChartOptions" />
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>場地名稱</th>
              <th>預訂次數</th>
              <th>使用率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in venueStats" :key="stat.venueId">
              <td>{{ stat.venueName }}</td>
              <td>{{ stat.reservedTimes }}</td>
              <td>{{ stat.usageRate.toFixed(2) }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Pie } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
)

export default defineComponent({
  name: 'CrmView',
  components: {
    Line,
    Bar,
    Pie
  },
  data() {
    return {
      monthlyStats: [
        { month: '一月', totalReservations: 150, totalRevenue: 450000 },
        { month: '二月', totalReservations: 180, totalRevenue: 520000 },
        { month: '三月', totalReservations: 210, totalRevenue: 630000 },
        { month: '四月', totalReservations: 165, totalRevenue: 495000 },
        { month: '五月', totalReservations: 195, totalRevenue: 585000 },
        { month: '六月', totalReservations: 225, totalRevenue: 675000 }
      ],
      paymentStats: [
        { paymentMethod: '信用卡', count: 450, percentage: 60 },
        { paymentMethod: '現金', count: 300, percentage: 40 }
      ],
      venueStats: [
        { venueId: 1, venueName: '籃球A場', reservedTimes: 120, usageRate: 85.5 },
        { venueId: 2, venueName: '排球B場', reservedTimes: 98, usageRate: 70.2 },
        { venueId: 3, venueName: '羽球C場', reservedTimes: 145, usageRate: 92.8 },
        { venueId: 4, venueName: '籃球D場', reservedTimes: 78, usageRate: 65.4 }
      ],
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    }
  },
  computed: {
    monthlyChartData() {
      return {
        labels: this.monthlyStats.map(stat => stat.month),
        datasets: [
          {
            label: '預訂數量',
            data: this.monthlyStats.map(stat => stat.totalReservations),
            borderColor: '#3f3f3f',
            backgroundColor: '#3f3f3f',
            tension: 0.1
          },
          {
            label: '總收入',
            data: this.monthlyStats.map(stat => stat.totalRevenue),
            borderColor: '#c0783e',
            backgroundColor: '#c0783e',
            tension: 0.1
          }
        ]
      }
    },
    paymentChartData() {
      return {
        labels: this.paymentStats.map(stat => stat.paymentMethod),
        datasets: [{
          data: this.paymentStats.map(stat => stat.percentage),
          backgroundColor: [
            '#3f3f3f',
            '#c0783e'
          ]
        }]
      }
    },
    venueChartData() {
      return {
        labels: this.venueStats.map(stat => `場地 ${stat.venueName}`),
        datasets: [{
          label: '使用率',
          data: this.venueStats.map(stat => stat.usageRate),
          backgroundColor: '#c0783e'
        }]
      }
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
      }).format(value)
    }
  }
})
</script>

<style scoped>
.statistics-container {
  padding: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-container {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
}
</style>