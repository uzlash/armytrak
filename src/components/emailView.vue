<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="2">
          <v-card class="mr-2">
            <v-card-title>
              <v-btn
                block
                @click="composeEmail()"
                dark
                class="pa-2 body-2 font-weight-bold text-capitalize"
                color="primary"
                >Compose Email</v-btn
              >
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list shaped dense>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item
                    v-for="(item, i) in itemsMail"
                    :to="`/mail/${item.to}`"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider></v-divider>
              <v-list dense>
                <v-subheader>Labels</v-subheader>
                <div class="mb-2">
                  <v-chip x-small color="green" dark>Old email</v-chip>
                </div>
                <div>
                  <v-chip x-small color="red" dark>New Email</v-chip>
                </div>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="10">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </v-col>
      </v-row>
    </v-container>
    <!-- View Message Dialog -->
    <v-dialog v-model="viewMessageDialog" max-width="600px">
      <v-card>
        <v-card-title class="primary white--text pa-2">
          <span class="body-1 font-weight-bold ml-2"
            >View Message</span
          ></v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0 px-2">
                <v-form @submit.prevent ref="form" class="mt-4">
                  <v-text-field
                    color="primary"
                    disabled
                    label="From:"
                    v-model="messageViewDialog.sender"
                    hide-details="true"
                  ></v-text-field>
                  <v-text-field
                    color="primary"
                    disabled
                    label="To:"
                    value="Me"
                    hide-details="true"
                  ></v-text-field>
                  <v-text-field
                    color="primary"
                    label="Subject:"
                    v-model="messageViewDialog.subject"
                    disabled
                    hide-details="details"
                  ></v-text-field>
                  <v-textarea
                    clearable
                    auto-grow
                    color="primary"
                    label="Message"
                    disabled
                    v-model="messageViewDialog.body"
                  ></v-textarea>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="grey lighten-1"
            class="white--text text-capitalize"
            text
          >
            <span class="mr-2">Forward</span>
            <v-icon>mdi-send</v-icon>
          </v-btn>
          <v-btn
            small
            text
            color="primary"
            class="white--text text-capitalize"
            @click="submitMessage()"
          >
            <span class="mr-2">Reply</span>
            <v-icon>mdi-reply</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Compose message dialog -->
    <v-dialog
      v-model="dialogCompose"
      persistent
      max-width="800px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="primary white--text pa-4">
          <span class="text-h6 font-weight-bold ml-2">New Message</span>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialogCompose = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0 px-2">
                <v-form @submit.prevent ref="form" class="mt-4">
                  <v-row>
                    <v-col cols="12" md="6" class="py-0 mt-2">
                      <v-combobox
                        v-model="emailMessage.to"
                        :rules="[rules.required, rules.required2]"
                        outlined
                        dense
                        color="primary"
                        class="ma-0 pa-0"
                        label="To:"
                        hint="Press Enter key to add another email"
                        persistent-hint
                        multiple
                        chips
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0 mt-2">
                      <v-text-field
                        dense
                        outlined
                        color="primary"
                        label="Subject:"
                        v-model="emailMessage.subject"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                      <v-combobox
                        v-model="emailMessage.bcc"
                        outlined
                        dense
                        color="primary"
                        class="ma-0 pa-0"
                        label="BCC:"
                        hint="Press Enter key to add BCC"
                        persistent-hint
                        multiple
                        chips
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                      <v-combobox
                        v-model="emailMessage.cc"
                        outlined
                        dense
                        color="primary"
                        class="ma-0 pa-0"
                        label="CC:"
                        hint="Press Enter key to add CC"
                        persistent-hint
                        multiple
                        chips
                      ></v-combobox>
                    </v-col>
                  </v-row>
                  <quill-editor
                    class="editor my-4"
                    ref="myTextEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                  />
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-file-input
            accept="file/*"
            hide-details="auto"
            show-size
            chips
            outlined
            dense
            multiple
            label="Select attachment(s)"
            prepend-icon=""
            prepend-inner-icon="$file"
            color="primary"
            @change="selectFiles"
          ></v-file-input>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="error"
            class="white--text text-capitalize"
            text
            @click="dialogCompose = false"
          >
            Close
          </v-btn>
          <v-btn
            outlined
            small
            color="primary"
            class="white--text text-capitalize"
            @click="saveDraft()"
          >
            <span class="mr-2">Save Draft</span>
            <v-icon>mdi-file-document</v-icon>
          </v-btn>
          <v-btn
            small
            color="primary"
            class="white--text text-capitalize"
            @click="submitMessage()"
          >
            <span class="mr-2">Send</span>
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import "@/assets/misc_css/quill/quill.bubble.css";
import "@/assets/misc_css/quill/quill.core.css";
import "@/assets/misc_css/quill/quill.snow.css";

