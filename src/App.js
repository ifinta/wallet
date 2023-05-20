import * as React from 'react';
import {Container} from "@mui/material";
import AppMenu from "./components/AppMenu";
import {Navigate, Route, Routes} from "react-router-dom";
import MePage from "./screens/me/Me";
import NewPage from "./screens/new/NewPage";
import NewTxPage from "./screens/newtx/NewTxPage";
import DetailPage from "./screens/detail/DetailPage";
import Page404 from "./screens/404/Page404";
import PageError from "./screens/Error/PageError";
import Providers from "./Providers";
import {useAuth} from "./hooks/useAuth";

function ProtectedPage({children}) {
    const {authToken} = useAuth();
    if (authToken === false) {
        return <Navigate to="/"></Navigate>;
    }

    return children;
}

function App() {
    return (
        <Providers>
            <AppMenu/>
            <br/>
            <Container maxWidth={"lg"}>
                <Routes>
                    <Route path="/" exact element={<ProtectedPage><MePage/></ProtectedPage>}/>
                    <Route path="/new" exact element={<ProtectedPage><NewPage/></ProtectedPage>}/>
                    <Route path="/wallet/:id" exact element={<ProtectedPage><DetailPage/></ProtectedPage>}/>
                    <Route path="/newtx/wallet/:id" exact element={<ProtectedPage><NewTxPage/></ProtectedPage>}/>
                    <Route path="/Error" element={<PageError/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </Container>
        </Providers>
    );
}

export default App;
