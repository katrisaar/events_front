<template>
    <div class="container">
        <div class="row">
            <div class="col">
                Osalejad:
            </div>
            <div class="col">
                <div v-if="noParticipantsMessage !== ''" class="row">{{noParticipantsMessage}}</div>
                <div v-else v-for="participant in participants" class="row">
                    <div class="col">
                        {{participant.firstName }} {{ participant.lastName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";

export default {
    name: "Participants",
    props: {
        eventId: 0
    },
    data() {
        return {
            noParticipantsMessage: '',
            participants: [
                {
                    firstName: '',
                    lastName: ''
                }
            ],
            errorResponse: {
                message: '',
                errorCode: 0
            }
        }
    },
    methods: {
        getParticipants() {
            this.$http.get("/participants", {
                    params: {
                        eventId: this.eventId
                    }
                }
            ).then(response => {
                this.participants = response.data
            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 666) {
                    this.noParticipantsMessage = this.errorResponse.message
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
    },
    beforeMount() {
        this.getParticipants()
    }
}
</script>

