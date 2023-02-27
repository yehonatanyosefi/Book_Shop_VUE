import { eventBusService } from '../services/event-bus.service.js'

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <button @click="msg=null">x</button>
            <p>
                {{msg.txt}}
            </p>
        </div>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        this.unsubscribe = eventBusService.on('show-msg', (msg) => {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 1500)
        })
    },
    unmounted() {
        // This code never runs in this case
        this.unsubscribe()
    }
}