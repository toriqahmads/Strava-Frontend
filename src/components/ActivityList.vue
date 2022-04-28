<template>
  <div>
    <template v-if="activities && activities.length > 0">
      <Table v-model="activities" :fields="fields"></Table>
    </template>
    <b-button v-if="loading" variant="primary" disabled>
      <b-spinner small type="grow"></b-spinner>
        Loading...
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Table from './Table.vue'

export default {
  name: 'ActivityList',
  props: {
    type: String
  },
  components: {
    Table
  },
  data() {
    return {
      loading: false,
      fields: [
        {
          key: 'name',
          label: 'Name',
          type: 'text'
        },
        {
          key: 'type',
          label: 'Type',
          type: 'text'
        },
        {
          key: 'elapsed_time',
          label: 'Elapsed Time',
          type: 'text',
        },
        {
          key: 'start_date',
          label: 'Date',
          type: 'text'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('authentication', {
      athlete: 'athlete',
    }),
    ...mapGetters('activity', {
      activities: 'activities',
      activity: 'activity'
    })
  },
  methods: {
    async getActivities() {
      this.loading = true
      await this.$store.dispatch('activity/getActivities', {
        athlete_id: this.athlete.athlete_id,
        type: this.type,
      })

      this.loading = false
    },
  },
  async mounted() {
    await this.getActivities()
  }
}
</script>
