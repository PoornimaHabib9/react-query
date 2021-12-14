import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import Add from "../concepts/Add";
import List from "../concepts/List";
import OnScrollLoad from "../concepts/OnScrollLoad";
import PaginatedQueries from "../concepts/PaginatedQueries";
import PersistMutations from "../concepts/persistMutation";
import View from "../concepts/View";

export default function RoutesList() {
    return (
        <Routes>
            <Route path="/add" element={<Add/>}/>

            <Route path="/addOffline" element={<PersistMutations/>}/>

            <Route path="/list" element={<List/>}/>

            <Route path="/view" element={<View/>}/>

            <Route path="/paginateList" element={<PaginatedQueries/>}/>

            <Route path="/loadMore" element={<OnScrollLoad/>}/>
        </Routes>

    )
}