import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type TaskType = {
  taskId: string;
  userId: string;
  content: string;
};

export default () => {
  // Authenticate the user
  const navigate = useNavigate();
  const title = document.cookie.split("=")[0];
  const token = document.cookie.split("=")[1];
  const [needsReloading, setReload] = React.useState(false);

  axios.interceptors.request.use((req) => {
    req.headers.authorization = `Bearer ${token}`;
    return req;
  });

  const [tasks, setTasks] = React.useState<TaskType[]>([]);
  const [taskToBeAdded, setTaskToBeAdded] = React.useState("");

  useEffect(() => {
    if (title !== "token" || !token) navigate("/login");
    getTasks();
    setReload(false);
  }, [needsReloading]);

  return (
    <>
      <div className="w-screen h-screen flex justify-center pt-36">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Task Input */}
            <form className="flex" onSubmit={(e) => addTask(e)}>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter a task"
                value={taskToBeAdded}
                onChange={(e) => setTaskToBeAdded(e.target.value)}
              />
              <button className="ml-2 w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add
              </button>
            </form>

            {/* Task Display */}
            {tasks.map((task) => {
              return (
                <div
                  key={task.taskId}
                  className="flex justify-between shadow appearance-none border rounded mt-5 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <div className="flex items-center">{task.content} </div>
                  <div className="flex items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-10"
                      onClick={(e) => deleteTask(e, task.taskId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  async function getTasks() {
    const res = await axios.get("/api/tasks/getTasks");
    setTasks(res.data);
  }

  async function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await axios.post("/api/tasks/addTask", {
      content: taskToBeAdded,
    });

    if (res.data.error) alert(res.data.error);
    setTaskToBeAdded("");
    setReload(true);
  }

  async function deleteTask(
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: string
  ) {
    e.preventDefault();
    const res = await axios.post("/api/tasks/deleteTask", { taskId });

    if (res.data.error) alert(res.data.error);
    setReload(true);
  }
};
