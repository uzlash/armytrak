<template>
  <v-card>
    <v-card-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="goBack()"
            icon
            v-bind="attrs"
            color="grey"
            v-on="on"
            large
          >
            <v-icon size="30">mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>Go back</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" large icon color="grey">
            <v-icon>mdi-email-check</v-icon></v-btn
          >
        </template>
        <span>Mark as Read</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" large icon color="grey">
            <v-icon>mdi-email-mark-as-unread</v-icon></v-btn
          >
        </template>
        <span>Mark as Unread</span>
      </v-tooltip> 
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" large icon color="grey">
            <v-icon>mdi-trash-can-outline</v-icon></v-btn
          >
        </template>
        <span>Delete</span>
      </v-tooltip>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <h4 class="text-h6" :class="computedColor + '--text'">
        Your elite author graphic optimization reward is ready!
      </h4>
      <div class="d-flex pa-2 align-center mb-2">
        <v-avatar size="50" color="grey" class="mr-2">
          <v-img src="https://avatars.githubusercontent.com/u/39749863?v=4"></v-img>
        </v-avatar>
        <div>
          <h2>
            <span class="text-body-2 font-weight-bold black--text"
              >Demo Team
            </span>
            <span class="caption">&lt; dummy@gmail.com &gt;</span>
          </h2>
          <span class="text-body-2">to Me</span>
        </div>
        <v-spacer></v-spacer>
        <span class="text-caption">Jan 15, 2021, 10:20am</span>
      </div>
      <p>
        <span style="color: rgb(34, 34, 34)">Hey uzlash!</span>
      </p>
      <p><br /></p>
      <p>
        <span style="color: rgb(34, 34, 34)"
          >A third-party OAuth application (Stream) with read:user and
          user:email scopes was recently authorized to access your
          account.</span
        >
      </p>
      <p>
        <span style="color: rgb(34, 34, 34)">Visit&nbsp;</span
        ><a
          href="https://github.com/settings/connections/applications/e5d2e28d4e4e67fecab8"
          rel="noopener noreferrer"
          target="_blank"
          style="color: rgb(17, 85, 204); background-color: rgb(255, 255, 255)"
          >https://github.com/settings/connections/applications/e5d2e28d4e4e67fecab8</a
        ><span style="color: rgb(34, 34, 34)">&nbsp;for more information.</span>
      </p>
      <p><br /></p>
      <p>
        <span style="color: rgb(34, 34, 34)"
          >To see this and other security events for your account,
          visit&nbsp;</span
        ><a
          href="https://github.com/settings/security-log"
          rel="noopener noreferrer"
          target="_blank"
          style="color: rgb(17, 85, 204); background-color: rgb(255, 255, 255)"
          >https://github.com/settings/security-log</a
        >
      </p>
      <p><br /></p>
      <p>
        <span style="color: rgb(34, 34, 34)"
          >If you run into problems, please contact support by
          visiting&nbsp;</span
        ><a
          href="https://github.com/contact"
          rel="noopener noreferrer"
          target="_blank"
          style="color: rgb(17, 85, 204); background-color: rgb(255, 255, 255)"
          >https://github.com/contact</a
        >
      </p>
      <p><br /></p>
      <p>
        <span style="color: rgb(34, 34, 34)"
          ><span class="ql-cursor"></span>Thanks,</span
        >
      </p>
      <p><span style="color: rgb(34, 34, 34)">The GitHub Team</span></p>
      <v-divider></v-divider>
      <!-- <h5>ATTACHED FILES</h5> -->
    </v-card-text>
  </v-card>
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
        { text: "Trash", icon: "mdi-trash-can-outline" },
      ],
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
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      items: [
        {
          time: "15 min",
          subject: "Brunch this weekend?",
          body: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          sender: "Ali Connors",
        },
        {
          time: "2 hr",
          subject: "Summer BBQ",
          body: `Wish I could come, but I'm out of town this weekend.`,
          sender: "me, Scrott, Jennifer",
        },
        {
          time: "6 hr",
          subject: "Oui oui",
          body: "Do you have Paris recommendations? Have you ever been?",
          sender: "Sandra Adams",
        },
        {
          time: "12 hr",
          subject: "Birthday gift",
          body:
            "Have any ideas about what we should get Heidi for her birthday?",
          sender: "Trevor Hansen",
        },
        {
          time: "18hr",
          subject: "Recipe to try",
          body: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
          sender: "Britta Holt",
        },
      ],
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
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    computedColor() {
      return this.$store.getters.getColor;
    },
  },
  filters: {
    trimLength(val) {
      if (val.length < 80) {
        return val;
      }
      return `${val.substring(0, 80)}...`;
    },
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