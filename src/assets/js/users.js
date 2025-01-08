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