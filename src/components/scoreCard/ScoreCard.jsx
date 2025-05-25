import {CircularProgress} from "@mui/material";
import ScoreCardDetails from "./ScoreCardDetails.jsx";

export const ScoreCardPage = ({ state, user, role}) => (
    <div className="api-data">
        {state.loading && state.recruiter.length < 0 ? <CircularProgress/> : <div>
            <ScoreCardDetails recruiter={state.recruiter} user={user} role={role}/>
        </div>}
    </div>
);