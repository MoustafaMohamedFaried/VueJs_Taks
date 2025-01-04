<template>
  <div class="container mt-5">
    <!-- Button to Open Modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#createUserModal"
    >
      Add user
    </button>

    <!-- Table -->
    <table
      class="table table-striped table-hover table-bordered mt-4 text-center"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(user, i) in users" :key="user.id">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button
              class="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#editUserModal"
              @click.prevent="showUser(user.id)"
            >
              Edit</button
            ><button
              class="btn btn-danger"
              @click.prevent="deleteUser(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- create user modal -->
    <div
      class="modal fade"
      id="createUserModal"
      tabindex="-1"
      aria-labelledby="createUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createUserModalLabel">
              Create user form
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeCreateModalBtn"
            ></button>
          </div>
          <div class="modal-body">
            <form action="" @submit.prevent="createUser">
              <div class="mb-3">
                <label for="name" class="form-label">Username</label>
                <input
                  v-model="newUser.name"
                  type="text"
                  class="form-control"
                  id="name"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  v-model="newUser.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="newUser.password"
                  type="password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>

              <div class="d-flex justify-content-start p-1">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button
                  type="button"
                  class="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
          <!-- <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- /create user modal -->

    <!-- edit user modal -->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editUserModalLabel">Edit user form</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeEditModalBtn"
            ></button>
          </div>
          <div class="modal-body">
            <form action="" @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="name" class="form-label">Username</label>
                <input
                  v-model="currentUser.name"
                  type="text"
                  class="form-control"
                  id="name"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  v-model="currentUser.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="currentUser.password"
                  type="password"
                  class="form-control"
                  id="password"
                />
              </div>

              <div class="d-flex justify-content-start p-1">
                <button type="submit" class="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- /edit user modal -->
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      newUser: { name: "", email: "", password: "" },
      currentUser: { id: null, name: "", email: "", password: "" },
    };
  },

  methods: {
    showNotifi(title, text, icon) {
      Swal.fire(title, text, icon);
    },
    fetchUsers() {
      axios
        .get("http://localhost:8000/api/users")
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.log(error);

          this.showNotifi("Error", "Faild to fetch users", "error");
        });
    },
    createUser() {
      axios
        .post("http://localhost:8000/api/users", this.newUser)
        .then((response) => {
          const closeCreateModalBtn = document.getElementById(
            "closeCreateModalBtn"
          );

          this.users.push(response.data.data);

          this.newUser.name = "";
          this.newUser.email = "";
          this.newUser.password = "";

          closeCreateModalBtn.click();

          this.showNotifi("success", response.data.message, "success");
        })
        .catch((error) => {
          console.log(error);

          this.showNotifi("Error", "Faild to create user", "error");
        });
    },
    deleteUser(userId) {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8000/api/users/${userId}`)
            .then(() => {
              this.fetchUsers(); // Refresh the users list

              this.showNotifi(
                "Deleted!",
                "The user has been deleted.",
                "success"
              );
            })
            .catch((error) => {
              console.log(error);

              this.showNotifi("Error", "Faild to deleting this user", "error");
            });
        }
      });
    },
    showUser(userId) {
      axios
        .get(`http://localhost:8000/api/users/${userId}`)
        .then((response) => {
          this.currentUser = response.data.data;
        })
        .catch((error) => {
          console.log(error);

          this.showNotifi("Error", "Faild to displaying this user", "error");
        });
    },
    updateUser() {
      axios
        .put(
          `http://localhost:8000/api/users/${this.currentUser.id}`,
          this.currentUser
        )
        .then((response) => {
          // Update the user in the local list after successful update
          const userIndex = this.users.findIndex(
            (user) => user.id === this.currentUser.id
          );
          if (userIndex !== -1) {
            this.users[userIndex] = { ...this.currentUser };
          }

          // Close the modal
          const closeEditModalBtn =
            document.getElementById("closeEditModalBtn");
          closeEditModalBtn.click();

          // Show success notification
          this.showNotifi("Success", response.data.message, "success");
        })
        .catch((error) => {
          console.error(error);
          this.showNotifi("Error", "Failed to update user", "error");
        });
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>
