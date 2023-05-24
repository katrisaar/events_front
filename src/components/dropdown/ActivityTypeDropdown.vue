<template>
    <select v-model="selectedActivityTypeId" @change="emitSelectedActivityTypeId" class="form-select" aria-label="Default select example">
        <option selected value="0">Kõik valdkonnad</option>
        <option v-for="activityType in activityTypes" :key="activityType.activityTypeId"
                :value="activityType.activityTypeId">
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
            selectedActivityTypeId: '0',
            activityTypes: [
                {
                    activityTypeId: 0,
                    activityTypeName: ''
                }
            ]
        }
    },
    methods: {
        emitSelectedActivityTypeId() {
            this.$emit('event-emit-selected-activity-type-id', Number(this.selectedActivityTypeId))
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
        setSelectedActivityTypeId(activityTypeId) {
            this.selectedActivityTypeId = activityTypeId
        }
    },
    beforeMount() {
        this.getActivityTypes()
    }
}
</script>
