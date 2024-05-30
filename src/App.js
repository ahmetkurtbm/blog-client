import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const createPost = () => {
    axios
      .post("/api/posts", { title, content })
      .then((res) => {
        setPosts([...posts, res.data]);
        setTitle("");
        setContent("");
      })
      .catch((err) => console.error(err));
  };

  const deletePost = (postId) => {
    axios
      .delete(`/api/posts/${postId}`)
      .then((res) => {
        setPosts(posts.filter((post) => post._id !== postId));
      })
      .catch((err) => console.error(err));
  };

  /*const updatePostScreen = (postId) => {
    axios
      .get(`/api/posts/${postId}`)
      .then((res) => {
        const post = res.data;
        const [updatedTitle, setUpdatedTitle] = useState(post.title);
        const [updatedContent, setUpdatedContent] = useState(post.content);

        const handleUpdate = () => {
          axios
            .put(`/api/posts/${postId}`, {
              title: updatedTitle,
              content: updatedContent,
            })
            .then(() => {
              alert("Post updated successfully!");
              // İsterseniz güncelleme yapıldıktan sonra bir yönlendirme yapabilirsiniz.
            })
            .catch((err) => console.error(err));
        };

        // Güncelleme işlemi için bir form oluşturulur
        const updateForm = (
          <div>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            ></textarea>
            <button onClick={handleUpdate}>Update</button>
          </div>
        );

        // Güncelleme formu ekranın altına yerleştirilir
        return <div>{updateForm}</div>;
      })
      .catch((err) => console.error(err));
  };*/

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Blog Posts</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            flex: 1,
            marginRight: "10px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minHeight: "100px",
          }}
        ></textarea>
      </div>
      <button
        onClick={createPost}
        style={{
          marginRight: "10px",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Create Post
      </button>
      <ul style={{ marginTop: "20px", padding: "0", listStyleType: "none" }}>
        {posts.map((post) => (
          <li
            key={post._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2
                style={{
                  color: "#333",
                  fontSize: "1.5em",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                {post.title}
              </h2>
              <div>
                <button
                  onClick={() => deletePost(post._id)}
                  style={{
                    marginRight: "10px",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <div>
                  <button
                    //onClick={() => updatePostScreen(post._id)}
                    style={{
                      marginRight: "10px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "lightgreen",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            <p style={{ color: "#666", marginBottom: "0" }}>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
