import React from "react";
import { CircularProgress, useThemeProps } from "@mui/material";
import theme from "../../../Components/Generic/Theme";
import { ThemeProvider } from "@mui/system";

const MessageBar = (props) => {
    return (
        <div className="messages">
            <p className="messageTitle">{props.message}</p>
            <ThemeProvider theme={theme}>
                {props.loading === true ? <CircularProgress color="primary" size={"15px"} /> : <></>}
            </ThemeProvider>
        </div>
    )
}

export default MessageBar;