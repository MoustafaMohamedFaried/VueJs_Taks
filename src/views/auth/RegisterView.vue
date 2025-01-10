<template>
    <div class="register-form-container">
        <h2 class="text-center">Register</h2>
        <form class="register-form" @submit.prevent="handleRegister">
            <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" id="name" class="form-control" v-model="user.name" placeholder="Enter your full name"
                    required />
            </div>
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
                <button type="submit" class="btn btn-primary">Register</button>
                <a href="#" @click.prevent="handleLogin" class="btn btn-link">Already have an account? Login</a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
            },
            apiKey: this.$apiKey
        };
    },
    methods: {
        showNotifi(title, text, icon) {
            this.$swal.fire(title, text, icon); // Use the globally provided Swal
        },
        handleRegister() {
            this.$axios
                .post(
                    "http://localhost:8000/api/register",
                    this.user, // Request body containing user data
                    {
                        headers: {
                            'x-api-key': `${this.apiKey}`,
                        },
                    }
                )
                .then((response) => {
                    // Access the token and user info from response.data.data
                    // const { access_token, user } = response.data.data;

                    // // Create the user data object
                    // const userData = {
                    //     name: user.name,
                    //     id: user.id,
                    //     email: user.email,
                    //     access_token: access_token,
                    // };

                    // // Store the userData in cookies
                    // this.$cookies.set("userData", JSON.stringify(userData), {
                    //     expires: 7, // Cookie will expire in 7 days
                    //     secure: true,
                    //     sameSite: "Strict",
                    // });

                    // // Show success notification
                    // this.showNotifi("Success", response.data.message, "success");

                    // // Redirect to the home page
                    // this.$router.push("/");

                    this.$router.push("/login");
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
        handleLogin() {
            // Redirect to the login page
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.register-form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.register-form-container h2 {
    margin-bottom: 20px;
}

.register-form .btn-primary {
    width: 100px;
}
</style>
