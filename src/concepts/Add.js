import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";

var queryClient = new QueryClient()
export default function Add() {
    return (
        <QueryClientProvider client={queryClient}>
            <AddNoteForm />
        </QueryClientProvider>
    )
}

function AddNoteForm() {
    const [note, setNote] = useState('')
    const [description, setDescription] = useState('')
    const mutation = useMutation(event =>
        fetch("http://localhost:3001/notes/insert", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Data": {
                    "note": note,
                    "description": description,
                    "createdOn": new Date(),
                    "updatedAt": new Date(),
                }
            })
        }).then((res) => res.json()),
        {
            onMutate: async () => {
                setNote('')
                setDescription('')
                await queryClient.removeQueries("notes")
                let prevValues = queryClient.getQueryData("notes")
                queryClient.setQueryData("notes", prevValues)
                return prevValues;
            },
            onError: (error, vars, prevValues) => {
                queryClient.setQueryData("notes", prevValues)
            },
            onSuccess: (results,variables) => {
                queryClient.setQueryData("notes",results)
                // queryClient.invalidateQueries("notes")
                window.alert("Success")
            }
        })

    return (
        <div style={{ padding: 20 }}>
            <div style={{ paddingBottom: 10 }}>
                <input type="text" placeholder="Note" id="note" value={note} onChange={(e)=>setNote(e.target.value)}></input>
            </div>
            <div style={{ paddingBottom: 10 }}>
                <textarea rows="3" placeholder="Description" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
            <div style={{ paddingBottom: 10 }}>
                <button onClick={mutation.mutate}>{mutation.isLoading ? "Loading" : "Post Note"}</button>
            </div>
        </div>
    )
}