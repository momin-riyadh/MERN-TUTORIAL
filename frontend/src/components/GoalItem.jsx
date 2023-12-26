import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteGoal, updateGoal} from "../features/goals/goalSlice"

function GoalItem({goal}) {
    const dispatch = useDispatch();
    const [updatedText, setUpdatedText] = useState(goal.text);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const handleUpdateClick = () => {
        setIsUpdateMode(true);
    };

    const handleApplyUpdateClick = () => {
        if (updatedText.trim() !== '') {
            dispatch(updateGoal({id: goal._id, text: updatedText}));
            setUpdatedText('');
        }
    };

    return (
        <div className="goal">
            <small>{new Date(goal.createdAt).toLocaleString('en-US')}</small>
            <h2>{updatedText}</h2>
            <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
            <button onClick={handleUpdateClick} className="update">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>

            {isUpdateMode && (
                <div>
                    <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        placeholder="Enter updated goal text"
                    />

                    <button onClick={handleApplyUpdateClick} className="apply-update">
                        Apply Update
                    </button>
                </div>
            )}


        </div>
    )
}

export default GoalItem;
