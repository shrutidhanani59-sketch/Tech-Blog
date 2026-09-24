import { useState } from 'react';
import './App.css'

function App() {

  const [blog, setBlog] = useState([]);

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const API = "http://localhost:3000/blog";

  fetch(API, {
    method: "Get",
    headers: { "content-type": "application/json" }
  }).then((response) => {
    response.json().then((data) => {
      setBlog(data);
    })
  })

  const handleclick = (e) => {
    
    const add = { title, img, author, description, date };
   fetch(API, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(add)
});
  }

  const deletbtn = (id)=>{
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })

  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        <form className="card shadow p-4 rounded-4" style={{ width: "450px" }}>

          <h2 className="text-center fw-bold mb-4"> Add Tech Blog </h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">  Title </label>
            <input type="text" className="form-control" placeholder="Enter Title" onChange={(e) => { setTitle(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">  Img </label>
            <input type="text" className="form-control" placeholder="Enter Img URL" onChange={(e) => { setImg(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">  Author </label>
            <input type="text" className="form-control" placeholder="Enter Author Name" onChange={(e) => { setAuthor(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold"> Description</label>
            <textarea className="form-control" placeholder="Enter Description" rows="3" onChange={(e) => { setDescription(e.target.value) }}></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">  Date </label>
            <input type="date" className="form-control" onChange={(e) => { setDate(e.target.value) }} />
          </div>

          <button className="btn btn-primary w-100" onClick={handleclick}>  Add Blog </button>

        </form>

      </div>


      <div className="container py-5 ">

        <h1 className="text-center fw-bold mb-5">
          Tech Blogs
        </h1>

        <div className="row g-4">
          {blog.map((blog) => {
            return (
              <div className="col-md-4 " key={blog.id}>

                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden" >
                  <h2 className="card-title fs-4 fw-bold p-4 pb-2 mb-0">
                    {blog.title}
                  </h2>
                  <img
                    src={blog.img}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover", padding: "15px" }}
                    alt="AI"
                  />
                  <div className="card-body p-4">

                    <h3 className="fs-6 text-black">
                      {blog.author}
                    </h3>
                    <p className="card-text ">
                      {blog.description}
                    </p>
                    <p className="mb-0">
                      Date: {blog.date}
                    </p>
                    <div className="d-flex gap-2 mt-3">

                      <button className="btn btn-danger" onClick={() => deletbtn(blog.id)}>
                        Delete
                      </button>

                      <button className="btn btn-warning">
                        Update
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            )
          })}


        </div>

      </div>
    </>
  );
}

export default App;