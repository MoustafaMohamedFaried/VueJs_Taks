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
// Importing the external users.js file
import usersScript from '@/assets/js/users.js';

export default {
    mixins: [usersScript], // Using the methods and data from the users.js file
};
</script>