import {CircularProgress} from "@mui/material";
import DataGridComponent from "./DataGridComponent.jsx";

export const ScoreCardPage = ({ state, user, role}) => (
    <div className="api-data">
        {state.loading && state.recruiter.length < 0 ? <CircularProgress/> : <div>
            <DataGridComponent recruiter={state.recruiter} user={user} role={role}/>
        </div>}
    </div>
);