document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts");
    let page = 1; // Start from page 1

    // Function to fetch posts
    const fetchPosts = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`);
            const posts = await response.json();

            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("post");
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                postsContainer.appendChild(postElement);
            });

            page++; // Increase page number after loading
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Function to check if user scrolled to the bottom
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            fetchPosts();
        }
    };

    // Event listener for scroll event
    window.addEventListener("scroll", handleScroll);

    // Initial fetch of posts
    fetchPosts();
});
