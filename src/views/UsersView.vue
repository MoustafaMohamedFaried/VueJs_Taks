<template>
  <div class="container mt-5">
    <!-- Add User Button -->
    <div class="row align-items-center mb-4">
      <!-- Centered H1 -->
      <div class="col-12 col-md-6 text-center text-md-start">
        <h1 class="mb-0">Latest Users</h1>
      </div>

      <!-- Button on the Right -->
      <div class="col-12 col-md-6 text-center text-md-end">
        <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#createUserModal">
          <i class="bi bi-person-plus-fill me-2"></i>Add User
        </button>
      </div>
    </div>

    <!-- User Table -->
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle text-center shadow-sm rounded">
        <thead class="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users" :key="user.id">
            <td>{{ i + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2" data-bs-toggle="modal" data-bs-target="#editUserModal"
                @click.prevent="showUser(user.id)">
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" @click.prevent="deleteUser(user.id)">
                <i class="bi bi-trash-fill"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create User Modal -->
    <div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="createUserModalLabel"><i class="bi bi-person-plus-fill me-2"></i>Create User
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createUser">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="newUser.name" type="text" class="form-control" id="name" placeholder="Enter user name"
                  required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="newUser.email" type="email" class="form-control" id="email" placeholder="Enter email"
                  required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="newUser.password" type="password" class="form-control" id="password"
                  placeholder="Enter password" required />
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-primary"><i class="bi bi-save me-2"></i>Save</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title" id="editUserModalLabel"><i class="bi bi-pencil-square me-2"></i>Edit User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="editName" class="form-label">Name</label>
                <input v-model="currentUser.name" type="text" class="form-control" id="editName" required />
              </div>
              <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input v-model="currentUser.email" type="email" class="form-control" id="editEmail" required />
              </div>
              <div class="mb-3">
                <label for="editPassword" class="form-label">Password</label>
                <input v-model="currentUser.password" type="password" class="form-control" id="editPassword" />
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-info"><i class="bi bi-save me-2"></i>Update</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      users: [],
      newUser: { name: "", email: "", password: "" },
      currentUser: { id: null, name: "", email: "", password: "" },
      // authToken: this.$cookies.get("authToken")
      authToken: this.$authToken,
      apiKey: this.$apiKey
    };
  },

  methods: {
    showNotifi(title, text, icon) {
      this.$swal.fire(title, text, icon);
    },
    fetchUsers() {
      // Retrieve the token from localStorage
      this.$axios
        .get("http://localhost:8000/api/users", {
          headers: {
            'x-api-key': `${this.apiKey}`,
            'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
          }
        })
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.log(error);

          this.showNotifi("Error", "Failed to fetch users", "error");
        });
    },
    createUser() {
      this.$axios
        .post("http://localhost:8000/api/users", this.newUser, {
          headers: {
            'x-api-key': `${this.apiKey}`,
            'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
          }
        })
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
      this.$swal.fire({
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
          this.$axios
            .delete(`http://localhost:8000/api/users/${userId}`, {
              headers: {
                'x-api-key': `${this.apiKey}`,
                'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
              }
            })
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
      this.$axios
        .get(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            'x-api-key': `${this.apiKey}`,
            'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
          }
        })
        .then((response) => {
          this.currentUser = response.data.data;
        })
        .catch((error) => {
          console.log(error);

          this.showNotifi("Error", "Faild to displaying this user", "error");
        });
    },
    updateUser() {
      this.$axios
        .put(
          `http://localhost:8000/api/users/${this.currentUser.id}`,
          this.currentUser, {
          headers: {
            'x-api-key': `${this.apiKey}`,
            'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
          }
        })
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
