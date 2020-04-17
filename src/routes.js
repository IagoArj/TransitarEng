import React from "react";
import{BrowserRouter,Route,Switch} from "react-router-dom"
import Login from "./components/Login";
import Home from "./components/Home";


const Routes = ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={()=><Login></Login>}/>
            <Route exact path="/home" component={()=><Home></Home>}/>
        </Switch>
    </BrowserRouter>
)
export default Routes;