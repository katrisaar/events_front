<template>
    <select class="form-select" aria-label="Default select example">
        <option selected value="0">Kõik valdkonnad</option>
        <option v-for="activityType in activityTypes" :key="activityType.activityTypeId" :value="activityType.activityTypeId">
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
            activityTypes: [
                {
                    activityTypeId: 0,
                    activityTypeName: ''
                }
            ]
        }
    },
    methods: {
        getActivityTypes() {
            this.$http.get("/activitytype")
                .then(response => {
                    this.activityTypes = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
    },
    beforeMount() {
        this.getActivityTypes()
    }
}
</script>
