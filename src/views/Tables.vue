<template>
  <v-flex  fill-height>
    <template>
      <v-card>
        <v-card-title>
          Tables
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="tables"
          :items-per-page=20
          class="elevation-1"
          :search="search"
        >
          <template v-slot:body="{ items }">
            <tr v-for="item in items" :key="item.table_name" @click="navToTable(item)">
              <td>{{item.table_name}}</td>
              <td>{{item.row_count}}</td>
            </tr>
          </template>
        </v-data-table>

      </v-card>
      <v-spacer></v-spacer>
    </template>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      search: '',
      headers: [
        {text: "Name", value: "table_name"},
        {text: "Records", value: "row_count"}
      ]
    }
  },
  methods : {
    navToTable(table){
      this.$router.push("/tables/" + table.table_name);
    }
  },
  computed: mapState({
    tables : "tables"
  })
}
</script>
<style scoped>
.v-data-table td {
   cursor: pointer;
}
</style>
