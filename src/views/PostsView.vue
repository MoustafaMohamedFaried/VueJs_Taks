<template>
  <div class="container mt-5">
    <!-- Add Post Button -->
    <div class="row align-items-center mb-4">
      <!-- Centered H1 -->
      <div class="col-12 col-md-6 text-center text-md-start">
        <h1 class="mb-0">Latest Posts</h1>
      </div>

      <!-- Button on the Right -->
      <div class="col-12 col-md-6 text-center text-md-end">
        <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#createPostModal">
          <i class="bi bi-person-plus-fill me-2"></i>Add Post
        </button>
      </div>
    </div>

    <!--Posts cards -->
    <div class="row">
      <!-- Loop through posts and display each as a card -->
      <div v-for="post in posts" :key="post.id" class="col-md-4 mb-4">
        <div class="card shadow-sm" style="height: 100%;">
          <!-- Image Placeholder -->
          <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Post image" />

          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-primary">{{ post.title }}</h5>
            <p class="card-text text-muted mb-3">{{ truncateText(post.content, 100) }}</p>
            <span class="card-text mb-3">created_by => <span class="text-danger fw-bold">{{ post.uploader_name
                }}</span></span>

            <!-- Buttons on the Same Line -->
            <div class="d-flex justify-content-start mt-auto align-items-center">
              <!-- Read More Button -->
              <button class="btn btn-primary me-2">
                Read More
              </button>

              <!-- Edit Button -->
              <button class="btn btn-warning me-2">
                Edit
              </button>

              <!-- Delete Button -->
              <button class="btn btn-danger">
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="createPostModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="createPostModalLabel"><i class="bi bi-person-plus-fill me-2"></i>Create Post
            </h5>
            <button type="button" class="btn-close" id="closeCreateModalBtn" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createPost">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input v-model="newPost.title" type="text" class="form-control" id="title"
                  placeholder="Enter Post title" required />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea class="form-control" id="content" v-model="newPost.content" rows="5" required></textarea>
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

  </div>
</template>


<script>
export default {
  data() {
    return {
      posts: [],
      // newPost: { title: "", content: "", uploader: "" },
      newPost: { title: "", content: "" },
      currentPost: { id: null, title: "", content: "", uploader: "" },
      authToken: this.$authToken,
      apiKey: this.$apiKey,
    };
  },

  methods: {
    showNotifi(title, text, icon) {
      this.$swal.fire(title, text, icon);
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },
    fetchPosts() {
      // Retrieve posts from API
      this.$axios
        .get("http://localhost:8001/api/posts", {
          headers: {
            "x-api-key": `${this.apiKey}`,
            Authorization: `Bearer ${this.authToken}`,
          },
        })
        .then((response) => {
          this.posts = response.data.data;
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error);
          this.showNotifi("Error", "Failed to fetch posts", "error");
        });
    },
    createPost() {
      this.$axios
        .post("http://localhost:8001/api/posts", this.newPost, {
          headers: {
            'x-api-key': `${this.apiKey}`,
            'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
          }
        })
        .then((response) => {
          const closeCreateModalBtn = document.getElementById(
            "closeCreateModalBtn"
          );

          this.posts.push(response.data.data);

          this.newPost.title = "";
          this.newPost.content = "";
          // this.newPost.uploader = "";

          closeCreateModalBtn.click();

          this.showNotifi("success", response.data.message, "success");
        })
        .catch((error) => {
          console.log(error);

          this.showNotifi("Error", "Faild to create Post", "error");
        });
    },

  },

  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
/* Style the card */
.card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Hover effect */
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Style the "Read More" button */
.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
