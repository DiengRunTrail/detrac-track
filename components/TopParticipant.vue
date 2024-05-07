<template>
  <div style="display: flex; align-items: center;">

    <div class="top-participants" :style="{width: width}">
      <h2>Top Participants {{ title }}</h2>
      <hr />
      <div class="participant-container">
        <div class="filter-search">
          <input v-model="searchQuery" class="search-participant" id="search" placeholder="Find runner` " />
          <div class="sort-by" @click="openSortBy = !openSortBy">
            <div>
              Sort By &ensp;
            </div>
            <Icon name="mdi:sort" />
          </div>
          <div class="dropdown" v-if="openSortBy">
            <div v-for="item in optionSortBy" class="dropdown-item" @click="sortBy(item)">
              <div>{{ item.name }}</div>
              <Icon :name="item.icon" />
            </div>
          </div>
        </div>

        <div  v-if="categoryOptions" style="margin-bottom: 20px;">

          <NavWeb :category="category" :selectCategory="selectCategory" :categoryOptions="categoryOptions" />
        </div>

        <div v-if="filteredLocation.length == 0" class="not-found-wrap">
          <div>
            <img src="/images/not-found.png" alt="not-found" class="not-found" />
            <div>Upss, No Data Found</div>
          </div>
        </div>

        <div v-for="(item, index) in filteredLocation" class="participant-rank" v-else>
          <div class="paticipant-rank-wrap" @click="$emit('see-location', item)">
            <div class="participant-rank-icon">{{ index + 1 }}.</div>
            <div class="participant-rank-id">
              <div>{{ item.uid }}</div>
              <div class="participant-rank-name">{{ item.fullname }}</div>
            </div>
          </div>
          <div class="participant-rank-estimated">
            <div>{{ item.category.split("_")[0] }} KM</div>
            <div>{{ new Date(item.updated_at).toLocaleString() }}</div>
          </div>
        </div>

      </div>
    </div>
    <div class="close-icon" @click="$emit('close-sidebar')">
      <Icon name="material-symbols:close-small-rounded" size="45" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps(["locations", "title", "width", "category", "selectCategory", "categoryOptions"])
let searchQuery = ref("")
let openSortBy = ref(false)
let sortByQuery = ref({})
let optionSortBy = ref([
  {
    "name": "Name",
    "asc": false,
    "icon": "mdi:sort-ascending"
  },
  {
    "name": "No Runner",
    "asc": false,
    "icon": "mdi:sort-ascending"
  }
])

const sortBy = (item) => {
  sortByQuery.value = item
  item.asc = !item.asc
  if (item.asc) {
    item.icon = "mdi:sort-ascending"
  } else {
    item.icon = "mdi:sort-descending"
  }
}


const filteredLocation = computed(() => {
  if (searchQuery.value == "" && sortByQuery.value == {}) {
    return props.locations.data
  }

  if (sortByQuery.value != {}) {

    switch (sortByQuery.value.name) {
      case "Name":
        if (sortByQuery.value.asc) {
          return props.locations.data.sort((a, b) => a.fullname.toLowerCase().localeCompare(b.fullname.toLowerCase()))
        }
        return props.locations.data.sort((a, b) => b.fullname.toLowerCase().localeCompare(a.fullname.toLowerCase()))

      case "No Runner":
        if (sortByQuery.value.asc) {
          return props.locations.data.sort((a, b) => a.uid.toLowerCase().localeCompare(b.uid.toLowerCase()))
        }
        return props.locations.data.sort((a, b) => b.uid.toLowerCase().localeCompare(a.uid.toLowerCase()))

      default:
        break;
    }

  }

  return props.locations.data.filter((loc) => {
    let byName = loc.fullname.toLowerCase().includes(searchQuery.value.toLowerCase())
    let byId = loc.uid.toLowerCase().includes(searchQuery.value.toLowerCase())
    return byName || byId
  })
});
</script>

<style>
.not-found-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.not-found {
  height: 15vh;
  margin-bottom: 20px;
}

.top-participants {
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #10385b;
  height: 100vh;
  overflow-y: auto;
}

.top-participants h2 {
  margin-top: 30px;
  font-family: 'Roboto', sans-serif;
}

.participant-container {
  margin-top: 30px;
  font-family: "Roboto", sans-serif;
}

.participant-container .filter-search {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 50px;
}

.participant-container .sort-by {
  align-items: center;
  background-color: white;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  width: 30%;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  border-radius: 10px;
  cursor: pointer;
}

.participant-container .dropdown {
  width: 25%;
  background-color: white;
  position: absolute;
  top: 150px;
  right: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);
  padding: 10px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
}

.participant-container .dropdown-item {
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.participant-container .search-participant {
  border: none;
  outline: none;
  background: white;
  border-radius: 10px;
  width: 70%;
  margin-right: 20px;
  padding: 1em;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  color: black;
}

.participant-container .participant-rank {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  cursor: pointer;
}

.participant-container .participant-rank .paticipant-rank-wrap {
  align-items: center;
  display: flex;
}

.participant-container .participant-rank .participant-rank-icon {
  margin-right: 5px;
}

.participant-container .participant-rank-id {
  margin: 0 20px;
  font-size: 12px;
}

.participant-container .participant-rank-name {
  font-size: 14px;
  font-weight: 900;
}

.participant-container .participant-rank-estimated {
  text-align: end;
  font-size: 12px;
}

.close-icon {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-color: #dfe325;
  color: #10385b;
  border-radius: 0 0 0 10px;
}
</style>