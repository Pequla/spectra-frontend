<script lang="ts" setup>
export interface DataTableProps {
    data: undefined | any[]
}

const { data } = defineProps<DataTableProps>()
</script>

<template>
    <div class="text-center mx-auto" v-if="data == undefined">
        <img src="@/assets/loading.gif" width="120px">
        <h3>Please wait...</h3>
        <p>We are retrieving the latest data from the server!</p>
    </div>
    <table class="table table-striped table-hover" v-else-if="data.length > 0">
        <slot></slot>
    </table>
    <div v-else>No data was found!</div>
</template>