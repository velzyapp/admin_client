import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const execute = function(query){
  const stringified = JSON.stringify(query)
  console.log("Executing Query", stringified);
  return fetch(process.env.VUE_APP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stringified,
  }).then(res => res.json()).catch(err => console.log(err))
}

export default new Vuex.Store({
  state: {
    graphUrl: process.env.VUE_APP_GRAPHQL_URL,
    table: { name: "Nothing" },
    records: [],
    columnNames: null,
    stats: {},
    alerts: [],
    tables: [],
    selectedRecord: null
  },
  mutations: {
    SET_TABLES(state, result) {
      state.tables = result;
    },
    ADD_TABLE(state, table) {
      state.tables.push({
        table_name: table,
        row_count: 0
      });
    },
    SET_RECORDS(state, res) {
      console.log(res);
      state.records = res.records;
      state.table = {name: res.tableName}
    },
    SET_RECORD(state, res) {
      state.selectedRecord = res.record;
    },
    DELETE_RECORD(state, id) {
      state.records = state.records.filter(r => r.id !== id);
    },
    RECORD_CHANGED(state, payload) {
      //TODO: Figure out the notification plan
      //probably just leave it to the socket call

      //when a record comes in, we need to push ONLY if
      //we're looking at the current table
      if (state.table.name === payload.tableName) {
        //let's see if the record exists
        const found = state.records.find(r => r.id === parseInt(payload.id));
        if (payload.action === "DELETE") {
          if (found) {
            //slice it
            const foundIndex = state.records.indexOf(found);
            state.records.splice(foundIndex, 1);
          }
        } else {
          if (found) {
            //slice it
            const foundIndex = state.records.indexOf(found);
            state.records.splice(foundIndex, 1, payload.record);
          } else {
            //just push on the end
            state.records.push(payload.record);
          }
        }
      }
    }
  },
  actions: {
    saveDocument(context, doc) {
      const stringified = JSON.stringify(doc);
      //such a hack but...
      const dequoted = stringified.replace(/\"([^(\")"]+)\":/g, "$1:");
      return execute({ query: `mutation {save(collection:"${context.state.table.name}", body:${dequoted})}`}).then(res => {
        return {
          success: true,
          data: res.data.save
        }
      }).catch(err => {
        return {
          success: false,
          err: error
        }
      })
    },
    deleteDocument(context, id) {
      execute({query: `mutation {
        delete(tableName: "${context.state.table.name}", id: ${id})
      }`})
        .then(res => {
          context.commit("DELETE_RECORD", id)
        });
    },
    loadTables(context) {

      //turn this into a single method please
      execute({query: '{ tableList }'})
        .then(res => context.commit("SET_TABLES", res.data.tableList));
    },
    addTable(context, table) {
      context.commit("ADD_TABLE", table);
    },
    recordChanged(context, payload) {
      context.commit("RECORD_CHANGED", payload);
    },
    loadRecords(context, tableName) {
      execute({query: `{topNRecords(tableName:"${tableName}")}`})
        .then(res => context.commit("SET_RECORDS", {
          tableName: tableName,
          records: res.data.topNRecords.map(r => r.body)
        }));
    },
    runSearch(context, term) {
      execute({
        query: `{ search (tableName: "${context.state.table.name}", term: "${term}")}`
      }).then(res => context.commit("SET_RECORDS", {
        tableName: context.state.table.name,
        records: res.data.search
      }));
    }
  }
});
