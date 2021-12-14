import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { v1 as uuid } from "uuid"

let queryClient = new QueryClient()
export default function PersistMutations() {
    return (
        <QueryClientProvider client={queryClient}>
            <AddFormOffline />
        </QueryClientProvider>
    )
}

function AddFormOffline() {
    let [note, setNote] = useState("")
    let [description, setDescription] = useState("")

    function saveOffline() {
        queryClient.setMutationDefaults('addNote', {
            mutationFn: addNote,
            onMutate: async (variables) => {
                console.log(variables)
                await queryClient.cancelQueries('notes')
                let optimisticNote = { id: uuid.v4(), note: note, description: description }
                queryClient.setQueryData('notes', optimisticNote)
                console.log("note", optimisticNote)
                return { optimisticNote }
            },
            onError: (error, variables, context) => {
                console.log(error, variables, context)
                queryClient.setQueryData('notes', old => old.map(note => note.id != context.optimisticNote.id))
            },
            onSuccess: (results, variables, context) => {
                console.log(results, variables, context)
                queryClient.setQueryData('notes', old => old.map(note => note.id == context.optimisticNote.id ? results : note))
            }
        })
    }


    function addNote() {
        console.log("ss")
        return fetch("http://localhost:3001/notes/insert", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                Data: {
                    "note": note,
                    "description": description,
                    "createdOn": new Date(),
                    "updatedAt": new Date()
                }
            }
        }).then(res => res.json())
    }

    return (
        <div>
            <div>
                <input type="text" value={note} placeholder="Note" onChange={(e) => setNote(e.target.value)} />
            </div>
            <div>
                <textarea rows="3" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <button onClick={saveOffline}>Save Offline</button>
            </div>
        </div>
    )
}