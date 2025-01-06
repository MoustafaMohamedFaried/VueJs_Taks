<template>
    <div class="login-form-container">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="user.email" placeholder="Enter your email"
                    required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" v-model="user.password"
                    placeholder="Enter your password" required />
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary">Login</button>
                <a href="#" class="btn btn-link" @click.prevent="handleRegister">
                    Register
                </a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        };
    },
    methods: {
        showNotifi(title, text, icon) {
            this.$swal.fire(title, text, icon);  // Use the globally provided Swal
        },
        handleLogin() {
            this.$axios
                .post(
                    "http://localhost:8000/api/login",
                    this.user, // Request body containing user data
                    {
                        headers: {
                            'x-api-key': 'kdsldnsjdnsjkndjksndjFaJ0kfG9m8sW08yTXiC0tPmsN6964',
                        },
                    }
                )
                .then((response) => {
                    // Access the token from response.data.data.access_token
                    // localStorage.setItem("authToken", response.data.data.access_token);

                    this.$cookies.set("authToken", response.data.data.access_token, {
                        expires: 7, // Cookie will expire in 7 days
                        secure: true,
                        sameSite: "Strict",
                    });

                    // Show success notification
                    this.showNotifi("Success", response.data.message, "success");

                    // Redirect to the home page
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.error(error);

                    // Show error notification
                    if (error.response && error.response.data.message) {
                        this.showNotifi("Error", error.response.data.message, "error");
                    } else {
                        this.showNotifi("Error", "Failed to create user", "error");
                    }
                });
        },
        handleRegister() {
            // Redirect to the registration page
            this.$router.push('/register');
        },
    },
};
</script>

<style scoped>
.login-form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.login-form-container h2 {
    margin-bottom: 20px;
}

.login-form .btn-primary {
    width: 100px;
}
</style>
