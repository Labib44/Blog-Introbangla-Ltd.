import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({ baseUrl: ' https://backend.lobdho.com/clickthepoint/api/v1' }),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/projects'
        }),
        addProjects: builder.mutation({
            query: (newProject) => ({
                url: '/projects',
                method: 'POST',
                body: newProject
            })
        })
    })
})

export const { useGetProjectsQuery, useAddProjectsMutation } = projectApi
