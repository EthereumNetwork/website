<template>
  <v-container elevation-24 id="calendar">
    <v-layout wrap>
      <v-flex sm12>
        <v-sheet height="500">
          <v-calendar
            :value="today"
            color="primary"
            v-model="calendarVal"
            ref="calendar">
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu
                  :key="event.title"
                  v-model="event.open"
                  full-width
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.title"
                    ></div>
                  </template>
                  <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                  >
                    <v-toolbar
                      color="primary"
                      dark
                    >
                      <v-toolbar-title v-html="event.title"></v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.details"></span>
                    </v-card-title>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
      <v-flex xs3 class="text-sm-left text-xs-center">
        <v-btn @click="$refs.calendar.prev(); decMonth();" class = 'all-buts'>
          <v-icon dark left>
              keyboard_arrow_left
          </v-icon>
            Prev
        </v-btn>
      </v-flex>
      <span class='all-text'>
        Jump to:
      </span>
      <v-flex xs3 class='all-drops'>
        <v-select
          :items="months"
          label="Month"
          v-model="monthsDrop"
          @input="monthDrop()"
        ></v-select>
      </v-flex>
      <v-flex xs1 class='all-drops'>
        <v-select
          :items="years"
          label="Year"
          v-model="yearsDrop"
          @input="yearDrop()"
        ></v-select>
      </v-flex>
      <v-flex xs0 class="text-sm-right text-xs-center all-buts">
        <v-btn @click="$refs.calendar.next(); incMonth();">
          Next
            <v-icon right dark>
              keyboard_arrow_right
            </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      calendarVal: 'today',
      yearsDrop: '',
      monthsDrop: ''
    }
  },
  mounted () {
    this.LOAD_EVENTS()
    this.SET_TODAYS_DATE()
    this.monthsDrop = this.months[this.mnthIndex]
    this.yearsDrop = this.year
  },
  methods: {
    ...mapActions('calendar', [
      'LOAD_EVENTS',
      'SET_TODAYS_DATE',
      'DEC_MNTH',
      'INC_MNTH',
      'MONTH_DROP',
      'YEAR_DROP'
    ]),
    monthDrop () {
      this.MONTH_DROP(this.monthsDrop)
      this.calendarVal = `${this.year}-${this.mnthIndex + 1}-1`
    },
    yearDrop () {
      this.YEAR_DROP(this.yearsDrop)
      this.calendarVal = `${this.year}-${this.mnthIndex + 1}-1`
    },
    decMonth () {
      this.DEC_MNTH()
      this.monthsDrop = this.months[this.mnthIndex]
      this.yearsDrop = this.year
    },
    incMonth () {
      this.INC_MNTH()
      this.monthsDrop = this.months[this.mnthIndex]
      this.yearsDrop = this.year
    },
    open (event) {
      alert(event.title)
    }
  },
  computed: {
    ...mapState('calendar', [
      'events',
      'today',
      'months',
      'year',
      'mnthIndex',
      'years'
    ]),
    eventsMap () {
      const newMap = {}
      this.events.forEach(e => (newMap[e.date] = newMap[e.date] || []).push(e))
      return newMap
    }
  }
}
</script>

<style lang="stylus" scoped>
  #calendar{
    margin-top: 50px;
  }
  .all-buts{
    margin: 30px 2px;
  }

  .all-drops{
    margin: 20px;
  }
  .all-text{
    color: #3c4043;
    font-family: 'Google Sans',Roboto,Arial,sans-serif;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 28px;
    white-space: nowrap;
    margin: 40px 10px;
  }
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>
