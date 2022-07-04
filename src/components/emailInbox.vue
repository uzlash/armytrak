<template>
  <v-data-table
    v-model="selectedMails"
    show-select
    :search="search"
    :headers="headers"
    :items="mails"
    :item-selected="checkSelected()"
    :items-per-page="10"
    class="elevation-2"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus',
    }"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="primary--text">Inbox</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-text-field
          color="primary"
          clearable
          v-model="search"
          append-icon="mdi-magnify"
          label="Search inbox"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <div v-if="selectedMails.length">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                large
                icon
                color="grey"
                v-if="selectedMails.length"
              >
                <v-icon>mdi-email-check</v-icon></v-btn
              >
            </template>
            <span>Mark as Read</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                large
                icon
                color="grey"
                v-if="selectedMails.length"
              >
                <v-icon>mdi-email-mark-as-unread</v-icon></v-btn
              >
            </template>
            <span>Mark as Unread</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                large
                icon
                color="grey"
                v-if="selectedMails.length"
              >
                <v-icon>mdi-trash-can-outline</v-icon></v-btn
              >
            </template>
            <span>Delete Marked</span>
          </v-tooltip>
        </div>
      </v-toolbar>
    </template>
    <template v-slot:body="{ items }">
      <tbody>
        <tr
          v-for="(mail, i) in items"
          :key="i"
          class="custom__table-row"
          :class="mail.read == true ? 'grey lighten-4' : ''"
        >
          <td>
            <v-checkbox
              color="primary"
              v-model="selectedMails"
              :value="mail"
              style="margin: 0px; padding: 0px"
              hide-details
            />
          </td>
          <td @click="viewEmail(mail._id)" class="d-flex align-center">
            <v-icon size="50" :color="mail.read == true ? 'green' : 'red'"
              >mdi-circle-small</v-icon
            >
            <span
              class="mr-2"
              :class="mail.read == false ? 'font-weight-bold' : ''"
            >
              {{ mail.from }}</span
            >
          </td>
          <td @click="viewEmail(mail._id)">
            <span
              :class="mail.read == false ? 'font-weight-bold' : ''"
              v-html="mail.subject"
            ></span>
            -
            <span
              class="grey--text text--darken-2"
              v-html="trimLength(mail.body)"
            ></span>
          </td>
          <td
            @click="viewEmail(mail._id)"
            class="text-caption grey--text text--darken-1"
          >
            {{
              new Date(mail.date).toLocaleString({
                hour12: true,
              })
            }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selectedMails: [],
      selectedItem: "",
      itemsMail: [
        { text: "Inbox", icon: "mdi-inbox" },
        { text: "Sent", icon: "mdi-email-send-outline" },
        // { text: "Starred", icon: "mdi-star-outline" },
        { text: "Trash", icon: "mdi-trash-can-outline" },
      ],
      headers: [
        {
          text: "Sender",
          align: "start",
          value: "sender",
        },
        { text: "Body", value: "body" },
        { text: "Date/Time", value: "date" },
      ],
      mails: [],
      viewMessageDialog: false,
      messageViewDialog: {
        subject: "",
        from: "",
        message: "",
      },
      messageSenDialog: {},
      dialogCompose: false,
      subject: "",
      to: "",
      message: "",
      tab: null,
      rules: {
        required: (v) => !!v || "Field is required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    viewMessage(item) {
      console.log("Item", item);
      this.messageViewDialog.subject = item.subject;
      this.messageViewDialog.sender = item.sender;
      this.messageViewDialog.body = item.body;
      this.viewMessageDialog = true;
    },
    checkSelected() {
      console.log(this.selectedMails);
    },
    deleteEmail(item) {
      console.log("Item Deleted", item);
    },
    viewEmail(id) {
      this.$router.push("/mail/inbox/" + id);
    },
    trimLength(val) {
      if (val.length < 80) {
        return val;
      }
      return `${val.substring(0, 80)}...`;
    },
  },
  sockets: {
    "EVENT:EMAIL:NEW"(obj) {
      const data = JSON.parse(obj);
      console.log("Event Email New", data);
      // data.body = this.trimLength(data.body)
      data.read = false;
      data._id = 1;
      this.mails.push(data);
    },
  },
  filters: {
    // trimLength(val) {
    //   if (val.length < 80) {
    //     return val;
    //   }
    //   return `${val.substring(0, 80)}...`;
    // },
  },
};
</script>

<style style="scss">
.custom__card-height {
  min-height: calc(100vh - 48px);
}
/* .background {
  background-image: url("../assets/background1.svg");
  background-size: cover;
  background-attachment: fixed;
} */
.custom__btn {
  position: fixed;
  bottom: 70px;
  right: 40px;
}
.custom__table-row:hover {
  cursor: pointer;
}
</style>