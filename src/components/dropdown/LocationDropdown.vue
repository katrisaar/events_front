<template>
    <select v-model="selectedLocationId" @change="emitSelectedLocationId" class="form-select" aria-label="Default select example">
        <option selected value="0">Kõik piirkonnad</option>
        <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
    </select>
</template>

<script>
import router from "@/router";

export default {
    name: "LocationDropdown",
    data() {
        return {
            selectedLocationId: '0',
            locations: [
                {
                    name: '',
                    id: 0
                }
            ]
        }
    },
    methods: {
        emitSelectedLocationId() {
            this.$emit('event-emit-selected-location-id', Number(this.selectedLocationId))
        },
        getLocations() {
            this.$http.get("/createevent")
                .then(response => {
                    this.locations = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
        setSelectedLocationId(id) {
            this.selectedLocationId = id
        }
    },
    beforeMount() {
        this.getLocations()
    }
}
</script>