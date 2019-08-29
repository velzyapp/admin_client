<template>
  <v-flex fill-height>
      <v-form @submit="runSearch">
        <v-text-field
          solo
          label="Search"
          v-model="search"
          prepend-inner-icon="mdi-database-search"
        ></v-text-field>
      </v-form>
      <v-btn v-if="searching" class="mb-8" @click="reloadRecords">
        <v-icon>mdi-database-refresh</v-icon>
        Reset
      </v-btn>
    <v-card>
      <v-card-title>
        <h2>
          <router-link to="/tables" style="text-decoration: none"><v-icon large>mdi-database</v-icon>Tables</router-link> >
          {{table.name}}
        </h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="records"
          :items-per-page=20
          class="elevation-1"
        >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td  @click="editMe(item)"> {{ item.id }} </td>
              <td  @click="editMe(item)"> {{item.body}} </td>
              <td>
                <v-btn class="error" small @click="showDelete(item)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
        </v-data-table>
      </v-card-text>
    </v-card>

      <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Delete {{table.name}} #{{deleteId}}?</v-card-title>

        <v-card-text>
          This cannot be undone and you will data. You sure?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="success"
            @click="deleteDoc(deleteId)"
          >
            Yeah do it!
          </v-btn>

          <v-btn
            color="warning"
            @click="deleteDialog = false"
          >
            Oops, no stop!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Record #{{editDocument.id}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-flex>

                <editor style="width: 100%"
                  v-model="editDocument.json"
                  @init="editorInit"
                  lang="json"
                  class="elevation-1"
                  height="500">
                </editor>
              </v-flex>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveDoc">
            <v-icon>mdi-database-check</v-icon>
            Save
          </v-btn>
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error outline" @click="showDelete(editDocument)">
            <v-icon>mdi-database-remove</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="notification.show"
      :color="notification.type"
      :multi-line="false"
      :timeout="2000"
      :vertical="false"
    >
      {{ notification.text }}
      <v-btn
        dark
        @click="notification.show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';
import VJsoneditor from 'vue-jsoneditor';

export default {
  data(){
    return {
      search: "",
      searching: false,
      deleteId: null,
      deleteDialog: false,
      editDialog: false,
      editDocument: {id: 0},
      notification: {show: false, type: "success"},
      headers : [
        {text: "ID", value: "id"},
        {text: "Document", value: "body"},
        {text: "Options", value: "options"}
      ]
    }
  },
  components: {
    editor: require('vue2-ace-editor'),
  },
  methods: {
    editorInit: function (editor) {
      require('brace/ext/language_tools')
      require('brace/mode/json')
      editor.setShowPrintMargin(false);
    },
    reloadRecords(){
      this.search = "";
      this.searching = false;
      this.$store.dispatch("loadRecords", this.table.name);
      this.showSuccess("Dataset reloaded from database...")
    },
    runSearch(ev){
      this.searching = true;
      ev.preventDefault();
      this.$store.dispatch("runSearch", this.search);
    },
    editMe(doc){
      //show the JSON editor
      this.editDocument = doc;
      this.editDialog = true;
    },
    showSuccess(message){
      this.notification.type ="success";
      this.notification.text = message;
      this.notification.show = true;
    },
    showError(message){
      this.notification.type ="error";
      this.notification.text = message;
      this.notification.show = true;
    },

    saveDoc(){
      const tableName = this.table.name;
      //parse it
      const edited = JSON.parse(this.editDocument.json);

      //send it
      this.$store.dispatch("saveDocument", edited).then(res => {
        console.log(res);
        if(res.success){
          this.editDialog = false;
          this.showSuccess("Record saved...");
        }else{
          this.showError("Record not saved: " + res.error);
        }
      }).catch(err => {
        this.showError("BOOM!: " + err);
      });
    },
    showDelete(doc){
      this.editDialog = false;
      this.deleteId = doc.id;
      this.deleteDialog = true;
    },
    deleteDoc(id){

      this.$store.dispatch("deleteDocument",id).then(res => {
        this.showSuccess("Record deleted...");
        //reload the tables too
        this.$store.dispatch("loadTables");
      }).catch(err => {
        this.showError("Oops - problem: " + err);
      }).finally(() => {
        this.deleteDialog = false;
      });
    }
  },
  computed :  mapState({
    table: state => state.table,
    records: state => {
      if(state.records){
        //at some point need to go through here and
        //reconcile the data type with the schema
        return state.records.map(r => {
          const json = JSON.stringify(r, null, "\t");
          return {
            id: r.id,
            json: json,
            body: json.substring(0, 100) + "..."
          }
        });
      }
    }
  }),
  created() {
    const tableName = this.$route.params.id;
    this.$store.dispatch("loadRecords", tableName);
  },
}
</script>
<style scoped>
.v-data-table td {
   cursor: pointer;
}
</style>
