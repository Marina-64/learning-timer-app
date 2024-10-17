import React from "react";

const RecordCard = () => {
    return(
        <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">title</h2>
            <p>time</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">edit</button>
            </div>
        </div>
        </div>
    )
}

export default RecordCard;