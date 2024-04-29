<template>
    <div class="nav-category-wrap">
        <div v-for="(c, i) in categoryOptions" class="nav-category-item" @click="selectCategory(c)" :key="i"
            :class="{ selected: category == c.value }">
            {{ c.name }}
        </div>
    </div>
</template>

<script setup>

defineProps(['selectCategory', 'categoryOptions', 'category'])

</script>

<style scoped>
.nav-category-wrap {
    display: flex;
    flex: 1;
    justify-content: center;
}

.nav-category-item {
    font-size: 16px;
    padding: 10px;
    height: 20%;
    align-items: center;
    width: 5vw;
    font-family: "Roboto", sans-serif;
    text-align: center;
    font-weight: bold;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
    cursor: pointer;
}

.nav-category-item:hover {
    color: #10385b;
    background-color: white;
    border: 1px solid #10385b;
}

.selected {
    color: #10385b;
    background-color: white;
    border: 1px solid #10385b;
}
</style>