import { useState } from 'react';
import './App.css'

function App() {

  const [blog, setBlog] = useState([]);

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [id, setid] = useState(null);

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

    if (!id) {
      fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(add)
      });
    }else{
       fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(add)
      });
    }

  }

  const deletbtn = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })

  }

  const updatebtn = (edit) => {
    setTitle(edit.title);
    setImg(edit.img);
    setAuthor(edit.author);
    setDescription(edit.description);
    setDate(edit.date);
    setid(edit.id);
  }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        <form className="card shadow p-4 rounded-4" style={{ width: "450px" }}>

          <h2 className="text-center fw-bold mb-4"> {(!id) ? "Add Tech Blog" : "Update Tech Blog"}   </h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">  Title </label>
            <input type="text" value={title} className="form-control" placeholder="Enter Title" onChange={(e) => { setTitle(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">  Img </label>
            <input type="text" value={img} className="form-control" placeholder="Enter Img URL" onChange={(e) => { setImg(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">  Author </label>
            <input type="text" value={author} className="form-control" placeholder="Enter Author Name" onChange={(e) => { setAuthor(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold"> Description</label>
            <textarea value={description} className="form-control" placeholder="Enter Description" rows="3" onChange={(e) => { setDescription(e.target.value) }}></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">  Date </label>
            <input type="date" value={date} className="form-control" onChange={(e) => { setDate(e.target.value) }} />
          </div>

          <button className="btn btn-primary w-100" onClick={handleclick}> {(!id) ? "Add Blog" : "Edit Blog"} </button>

        </form>

      </div>


      <div className="container py-5 ">

        <h1 className="text-center fw-bold mb-5 text-white">
          Tech Blogs
        </h1>

        <div className="row g-4">
          {blog.map((blog) => {
            return (
              <div className="col-md-4 cards" key={blog.id}>

                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden" >
                  <h2 className="card-title fs-4 fw-bold p-4 pb-2 mb-0">
                   Title :  {blog.title}
                  </h2>
                  <img
                    src={blog.img}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover", padding: "15px" }}
                    alt="AI"
                  />
                  <div className="card-body p-4">

                    <h3 className="fs-6 text-black">
                    <span>Author :</span>  {blog.author}
                    </h3>
                    <p className="card-text ">
                    <span>Description :</span>  {blog.description}
                    </p>
                    <p className="mb-0">
                      <span>Date:</span> {blog.date}
                    </p>
                    <div className="d-flex gap-2 mt-3">

                      <button className="btn btn-danger" onClick={() => deletbtn(blog.id)}>
                        Delete
                      </button>

                      <button className="btn btn-warning" onClick={() =>updatebtn(blog)}>
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