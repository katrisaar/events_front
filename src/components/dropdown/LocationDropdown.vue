<template>
    <select v-model="selectedLocationName" @change="emitSelectedLocationName" class="form-select" aria-label="Default select example">
        <option selected value="0">Kõik piirkonnad</option>
        <option v-for="location in locations" :key="location.locationName" :value="location.locationName">{{ location.locationName }}</option>
    </select>
</template>

<script>
import router from "@/router";

export default {
    name: "LocationDropdown",
    data() {
        return {
            selectedLocationName: '0',
            locations: [
                {
                    locationName: ''
                }
            ]
        }
    },
    methods: {
        emitSelectedLocationName() {
            this.$emit('event-emit-selected-location-name', this.selectedLocationName)
        },
        getLocations() {
            this.$http.get("/location")
                .then(response => {
                    this.locations = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
        setSelectedLocationName(locationName) {
            this.selectedLocationName = locationName
        }
    },
    beforeMount() {
        this.getLocations()
    }
}
</script>