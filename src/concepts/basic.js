import React from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation ,useQueryClient} from "react-query";

const queryClient = new QueryClient()

export default function Basic() {
    return (
        <QueryClientProvider client={queryClient}>
            <FetchAndDisplayData />
        </QueryClientProvider>
    )

}

function FetchAndDisplayData() {
    // const queryClient = useQueryClient()
    const PostNote = useMutation(event =>
        fetch("http://localhost:3001/notes/insert", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Data": {
                    "note": "note " + new Date().toLocaleString(),
                    "description": "dskhkshdghjgsdjhgsd",
                    "createdOn": "2021-12-13T00:00:00.000",
                    "updatedAt": "2021-12-13T00:00:00.000"
                }
            })
        }).then((res) => res.json()),
        {
            onMutate: async data => {
                await queryClient.cancelQueries("noteData")
                const prevValues = queryClient.getQueryData("noteData")
                queryClient.setQueryData('noteData',prevValues)
                return prevValues
            },
            onError: (err, variables, prevValues) => {
                queryClient.setQueryData("noteData", prevValues)
            },
            onSettled: () => {
                queryClient.invalidateQueries("noteData")
                window.alert("Success")
            }
        }
    )


    const { isLoading, error, data, isFetching } = useQuery("noteData", () =>
        fetch("http://localhost:3001/notes/notes").then((res) => res.json())
    )
    // console.log("flsjdhkjshd", data)
    if (isLoading) return <p>Loading...</p>

    if (error) return <p>Error occured in {error}</p>

    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <h1>{item.note}</h1>
                    <p>{item.description}</p>
                </div>
            ))}

            <button onClick={PostNote.mutate}>{PostNote.isLoading ? "loading" : "Post Note"}</button>
        </div>
    )



}