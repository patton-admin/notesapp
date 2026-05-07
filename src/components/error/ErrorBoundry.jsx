import React from "react";
import { history } from "./../../routers/AppRouters";

class ErrBoundry extends React.Component {
    state = {
        errorMessage: "",
    };

    static getDerivedStateFromError(error) {
        console.log("From Error Boundry...", error);
        return { errorMessage: error.toString() };
    }
    componentDidCatch(error, info) {
        this.logErrorToServices(error.toString(), info.componentStack);
        console.log("From Error Boundry...", error);
        console.log("From Error Boundry...", info);
        // history.push("/");
    }

    navigate = () => {
        history.push("/home");
    };
    // A fake logging service 😬
    logErrorToServices = console.log;
    render() {
        if (this.state.errorMessage) {
            return (
                <div>
                    <a onClick={this.navigate}>
                        Please Click here to navigage back to app 😬 Sorry
                    </a>
                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export { ErrBoundry as default };
