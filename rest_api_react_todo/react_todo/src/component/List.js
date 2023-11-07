import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import NotifyModal from "./NotifyModal";
import EditModal from './EditModal';

const List = (props) =>{

    const [modalOn, setModalOn] = useState(false);
    const [notifyModalOn, setNotifyModalOn] = useState(false);
    const [editModalOn, setEditModalOn] = useState(false);

    return (
        <div className="mb-5">
            {/* Display data */}
            <div className="bg-gray-100 rounded p-4 mb-2">
                <div className="flex items-center">
                    <h3 className="text-lg font-bold mr-2">{props.item.title}</h3>
                    <div className="flex items-center ml-auto">
                    <button className="mr-2">
                        <FaEdit onClick={() => setEditModalOn(true)}/>
                    </button>
                    <button onClick={() => setModalOn(true)}>
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
            <p className="text-gray-600">{props.item.description}</p>
        </div>

        {modalOn && <DeleteModal onModalOn={setModalOn} onNotifyModalOn={setNotifyModalOn} id={props.item.id} />}
        {notifyModalOn && <NotifyModal id={props.item.id} title={props.item.title} onNotifyModalOn={setNotifyModalOn} />}
        {editModalOn && <EditModal id={props.item.id} onEditModalOn={setEditModalOn} />}

        </div>
    );

}

export default List;