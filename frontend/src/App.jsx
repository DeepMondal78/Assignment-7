import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import TodoApp from "./components/TodoApp";
import DisplayData from "./components/DisplayData";
import toast from "react-hot-toast";
import Searching from "./components/Searching";
import EditTodo from "./components/EditTodo";
import DeleteModel from "./components/DeleteModel";

export default function App() {
  const [loading, setLoading] = useState(false)
  const [searchloading, setSearchLoading] = useState(false)
  const [createTask, setCreateTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editData, setEditData] = useState(null)
  const [editModal, setEditModal] = useState(false);
  const [searchTask, setSearchTask] = useState("");
  const [deletemodel, setDeleteModel] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const api = import.meta.env.VITE_BACKEND_URL;
  // delete
  const handelDeletepopUp = () => {
    setDeleteModel(!deletemodel)
  }
  const fetchNotesData = async () => {
    setLoading(true)
    try {
      let taskData = await fetch(`${api}/task`);
      let res = await taskData.json();
      setLoading(false)
      setTasks(res.tasks)
    } catch (error) {
      console.log("error", error);
    }


  }
  const tooglecreateNote = () => {
    setCreateTask(!createTask)
  }

  const tooglepoupu = () => {
    setEditModal(!editModal)
  }
  // post data logic here
  const postdata = async (e) => {
    e.preventDefault()
    const createTask = {
      title,
      content
    };
    if (!title) {
      toast.error(" this filled is required !")
      return
    }
    setLoading(true)
    try {
      const data = await axios.post(`${api}/task`, createTask);
      toast.success("Task add sucessfully !")
      setCreateTask(false);
      fetchNotesData()
      setContent('');
      setTitle('')
      setLoading(false)
    } catch (error) {
      console.log("error", error);
    }
  }
  // delete logic here...
  const deleteData = async (id) => {
    setDeleteId(id);
    setDeleteModel(true)
  }

  const confirmDelete = async () => {
    setLoading(true)
    try {
      await axios.delete(`${api}/task/${deleteId}`)
      toast.success("Task delete successfully")
      handelDeletepopUp()
      fetchNotesData()
      setLoading(false)
    } catch (error) {
      toast.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  // update logic here
  const updateData = async (id) => {
    let notes = await axios.get(`${api}/task/${id}`);
    let res = await notes.data.data;
    tooglepoupu()
    setEditData(res);
  }

  // complete task logic here
  const markCompleteTask = async (id) => {
    console.log("id", id);

  };
  // hanleonchange
  const handleOnChange = (e) => {
    setSearchTask(e.target.value);
  }
  const handleSearch = () => {
    const filterTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTask.toLocaleLowerCase()))
    setTasks(filterTasks)
  }

  useEffect(() => {
    fetchNotesData();
  }, [])

  return (
    <>
      <main>
        <section className=" bg-gray-100 p-6 relative min-h-screen  overflow-hidden">
          <div className="flex items-center justify-between">
            <h1 className='font-semibold  text-2xl capitalize'>task List app</h1>
            <button onClick={tooglecreateNote} className='px-4 py-2 bg-green-500 mb-3.5 text-white rounded-2xl capitalize cursor-pointer'>
              Add New Task
            </button>
          </div>
          <Searching handleOnChange={handleOnChange} searchTask={searchTask} handleTask={handleSearch} setSearchTask={setSearchTask} />
          <div className={`absolute w-full h-full cursor-pointer  ${createTask ? "top-1/2" : "top-[-60%]"} left-1/2 transform  -translate-x-1/2 -translate-y-1/2 duration-150 transition-all`}>
            <div className="overly w-full h-full absolute z-10"></div>
            <div className="relative z-50">
              <TodoApp loading={loading} title={title} setTitle={setTitle} content={content} setContent={setContent} postdata={postdata} tooglecreateNote={tooglecreateNote} />
            </div>
          </div>

          <div className={` w-full h-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  duration-150 ${deletemodel ? "scale-[1.2]" : "scale-0"} `}>
            <DeleteModel loading={loading} confirmDelete={confirmDelete} handelDeletepopUp={handelDeletepopUp} />
          </div>

          <div className={`absolute w-full h-full    ${editModal ? "top-1/2" : "top-[-60%]"} left-1/2 transform  -translate-x-1/2 -translate-y-1/2 duration-150 transition-all`}>
            <div className="overly w-full h-full absolute z-10"></div>
            <div className="relative z-50">
              <EditTodo tooglepoupu={tooglepoupu} editData={editData} fetchNotesData={fetchNotesData} />
            </div>
          </div>
          <DisplayData loading={loading} searchloading={searchloading} markCompleteTask={markCompleteTask} tasks={tasks} deleteData={deleteData} updateData={updateData} />
        </section>
      </main>
    </>
  );
}
