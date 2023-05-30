<template>
  <Modal ref="modalRef" close-button-name="Loobu">
      <template #header>
          Korraldaja lisamine
      </template>
      <template #body>
          <div class="container">
              <AlertDanger :message="message"/>
              <div class="row">
                  <div class="col">
                      Sisesta uue korraldaja kasutajanimi
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                      <div class="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1">Kasutajanimi</span>
                          <input v-model="username" type="text" class="form-control">
                      </div>
                  </div>
              </div>
          </div>
      </template>
      <template #footer>
          <button @click="addOrganiser" type="button" class="btn btn-success">Lisa korraldaja</button>
      </template>
  </Modal>

</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import router from "@/router";

export default {
    name: "AddOrganiserModal",
    components: {AlertDanger, Modal},
    data() {
        return {
            eventId: '',
            username: '',
            message: ''
        }
    },
    methods: {
        setEventId(eventId) {
            this.eventId = eventId
        },
        addOrganiser() {
            this.message = ''
            if (this.username === '') {
                this.message = "Täida kasutajanimi"
            } else {
                this.addEventOrganiserByName()
            }
        },
        addEventOrganiserByName() {
            this.$http.post("/connection/organiser", null, {
                    params: {
                        eventId: this.eventId,
                        username: this.username
                    }
                }
            ).then(response => {
                this.$emit('event-organisers-changed')
                this.$refs.modalRef.closeModal()
            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 224 || this.errorResponse.errorCode === 668) {
                    this.message = this.errorResponse.message
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
    }
}
</script>

<style scoped>

</style>