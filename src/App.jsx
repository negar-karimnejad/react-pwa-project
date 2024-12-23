import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [isShowModel, setIsShowModel] = useState(false);
  const [courses, setCourses] = useState([]);

  const showAddCourseModal = (event) => {
    event.preventDefault();
    setIsShowModel(true);
  };

  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch("https://pwa-cms.iran.liara.run/api/courses/");
      const data = await res.json();

      setCourses(data);
    };

    getCourses();
  }, []);

  const newCourse = {
    title,
  };

  if ("serviceWorker" in navigator && SyncManager in window) {
    navigator.serviceWorker.ready.then((sw) => {
      return sw.sync
        .register("add-course")
        .then(() => {
          setIsShowModel(false);
          console.log("Task added successfully");
        })
        .catch((err) => console.log("Error=>", err));
    });
  }


  return (
    <>
      {/* --------------------------------- modal --------------------------------*/}

      {/* add new course modal */}
      {/* ! add visible class to be visible !  */}
      <div
        className={`modal-container ${isShowModel ? "visible" : ""}`}
        id="add-new-course-modal"
      >
        <div className="modal-content">
          {/* ! Edit Course  !  */}
          <h1 className="modal-title">اضافه کردن دوره جدید</h1>
          <form action="" className="edit-user-form">
            <div className="input-field">
              <span>
                <i className="fa fa-tag"></i>
              </span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="new-course-title"
                placeholder="نام دوره"
                spellCheck="false"
              />
            </div>

            <button
              type="submit"
              onClick={addCourse}
              className="add-course-btn update-btn btn"
            >
              ایجاد دوره
            </button>
          </form>
        </div>
      </div>
      {/* --------------------------------End modal --------------------------------  */}

      <div className="container">
        {/* Sidebar  */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <img src="/images/logo/logo.webp" alt="" />
            <h3>سبزلرن</h3>
          </div>
          <ul className="sidebar-links">
            <li>
              <a href="#" className="active sidebar-link">
                {/* add active to enable link  */}
                <span>
                  <i className="fa fa-home"></i>
                </span>
                صفحه اصلی
              </a>
            </li>
            <li>
              <a href="#" className="sidebar-link">
                <span>
                  <i className="fa fa-tag"></i>
                </span>
                دوره‌ها
              </a>
            </li>
            <li>
              <a href="#" className="sidebar-link">
                <span>
                  <i className="fa fa-book-bookmark"></i>
                </span>
                درباره ما
              </a>
            </li>
          </ul>
          <div className="sidebar-logout">
            <a href="#" className="logout">
              <span>
                <i className="fa fa-lock"></i>
              </span>
              خروج
            </a>
          </div>
        </aside>
        {/* End Sidebar */}

        <main className="main">
          {/* Navbar */}
          <nav className="navbar">
            <div className="navbar-search">
              <input type="text" name="" id="" placeholder="جستجو کنید...." />
              <span className="navbar-search-icon">
                <i className="fa fa-search"></i>
              </span>
            </div>
            <div className="navbar-user-avatar">
              <img src="/images/avatar/avatar.png" alt="" />
            </div>
          </nav>
          {/* End Navbar  */}

          {/* Courses  */}
          <section className="courses">
            <div className="courses-top">
              <h2 className="courses-title">دوره ها</h2>
              <a
                onClick={showAddCourseModal}
                className="btn courses-btn-add-new-course"
              >
                اضافه کردن دوره جدید
              </a>
            </div>

            {/* Courses List  */}
            <ul className="courses-list">
              {courses.map((course) => (
                <li key={course.id} className="courses-item">
                  <div className="courses-img-title">
                    <img
                      src="/images/courses/PWA.jpg"
                      alt=""
                      className="courses-img"
                    />
                    <h5 className="courses-name">{course.title}</h5>
                  </div>
                  <div className="courses-btns">
                    <a href="" className="courses-btn-edit btn">
                      ویرایش
                    </a>
                    <a href="" className="courses-btn-delete btn">
                      حذف
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            {/* Courses List  */}
          </section>
          {/* End Courses  */}
        </main>
      </div>
    </>
  );
}

export default App;
