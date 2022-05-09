import React from "react"
import ReactDOM from "react-dom"
import "rsuite/dist/rsuite.min.css"
import reportWebVitals from "./reportWebVitals"
import { CustomProvider } from "rsuite"
import Dashboard from "./pages/dashboard"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
        <CustomProvider theme="dark">
            <Dashboard />
        </CustomProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
