<template>
    <select v-model="selectedActivityTypeName" @change="emitSelectedActivityTypeName" class="form-select" aria-label="Default select example">
        <option selected value="0">Kõik valdkonnad</option>
        <option v-for="activityType in activityTypes" :key="activityType.activityTypeName"
                :value="activityType.activityTypeName">
            {{ activityType.activityTypeName }}
        </option>
    </select>
</template>

<script>
import router from "@/router";

export default {
    name: "ActivityTypeDropdown",
    data() {
        return {
            selectedActivityTypeName: '0',
            activityTypes: [
                {
                    activityTypeName: ''
                }
            ]
        }
    },
    methods: {
        emitSelectedActivityTypeName() {
            this.$emit('event-emit-selected-activity-type-name', this.selectedActivityTypeName)
        },
        getActivityTypes() {
            this.$http.get("/activitytype")
                .then(response => {
                    this.activityTypes = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
        setSelectedActivityTypeName(activityTypeName) {
            this.selectedActivityTypeName = activityTypeName
        }
    },
    beforeMount() {
        this.getActivityTypes()
    }
}
</script>