import quillEditor from "@/components/quillTextEditor";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      editorOption: {
        placeholder: "Write Message...",
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
          // syntax: {
          //   highlight: (text) => hljs.highlightAuto(text).value,
          // },
        },
      },
      selectedMails: [],
      selectedItem: "",
      itemsMail: [
        { text: "Inbox", icon: "mdi-inbox", to: "inbox" },
        { text: "Sent", icon: "mdi-email-send-outline", to: "outbox" },
        { text: "Draft", icon: "mdi-file-document-outline" },
        { text: "Trash", icon: "mdi-trash-can-outline", to: "trash" },
      ],
      headers: [
        {
          text: "Sender",
          align: "start",
          value: "sender",
        },
        { text: "Body", value: "body" },
        { text: "Date/Time", value: "date" },
        { text: "Delete" },
      ],
      mails: [
        {
          _id: 1,
          sender: "Coursera1",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: true,
        },
        {
          _id: 2,
          sender: "Coursera2",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: false,
        },
        {
          _id: 3,
          sender: "Coursera3",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: false,
        },
        {
          _id: 4,
          sender: "Coursera4",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: false,
        },
        {
          _id: 5,
          sender: "Coursera5",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: true,
        },
        {
          _id: 6,
          sender: "Coursera6",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: false,
        },
        {
          _id: 7,
          sender: "Coursera7",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: true,
        },
        {
          _id: 8,
          sender: "Coursera8",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: true,
        },
        {
          _id: 9,
          sender: "Coursera9",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: true,
        },
        {
          _id: 10,
          sender: "Coursera10",
          subject: "Top picks just for you",
          body: "Recommendations for you. We combed our catalog and found courses just for you. They include machine learning course and data science courses.",
          date: "12:00am",
          read: false,
        },
      ],
      viewMessageDialog: false,
      messageViewDialog: {
        subject: "",
        from: "",
        message: "",
      },
      messageSenDialog: {},
      dialogCompose: false,
      emailMessage: {
        from: "uzlash16@gmail.com",
        to: [],
        subject: "",
        body: "",
        cc: [],
        bcc: [],
        attachments: [],
      },
      tab: null,
      rules: {
        required: (v) => !!v || "Field is required",
        required2: (v) => (v && v.length > 0) || "Field is required",
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
    composeEmail() {
      this.dialogCompose = true;
    },
    selectFiles(files) {
      this.emailMessage.attachments = files;
    },
    submitMessage() {
      const msgData = this.emailMessage;
      console.log("Message Data", msgData);
    },
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    editorText() {
      return this.$refs.myTextEditor.editor;
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

<style style="scss" scoped>
.custom__btn {
  position: fixed;
  bottom: 70px;
  right: 40px;
}
.custom__table-row:hover {
  cursor: pointer;
}

/* .editor {
  height: 200px;
  overflow: hidden;
} */
/* .editor {
      min-height: 150px;
      max-height: 250px;
      overflow-y: visible;
      overflow-x: hidden;
    } */

/* .custom__toolbar {
  background-color: red;
  height: 500px;
}
.custom__editor {
  background-color: green;
  height: 300px;
} */
</style>
