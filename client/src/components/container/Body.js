import {Route, Switch} from "react-router-dom";
import Home from '../pages/Home';
import Insert from '../pages/Insert';

export default function Body(){
    return(
        <div id="body">
            <Switch>
                <Route exact ={true} path='/'>
                    <Home />
                </Route>
                <Route exact ={true} path='/Insert'>
                    <Insert />
                </Route>
            </Switch> 
        </div>
    )
}
