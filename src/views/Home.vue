<template>
    <v-flex fill-height>
      <div>
      <h2>Hi Welcome to Velzy</h2>

      <p>Velzy is a backend-in-a-box and, most importantly, your buddy.</p>

       <v-simple-table class="elevation-1">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Records</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tables" :key="item.table_name" @click="navTable(item)">
            <td>
              {{ item.table_name }}
            </td>
            <td>{{ item.row_count }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods:{
    navTable(table){
      this.$router.push("/tables/" + table.table_name);
    }
  },
  computed: mapState({
    tables: state => state.tables
  })
}
</script>
<style scoped>
.v-data-table td {
   cursor: pointer;
}
</style>
