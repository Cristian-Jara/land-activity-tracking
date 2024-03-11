import { apiSlice } from "../services/apiSlice";

const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createActivity: builder.mutation({
      query: (data) => ({
        url: "activities/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Activity", id },
        "Activities",
      ],
    }),
    updateActivity: builder.mutation({
      query: (data) => ({
        url: `activities/${data.id}/update/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Activity", id },
        "Activities",
      ],
    }),
    getActivity: builder.query({
      query: (id) => `activities/${id}/`,
      providesTags: (_, __, { id }) => [{ type: "Activity", id }, "Activities"],
    }),
    getActivities: builder.query({
      query: (params) => ({
        url: "activities/",
        method: "GET",
        params: params,
      }),
      providesTags: (result, _, __) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "Activities" as const,
                id,
              })),
              "Activities",
            ]
          : ["Activities"],
    }),
    createMeasurement: builder.mutation({
      query: (data) => ({
        url: "measurements/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, { activity }) => [
        { type: "Activity", id: activity },
        "Activities",
      ],
    }),
  }),
});

export const {
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useGetActivityQuery,
  useGetActivitiesQuery,
  useCreateMeasurementMutation,
} = documentApiSlice;
