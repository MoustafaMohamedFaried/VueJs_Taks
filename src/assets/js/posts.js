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
    deletePost(postId) {
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
            .delete(`http://localhost:8001/api/posts/${postId}`, {
              headers: {
                'x-api-key': `${this.apiKey}`,
                'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
              }
            })
            .then(() => {
              this.fetchPosts(); // Refresh the Posts list

              this.showNotifi(
                "Deleted!",
                "The Post has been deleted.",
                "success"
              );
            })
            .catch((error) => {
              console.log(error);

              this.showNotifi("Error", "Faild to deleting this Post", "error");
            });
        }
      });
    },
    // showPost(postId) {
    //   this.$axios
    //     .get(`http://localhost:8001/api/posts/${postId}`, {
    //       headers: {
    //         'x-api-key': `${this.apiKey}`,
    //         'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
    //       }
    //     })
    //     .then((response) => {
    //       this.currentPost = response.data.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);

    //       this.showNotifi("Error", "Faild to displaying this Post", "error");
    //     });
    // },
    // updatePost() {
    //   this.$axios
    //     .put(
    //       `http://localhost:8001/api/posts/${this.currentPost.id}`,
    //       this.currentPost, {
    //       headers: {
    //         'x-api-key': `${this.apiKey}`,
    //         'Authorization': `Bearer ${this.authToken}` // Use the token dynamically
    //       }
    //     })
    //     .then((response) => {
    //       // Update the Post in the local list after successful update
    //       const PostIndex = this.Posts.findIndex(
    //         (Post) => Post.id === this.currentPost.id
    //       );
    //       if (PostIndex !== -1) {
    //         this.Posts[PostIndex] = { ...this.currentPost };
    //       }

    //       // Close the modal
    //       const closeEditModalBtn =
    //         document.getElementById("closeEditModalBtn");
    //       closeEditModalBtn.click();

    //       // Show success notification
    //       this.showNotifi("Success", response.data.message, "success");
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       this.showNotifi("Error", "Failed to update Post", "error");
    //     });
    // },

  },

  mounted() {
    this.fetchPosts();
  },
};