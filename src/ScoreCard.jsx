import {CircularProgress} from "@mui/material";
import DataGridComponent from "./DataGridComponent.jsx";

export const ScoreCardPage = ({ state, user}) => (
    <div className="api-data">
        {state.loading && state.recruiter.length < 0 ? <CircularProgress/> : <div>
            <DataGridComponent recruiter={state.recruiter} user={user}/>
        </div>}
    </div>
);