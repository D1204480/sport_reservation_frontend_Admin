<template>

  <body class="d-flex flex-column min-vh-100">

    <!-- 營業管理 storeNavBar
    <div class="container-fluid fs-6">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <RouterLink to="/StoreSetView" class="nav-link link-success">營業設定</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/StoreOrderView" class="nav-link link-success active" aria-current="page">訂單管理
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/StoreMenuView" class="nav-link link-success">菜單管理</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/StoreInfoView" class="nav-link link-success">餐廳資訊</RouterLink>
        </li>
      </ul>
    </div> -->

    <!-- 搜尋與排序 search with checkboxes -->
    <div class="container-fluid mt-4 mb-3">
      <div style="max-width: 800px;">
        <form class="d-flex align-items-start" @submit.prevent="handleSearch">
          <!-- 搜尋框 -->
          <input class="form-control form-control-sm me-2" type="search" placeholder="請輸入關鍵字" aria-label="Search"
            v-model="searchQuery">
          <button class="btn btn-sm btn-outline-success me-3" type="submit">Search</button>

          <!-- 依日期篩選按鈕組 -->
          <div class=" btn-group-sm" role="group" aria-label="Basic radio toggle button group"
            style="white-space: nowrap;">
            <input type="radio" class="btn-check " name="btnradio" id="btnradio1" autocomplete="off"
              v-model="filterDate" value="today">
            <label class="btn btn-outline-success" for="btnradio1" style="margin-right: 5px;">今日</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="filterDate"
              value="tomorrow">
            <label class="btn btn-outline-success" for="btnradio2" style="margin-right: 5px;">明日</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" v-model="filterDate"
              value="week">
            <label class="btn btn-outline-success" for="btnradio3" style="margin-right: 5px;">一週內</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" v-model="filterDate"
              value="none" checked>
            <label class="btn btn-outline-success" for="btnradio4">無</label>

          </div>
        </form>
      </div>
    </div>
    <!-- 訂單 table -->
    <div class="container-fluid">
      <div class="card mt-3 mb-3 p-2">
        <div class="table-responsive">
          <table class="table">
            <thead style="white-space: nowrap;">
              <tr>
                <th scope="col">序號</th>
                <th scope="col">訂單日期</th>
                <th scope="col">訂單編號</th>
                <th scope="col">付款方式</th>
                <th scope="col">訂單狀態</th>
                <th scope="col">訂單內容</th>
                <th scope="col">取消訂單</th>
              </tr>
            </thead>
            <tbody>
              <!-- 將每個訂單資料和其對應的 collapse 內容放在一起 -->
              <template v-for="(order, index) in filteredOrders" :key="order.orderId">
                <!-- 訂單資料行 -->
                <tr>
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ formatDate(order.orderDate) }}</td>
                  <td>{{ order.orderId}}</td>
                  <td>{{ order.reservation.venue.venueName }}</td>
                  <td>{{ order.status?.status || '-' }}</td>
                  <td style="white-space: nowrap;">
                    <a class="btn btn-warning btn-sm btn-xs btn-block" :data-bs-toggle="'collapse'"
                      :href="'#collapseOrder' + order.orderId" role="button" aria-expanded="false"
                      :aria-controls="'collapseOrder' + order.orderId" @click="getDataByOrderId(order.orderId)">
                      訂單詳情
                    </a>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                      data-bs-target="#deleteMenuModal" v-on:click="onSelectOrder(order)"
                      :disabled="order.status?.statusId === 7">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#c0783e"
                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path
                          d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5">
                        </path>
                      </svg>
                    </button>
                  </td>
                </tr>

                <!-- Collapse 內容行 -->
                <tr class="collapse" :id="'collapseOrder' + order.orderId">
                  <td colspan="7">
                    <div style="border-radius: 10px; background-color: #fff3cd;">
                      <div class="container-fluid">
                        <div class="d-flex justify-content-between p-3">
                          <h5>預約資訊</h5>
                        </div>

                        <!-- 預約詳細資訊 -->
                        <table class="table mb-3 table-borderless table-responsive table-warning text-start">
                          <thead class="td-border-line">
                            <tr>
                              <th scope="col">預約使用日期</th>
                              <th scope="col">預約時段</th>
                              <th scope="col">預約單位</th>
                              <th scope="col">備註</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{{ formatDate(order.reservation?.reservationDate) }}</td>
                              <td>{{ order.reservation?.timePeriodText || '-' }}</td>
                              <td>{{ order.reservation?.applyApartment || '-' }}</td>
                              <td>{{ order.reservation?.remark || '-' }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>

  <!-- Delete Order Modal -->
  <div class="modal fade" id="deleteMenuModal" tabindex="-1" aria-labelledby="deleteMenuModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete Order</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this order?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="deleteOrder">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      orderDetails: {},
      filterDate: 'none',
      searchQuery: '',
      selectedOrder: null
    };
  },

  computed: {
    filteredOrders() {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const oneWeekLater = new Date();
      oneWeekLater.setDate(today.getDate() + 7);

      if (this.filterDate === 'none') {
        return this.orders.filter(order => {
          return order.userId?.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }

      return this.orders.filter(order => {
        const orderDate = new Date(order.orderDate);

        let dateMatch = false;
        if (this.filterDate === 'today') {
          dateMatch = orderDate.toDateString() === today.toDateString();
        } else if (this.filterDate === 'tomorrow') {
          dateMatch = orderDate.toDateString() === tomorrow.toDateString();
        } else if (this.filterDate === 'week') {
          dateMatch = orderDate >= today && orderDate <= oneWeekLater;
        }

        const searchMatch = order.userId?.toLowerCase().includes(this.searchQuery.toLowerCase());
        return dateMatch && searchMatch;
      });
    }
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW');
    },

    async getData() {
      try {
        const response = await axios.get("http://localhost:8080/api/orders");
        this.orders = response.data;
        console.log("Orders data:", this.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },

    async getDataByOrderId(orderId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
        this.orderDetails = {
          ...this.orderDetails,
          [orderId]: response.data
        };
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    },

    onSelectOrder(order) {
      this.selectedOrder = order;
    },

    async deleteOrder() {
      if (!this.selectedOrder) return;

      try {
        await axios.put(`http://localhost:8080/api/orders/${this.selectedOrder.orderId}/cancel`);
        await this.getData(); // 重新取得訂單資料
      } catch (error) {
        console.error("Error canceling order:", error);
      }
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style scoped>
/* 搜尋框 */
.btn-outline-success {
    color: #3F3F3F;
    border-color: #3F3F3F;
}

.btn-outline-success:hover {
    color: #fff;
    background-color: #3F3F3F;
    border-color: #3F3F3F;
}

.btn-outline-success:active,
.btn-outline-success.active,
.btn-check:checked + .btn-outline-success {
    color: #fff;
    background-color: #3F3F3F;
    border-color: #3F3F3F;
}

.btn-outline-success:focus {
    box-shadow: 0 0 0 0.25rem rgba(63, 63, 63, 0.5);
}

.btn-warning {
  color: #fff;
  background-color: #3F3F3F;
  border-color: #3F3F3F;
}

.btn-warning:hover {
    color: #fff;
    background-color: #262626;
    border-color: #262626;
}

/* Store navBar */
.nav-link.active {
  color: black !important;
}

@media screen and (max-width: 420px) {
  .nav-item {
    font-size: 16px;
    padding: 3px;
  }

  .nav-link {
    padding: 5px 10px;
  }
}

@media screen and (max-width: 395px) {
  .nav-item {
    font-size: 14px;
    padding: 3px;
  }

  .nav-link {
    padding: 5px 10px;
  }
}

@media screen and (max-width: 365px) {
  .nav-item {
    font-size: 13px;
    padding: 3px;
  }

  .nav-link {
    padding: 5px 10px;
  }
}

@media screen and (max-width: 355px) {
  .hid {
    display: none;
  }
}

@media screen and (max-width: 345px) {
  .nav-item {
    font-size: 12px;
    padding: 3px;
  }

  .nav-link {
    padding: 5px 10px;
  }
}

/* END */


/* Table style */
table {
  text-align: center;
}

@media screen and (max-width: 768px) {
  table {
    font-size: 15px;
  }

  .btn-xs {
    padding: 0.23rem 0.35rem;
    font-size: 0.73rem;
    line-height: 1.3;
  }

}

@media screen and (max-width: 576px) {
  table {
    font-size: 14px;
  }

  .btn-xs {
    padding: 0.2rem 0.25rem;
    font-size: 0.7rem;
    line-height: 1;
  }

  /* 在小螢幕下設置按鈕全寬 */
  .btn-block {
    width: 100%;
    display: block;
    margin-bottom: 5px;
  }

}

@media screen and (max-width: 520px) {
  table {
    font-size: 13px;
  }

}

@media screen and (max-width: 495px) {
  table {
    font-size: 12px;
  }
}

@media screen and (max-width: 470px) {
  table {
    font-size: 11px;
  }
}

@media screen and (max-width: 445px) {
  table {
    font-size: 10px;
  }

}

th {
  font-weight: normal;
}

/* 訂單詳情 */
.td-border-line {
  border-bottom: #c0c8d0 solid 1px;
}

/* 增加表格的滾動功能 */
.table-responsive {
  overflow-x: auto;
}

/* END */

/* 修改 btn-danger, btn-warning 背景色 */
.btn-danger,
.btn-danger:hover {
  color: #fff;
  background-color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
}
</style>
