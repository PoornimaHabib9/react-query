import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

let queryClient = new QueryClient()
export default function View() {

    return (
        <QueryClientProvider client={queryClient}>
            <LoadNoteView />
        </QueryClientProvider>
    )
}

function LoadNoteView() {
    let [params] = useSearchParams()
    let id = params.get('id')

    const { isLoading, isError, error, data } = useQuery(['note', id], () => getNote(id), {
        initialData: () => {
            return queryClient.getQueryData("notes")?.find(d => d.id === id)
        }
    })

    return (
        <div>
            {
                isLoading ? (<p>Loading</p>) :
                    isError ? (<p>{error}</p>) :
                        <>
                            <h1>Note {data.note}</h1>
                            <p>{data.description}</p>
                        </>
            }
        </div>
    )

    function getNote(id) {
        return fetch(`http://localhost:3001/notes/getNoteById?id=${id}`).then((res) => res.json())
    }
}