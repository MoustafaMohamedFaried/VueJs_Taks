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