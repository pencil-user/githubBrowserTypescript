import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Base64 } from 'js-base64';
import { StringifyOptions } from 'querystring';

export interface UserInterface {
  login: string,
  avatar_url: string,
  id: number,
  node_id: string,
  type: string,
  name: string | null,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  total_private_repos?: number,
  private_gists?: number,
  bio?: string,
  score: number
}

export interface Repo {
  id: number,
  node_id: string,
  full_name: string,
  forks_count: number,
  watchers_count: number,
  forks: number,
  private: string
}

export interface Gist {
  id: number,
  description: string
}

export interface Page<T> {
  total_count: number,
  items: T[]
}


export const querySlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.github.com`,
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const user = getState().auth

      headers.set(
        'authorization',
        'Basic ' + Base64.encode(user.username + ":" + user.token))
      return headers
    }
  }),
  endpoints: (builder) => ({
    findUsers: builder.query<Page<UserInterface>, { user: string, page: number }>({
      query: ({ user, page }) => `/search/users?q=${user}%20in%3Alogin&per_page=30&page=${page}`
    }),
    getUser: builder.query<UserInterface, string>({
      query: (user) => `/users/${user}`
    }),
    getUserRepos: builder.query<Repo[], { user: string, page: number }>({
      query: ({ user, page }) => `/users/${user}/repos?per_page=30&page=${page}`
    }),
    getUserGists: builder.query<Gist[], { user: string, page: number }>({
      query: ({ user, page }) => `/users/${user}/gists?per_page=30&page=${page}`
    })
  })
})

export const {
  useFindUsersQuery,
  useGetUserQuery,
  useGetUserReposQuery,
  useGetUserGistsQuery,
  util
} = querySlice