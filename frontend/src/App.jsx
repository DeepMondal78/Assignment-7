import axios from "axios";
import { useEffect, useState } from "react";
import TodoApp from "./components/TodoApp";
import DisplayData from "./components/DisplayData";
import toast from "react-hot-toast";
import Searching from "./components/Searching";
import EditTodo from "./components/EditTodo";
import DeleteModel from "./components/DeleteModel";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editData, setEditData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [searchTask, setSearchTask] = useState("");
  const [deletemodel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const api = "http://localhost:3000";

  // Fetch all tasks
  const fetchNotesData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/task`);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle create popup
  const tooglecreateNote = () => {
    setCreateTask(!createTask);
  };

  // Add Task
  const postdata = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required!");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${api}/task`, {
        title,
        content,
      });

      toast.success("Task added successfully!");
      setTitle("");
      setContent("");
      setCreateTask(false);
      fetchNotesData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Delete popup
  const handelDeletepopUp = (id) => {
    setDeleteId(id);
    setDeleteModel(!deletemodel);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${api}/task/${deleteId}`);
      toast.success("Task deleted successfully");
      setDeleteModel(false);
      fetchNotesData();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const updateData = async (id) => {
    try {
      const res = await axios.get(`${api}/task/${id}`);
      setEditData(res.data.data);
      setEditModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotesData();
  }, []);

  return (
    <main>
      <section className="bg-gray-100 p-6 relative min-h-screen overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl capitalize">
            Task List App
          </h1>
          <button
            onClick={tooglecreateNote}
            className="px-4 py-2 bg-green-500 text-white rounded-2xl"
          >
            Add New Task
          </button>
        </div>

        <Searching
          searchTask={searchTask}
          setSearchTask={setSearchTask}
        />

        {createTask && (
          <TodoApp
            loading={loading}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            postdata={postdata}
            tooglecreateNote={tooglecreateNote}
          />
        )}

        {deletemodel && (
          <DeleteModel
            loading={loading}
            confirmDelete={confirmDelete}
            handelDeletepopUp={handelDeletepopUp}
          />
        )}

        {editModal && (
          <EditTodo
            editData={editData}
            fetchNotesData={fetchNotesData}
            setEditModal={setEditModal}
          />
        )}

        <DisplayData
          loading={loading}
          tasks={tasks}
          deleteData={handelDeletepopUp}
          updateData={updateData}
        />
      </section>
    </main>
  );
}