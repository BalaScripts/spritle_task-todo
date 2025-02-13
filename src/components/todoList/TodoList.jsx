import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, Toaster } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button, Card, IconButton, Tooltip } from "@mui/material";
import "tailwindcss/tailwind.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import RestoreIcon from '@mui/icons-material/Restore';
import todo from '../../assets/images/todo.jpg';
import girl from '../../assets/images/girl.png';


function TodoList() {

  const [edit, setEdit] = useState(null);
  const [taskData, setTaskData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("task_data"));
    return storedData || [];
  });

  const [deletedTasks, setDeletedTasks] = useState(() => {
    const storedDeletedTasks = JSON.parse(localStorage.getItem("deleted_tasks"));
    return storedDeletedTasks || [];
  });
  const [taskvalues, setTaskvalues] = useState({
    task_id: "",
    task_name: "",
    task_status: "",
    due_date: "",
  });

  const handleEdit = (task) => setEdit(task);

  const handleUpdate = () => {
    if (!edit.task.trim()) {
      toast.error("Task name cannot be empty.");
      return;
    }
    
    const updatedTasks = taskData.map((task) =>
      task.id === edit.id ? { ...task, task: edit.task } : task
    );
    setTaskData(updatedTasks);
    setEdit(null);
    localStorage.setItem("task_data", JSON.stringify(updatedTasks));
    toast.success("Task updated successfully!");
  };
  

  const handleCancel = () => setEdit(null);

  const handleDelete = (taskId) => {
    const updatedTasks = taskData.filter((task) => task.id !== taskId);
    const taskToDelete = taskData.find((task) => task.id === taskId);
  
    const updatedDeletedTasks = [taskToDelete, ...deletedTasks ];
    setDeletedTasks(updatedDeletedTasks);
    localStorage.setItem("deleted_tasks", JSON.stringify(updatedDeletedTasks));
  
    setTaskData(updatedTasks);
    localStorage.setItem("task_data", JSON.stringify(updatedTasks));
    toast.success("Task deleted successfully!");
  };
  

  const handleRestore = (taskId) => {
    const taskToRestore = deletedTasks.find((task) => task.id === taskId);
  const updatedDeletedTasks = deletedTasks.filter((task) => task.id !== taskId);

  setDeletedTasks(updatedDeletedTasks);
  localStorage.setItem("deleted_tasks", JSON.stringify(updatedDeletedTasks));


  const updatedTasks = [taskToRestore, ...taskData];
  setTaskData(updatedTasks);
  localStorage.setItem("task_data", JSON.stringify(updatedTasks));

  toast.success("Task restored successfully!");
  };

  const handlePermanentDelete = (taskId) => {
    const updatedDeletedTasks = deletedTasks.filter((task) => task.id !== taskId);
  setDeletedTasks(updatedDeletedTasks);
  localStorage.setItem("deleted_tasks", JSON.stringify(updatedDeletedTasks));

  toast.success("Task permanently deleted!");
  };

  const taskhandleChange = (e) =>
    setTaskvalues({ ...taskvalues, task_name: e.target.value });

  const statushandleChange = (e) =>
    setTaskvalues({ ...taskvalues, task_status: e.target.value });

  const SaveTaskData = () => {
    if (!taskvalues.task_name.trim()) {
      toast.error("Task name cannot be empty.");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: taskvalues.task_name,
      status: taskvalues.task_status,
      due_date: formattedDate,
      completed: false,
    };

    const saveData = [newTask, ...taskData];
    setTaskData(saveData);
    localStorage.setItem("task_data", JSON.stringify(saveData));
    toast.success("Task added successfully!");
    refreshTask();
  };

  const refreshTask = () => {
    setTaskvalues({
      task_id: "",
      task_name: "",
      task_status: "",
      due_date: "",
    });
  };

  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;


  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(taskData);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);


    const orderedItems = items.sort((a, b) => {
      if (a.status === "Completed" && b.status !== "Completed") return 1;
      if (a.status !== "Completed" && b.status === "Completed") return -1;
      return 0;
    });

    setTaskData(orderedItems);
  };

  useEffect(() => {
    localStorage.setItem("task_data", JSON.stringify(taskData));
    localStorage.setItem("deleted_tasks", JSON.stringify(deletedTasks));
  }, [taskData, deletedTasks]);


  return (
    <>
        <Toaster position="bottom-right" />

      <div className="!bg-red-50 !flex  flex-wrap ">

       {/* LEFT SIDE DIV START*/}
          <div className="hidden sm:block md:block lg:block border !w-full sm:!w-[100%] md:!w-[20%] lg:!w-[20%] !sticky !top-0 !overflow-y-auto !scrollbar-none !h-[100vh]">
           <div className="bg-[red] !fixed  hidden sm:block md:hidden lg:block"><img src={todo} className='!w-[300px] !h-[100px]' /></div> 
            <img src={girl} className='fixed !ml-[140px] mt-[200px] h-[300px] !z-50 hidden sm:block md:hidden lg:block' />
          </div>
    {/* LEFT SIDE DIV END*/}

       {/* MAIN DIV START*/}

        <div className="!p-2 !w-full sm:!w-[100%] md:!w-[60%] lg:!w-[60%] !mb-4 !overflow-y-auto !scrollbar-none">

          <div className=" !rounded-3xl flex flex-col gap-4">

            <div className="!flex flex-wrap gap-4 justify-center">
        
              <Card className="!bg-[#891652] !flex flex-col items-center gap-3 !w-full !p-5 !rounded-3xl">
                <div className="w-full flex flex-col items-center">
                  <Form.Label className="text-xl text-white font-bold">ADD YOUR TASK</Form.Label>
                  <Form.Control
                    placeholder="Task Name"
                    value={taskvalues.task_name}
                    onChange={taskhandleChange}
                    className="!w-[80%]"
                  />
                </div>
                <Form.Select
                  hidden
                  value={taskvalues.task_status}
                  onChange={statushandleChange}
                  className="!w-[80%]"
                >
                  <option value="">Select Status</option>
                  <option value="toDo">To Do</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
                <div className="!flex flex-wrap gap-4 justify-center">
                  <Button
                    
                    className="!w-[125px] !bg-green-500 !font-bold"
                    size="small"
                    onClick={SaveTaskData}
                    variant="contained"
                  >
                    ADD
                  </Button>
                  <Button
                    
                    className="!w-[125px] !bg-orange-500 !font-bold"
                    size="small"
                    onClick={refreshTask}
                    variant="contained"
                  >
                    RESET
                  </Button>
                </div>
              </Card>
            </div>

            <div className="!w-full ">
              <Card className="!rounded-3xl !border border-[#891652]">
                <div className="flex justify-around !bg-[#891652] !p-6 text-white !font-bold text-lg">
                  <div className="">Task Name</div>
                  <div className="">Date</div>
                  <div>Action</div>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="!pl-0 !bg-red-50"
                      >
                        {taskData.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <li
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className={`!text-sm !text-gray-600 !font-medium !text-wrap !capitalize !truncate hover:!bg-red-100 !flex justify-around items-center mt-2   
                            ${
                              task.status === "Completed"
                                ? "!bg-green-100 !text-green-500  !line-through"
                                : ""
                            } ${snapshot.isDragging ? "!bg-red-300" : ""}`}
                                >
                                  <div className="flex gap-2 items-center justify-start">
                                   <Tooltip arrow title='complete'><input
                                    className="!cursor-pointer"
                                      type="checkbox"
                                      checked={task.status === "Completed"}
                                      onChange={() =>
                                        setTaskData((prevTasks) =>
                                          prevTasks.map((t) =>
                                            t.id === task.id
                                              ? {
                                                  ...t,
                                                  status:
                                                    t.status === "Completed"
                                                      ? t.initialStatus ||
                                                        "ToDo"
                                                      : "Completed",
                                                  initialStatus:
                                                    t.initialStatus || t.status,
                                                }
                                              : t
                                          )
                                        )
                                      }
                                    /></Tooltip> 
                                    <span
                                      className={
                                        task.status === "Completed"
                                          ? "!line-through !text-gray-500 font-medium"
                                          : ""
                                      }
                                    >
                                      {edit && edit.id === task.id ? (
                              <Form.Control
                                value={edit.task}
                                onChange={(e) =>
                                  setEdit({ ...edit, task: e.target.value })
                                }
                                className="flex-1"
                              />
                            ) : (
                              <span
                                className={task.completed ? "line-through" : ""}
                              >
                                {task.task}
                              </span>
                            )}
                                    </span>
                                  </div>

                                  <div className="!flex justify-center items-center">
                               
                                  </div>

                                  <div>{task.due_date}</div>

                                  <div className="flex gap-2">
                                    {edit && edit.id === task.id ? (
                                      <>
                                        <Tooltip arrow title="Update">
                                          <IconButton onClick={handleUpdate}>
                                            <SaveIcon color="success" />
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow title="Close">
                                          <IconButton onClick={handleCancel}>
                                            <CloseIcon color="warning" />
                                          </IconButton>
                                        </Tooltip>
                                      </>
                                    ) : (
                                      <Tooltip arrow title="Edit">
                                        <IconButton
                                          onClick={() => handleEdit(task)}
                                        >
                                          <EditIcon color="primary" />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                    <Tooltip arrow title="Delete">
                                      <IconButton
                                        onClick={() => handleDelete(task.id)}
                                      >
                                        <DeleteIcon color="error" />
                                      </IconButton>
                                    </Tooltip>

                                    <Tooltip arrow title="Drag">
                                      {" "}
                                      <IconButton>
                                        <DragHandleIcon color="action" />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
               
              </Card>
            </div>
          </div>
        </div>
 {/* MAIN DIV END*/}


        {/* RIGHT SIDE DIV START*/}
        <div className="border !w-full sm:!w-[100%] md:!w-[20%] lg:!w-[20%] !sticky !top-0 !overflow-y-auto !scrollbar-none !h-[100vh]">
        <div className="!bg-[#CD1818] hidden sm:block md:block lg:block !w-[20%] !p-4 !font-bold text-center !text-white !fixed z-10">Deleted Tasks</div>
        <div className="mt-16">
            {deletedTasks.map((task) => (
              <div
                key={task.id}
                className="!bg-gray-900 !opacity-50 !capitalize !text-sm !p-2 !my-2 !text-white !font-medium !rounded-lg"
              >
               <div className="flex gap-2 flex-wrap justify-center"><div>{task.task}</div> <div>{task.due_date}</div></div>
                <div className="flex gap-2 justify-center">
                 <Tooltip arrow title='Restore'><IconButton
                   className="!text-green-500"
                    size="small"
                    onClick={() => handleRestore(task.id)}
                  >
                    <RestoreIcon/>
                  </IconButton></Tooltip> 
                  <Tooltip arrow title='Delete Permanantly'><IconButton
                    className="!text-[red]"
                    size="small"
                    onClick={() => handlePermanentDelete(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton></Tooltip>
                </div>
              </div>
            ))}
            </div>
          </div>
           {/* RIGHT SIDE DIV END*/}
      </div>
    </>
  );
}

export default TodoList;
