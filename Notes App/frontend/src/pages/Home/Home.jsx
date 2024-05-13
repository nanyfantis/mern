/* import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Navbar/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8 '>
          <NoteCard
            title='Meeting on 10th of November'
            date='4 Nov 2024'
            content='Meeting on 10th of November'
            tags='#meeting'
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-800 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}>
        <MdAdd className='text-[32px] text-white' />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=''
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'>
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.noteData}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
 */

/* import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer, toast } from 'react-toastify'


const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  
  const handleEdit = (noteDetails) => {
    if (noteDetails && noteDetails._id) {
      setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    } else {
      // Handle invalid noteDetails
      console.error("Invalid note details:", noteDetails);
    }
  };
  ;

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An error occurred. Please try again");
    }
  };

  //Delete Note
  const deleteNote = async (noteId) => {
    try {
      // Send a DELETE request to the server to delete the note
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && response.data.success) {
        // If the note is successfully deleted, display a success toast
        toast.success('Note deleted successfully');
        // Fetch all notes again to update the UI
        getAllNotes();
      } else {
        // If the server responds with an error message, display it as a toast
        toast.error(response.data.message || 'Failed to delete note');
      }
    } catch (error) {
      // If an error occurs during the deletion process, display an error toast
      toast.error('An error occurred while deleting the note');
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      {userInfo && <Navbar userInfo={userInfo} />}
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8 '>
          {allNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={deleteNote()}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>
      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-800 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}>
        <MdAdd className='text-[32px] text-white' />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=''
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'>
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data} // Use openAddEditModal.data instead of openAddEditModal.noteData
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
 */

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  // Update isPinned
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: noteId.isPinned,
        }
      );
      if (response.data && response.data.note) {
        toast.success("Note edited successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce, // Correct way to pass the transition component
        });
        getAllNotes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Search
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: {
          query,
        },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("No matches found");
    }
  };

  //Delete note
  const deleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/delete-note/${noteId}`);
      setAllNotes(allNotes.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to delete note", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleEdit = (noteDetails) => {
    if (noteDetails && noteDetails._id) {
      setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    } else {
      console.error("Invalid note details:", noteDetails);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An error occurred. Please try again");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      {userInfo && (
        <Navbar
          userInfo={userInfo}
          onSearchNote={onSearchNote}
          className='mb-8'
        />
      )}{" "}
      {/* Add margin bottom */}
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8 '>
          {isSearch && allNotes.length === 0 ? (
            <div className='empty-card bg-gray-100 border rounded p-4 text-center'>
              {" "}
              {/* Add Tailwind CSS classes */}
              <p className='text-gray-600 '>No matches found.</p>
            </div>
          ) : allNotes.length === 0 ? (
            <div className='empty-card bg-gray-100 border rounded p-4 text-center'>
              {" "}
              {/* Add Tailwind CSS classes */}
              <p className='text-gray-600 '>No notes available.</p>
              <p className='text-gray-600'>Press the + to create one.</p>
            </div>
          ) : (
            allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item._id)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))
          )}
        </div>
      </div>
      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-800 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}>
        <MdAdd className='text-[32px] text-white' />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=''
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'>
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
