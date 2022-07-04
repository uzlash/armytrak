<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <span class="text-h5 font-weight-light">12,776 </span>
            <v-icon color="blue">mdi-account-group</v-icon>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Registered Scanners
            <v-icon size="15" class="ml-1" color="info"
              >mdi-chart-box-outline</v-icon
            >
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <span class="text-h5 font-weight-light">10,155 </span>
            <v-icon color="success">mdi-account-check</v-icon>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Registered Phones
            <v-icon size="15" class="ml-1" color="success"
              >mdi-check-circle-outline</v-icon
            >
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <span class="text-h5 font-weight-light">2,050 </span>
            <v-icon>mdi-account-remove</v-icon>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Personnel Present
            <v-icon size="15" class="ml-1">mdi-check-circle-outline</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <span class="text-h5 font-weight-light">53 </span>
            <v-icon color="warning">mdi-account-hard-hat</v-icon>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Personnel Absent
            <v-icon size="15" class="ml-1" color="warning">mdi-cancel</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-data-table
            :headers="houseHeaders"
            :items="user"
            :search="search"
            sort-by="name"
            class="elevation-4"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title class="primary--text"
                  >Personnel Management</v-toolbar-title
                >
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  color="primary"
                  clearable
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search Personnel"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-capitalize"
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add Personnel
                      <v-icon class="ml-2">mdi-account</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="d-flex justify-space-between">
                      <span class="text-h5 font-weight-bold ml-2"
                        >Add Personnel</span
                      >
                      <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-window v-model="enrolmentStep">
                      <v-window-item :value="1">
                        <v-card-text class="py-0">
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  color="primary"
                                  label="Firstname"
                                  solo
                                  prepend-inner-icon="mdi-account"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  color="primary"
                                  label="Lastname"
                                  solo
                                  prepend-inner-icon="mdi-account"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  color="primary"
                                  label="Email"
                                  solo
                                  prepend-inner-icon="mdi-email"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  color="primary"
                                  label="phone Number"
                                  solo
                                  prepend-inner-icon="mdi-phone"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  color="primary"
                                  solo
                                  prepend-inner-icon="mdi-label"
                                  label="Service Number"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  color="primary"
                                  solo
                                  prepend-inner-icon="mdi-label"
                                  label="Rank"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  prepend-inner-icon="mdi-account"
                                  hide-details="auto"
                                  solo
                                  label="Gender"
                                  :items="['Male', 'Female']"
                                  :rules="[rules.required]"
                                  color="primary"
                                />
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  color="primary"
                                  label="Duty Location"
                                  solo
                                  prepend-inner-icon="mdi-map-marker"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-file-input
                                  @change="Preview_image"
                                  v-model="image"
                                  color="primary"
                                  prepend-icon="mdi-camera"
                                  accept="image/*"
                                  show-size
                                  :clearable="false"
                                  solo
                                  label="Personnel Image"
                                  hide-details="auto"
                                ></v-file-input>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <img
                                  v-if="image"
                                  height="200"
                                  width="100%"
                                  :src="imageUrlPreview"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <div>
                            <span class="text-body-1 font-weight-bold ml-2"
                              >Biometric Device Status:
                              <span
                                :class="
                                  hardwareState == 'online'
                                    ? 'success--text'
                                    : 'error--text'
                                "
                                >{{ hardwareState }}</span
                              >
                            </span>
                            <br />
                            <span class="text-body-1 font-weight-bold ml-2"
                              >RFID Card Status:
                              <span
                                :class="
                                  hardwareState == 'online'
                                    ? 'success--text'
                                    : 'error--text'
                                "
                                >{{ hardwareState }}</span
                              >
                            </span>
                          </div>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red white--text text-capitalize"
                            @click="dialog = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="primary white--text text-capitalize"
                            @click="saveData()"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-window-item>
                    </v-window>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td class="pa-2 mx-2">
                  <v-avatar size="50">
                    <v-img src="../assets/activePersonnel.png"></v-img
                  ></v-avatar>
                </td>
                <td>{{ item.firstName + " " + item.lastName }}</td>
                <td class="ml-2">{{ item.serviceNo }}</td>
                <td>{{ item.dutyLocation }}</td>
                <td>{{ item.rank }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :disabled="item.status === 'Active'"
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="activateAccount(item._id)"
                      >
                        <v-icon color="primary" class="mr-2">
                          mdi-check
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Activate account</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="activateTag(item)"
                      >
                        <v-icon color="info" class="mr-2"> mdi-card </v-icon>
                      </v-btn>
                    </template>
                    <span>Activate RFID Tag</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="activatePhone(item.phone)"
                      >
                        <v-icon color="error" class="mr-2"> mdi-phone </v-icon>
                      </v-btn>
                    </template>
                    <span>Register Phone</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogTag" max-width="800px">
      <v-card>
        <v-card-title class="font-weight-light">Assign RFID Tag</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  hide-details
                  solo
                  v-model="edited.firstName"
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  hide-details
                  solo
                  v-model="edited.serviceNo"
                  label="Service No"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  hide-details="auto"
                  v-model="selectedTag"
                  solo
                  label="RFID"
                  :items="RFIDS"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogTag = false"> Cancel </v-btn>
          <v-btn color="#00a368" text @click="assignRFID()">
            Assign RFID Tag
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    enrolmentStep: 1,
    message: "",
    errorMessage: "",
    fpIndex: "",
    search: "",
    image: null,
    imageUrlPreview: null,
    dialogTag: false,
    edited: {
      firstName: "",
      serviceNo: 0,
    },
    selectedTag: "",
    RFIDS: [],
    rules: {
      required: (v) => !!v || "Field is required",
      counter: (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      password: (value) =>
        (value && value.length >= 6) || "Minimum length is 6 characters",
    },
    dialog: false,
    houseHeaders: [
      { text: "Image" },
      { text: "Name", sortable: true },
      { text: "Service Number", sortable: true },
      { text: "Duty Location", sortable: true },
      { text: "Rank", sortable: false },
      { text: "Email", sortable: false },
      { text: "Phone" },
      { text: "Status" },
      { text: "Actions" },
    ],
    user: [],
  }),
  methods: {
    Preview_image() {
      this.imageUrlPreview = URL.createObjectURL(this.image);
    },
    saveData() {
      console.log("Data Saved");
    },
    activateAccount(id) {
      fetch(`https://armytrak.lexington.com.ng/api/v1/user/activate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log(response);
        });
    },
    activateTag(item) {
      this.dialogTag = true;
      this.edited.firstName = item.firstName;
      this.edited.serviceNo = item.serviceNo;

      fetch(`https://armytrak.lexington.com.ng/api/v1/rfidtag`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log(response);
        });
    },
    assignRFID() {
      console.log("RFID ASSIGNED")
    },
    activatePhone(phone) {
      console.log("Phone Activated", phone);
    },
  },
  sockets: {
    "EVENT:BIOMETRIC:ENROLL"(data) {
      console.log("Event biometric enroll", data);
      this.message = data;
    },
    "EVENT:BIOMETRIC:AUTH"(data) {
      console.log("DATA RFID", data);
      // fetch("https://isatmis.lexchain.ng/api/v1/user/byrfid/" + data.rfid, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((r) => r.json())
      //   .then((response) => {
      //     console.log("Response", response);
      //     const { user } = response.payload;
      //     this.user = user;
      //     this.checkoutStep = 2;
      //   })
      //   .catch((error) => {
      //     console.log("Error>>>", error);
      //   });
    },
  },
  computed: mapGetters({
    hardwareState: "getHardwareState",
  }),
  created() {
    fetch(`https://armytrak.lexington.com.ng/api/v1/user`)
      .then((r) => r.json())
      .then((response) => {
        console.log(response);
        this.user = response.users;
      });
  },
};
</script>
