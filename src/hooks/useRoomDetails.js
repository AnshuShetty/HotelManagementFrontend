import { useQuery } from "@apollo/client/react";
import { getRoom } from "../graphql/queries/room";
import { getReviews } from "../graphql/queries/getReviews";

export function useRoomDetails(roomId) {
  const {
    data: roomData,
    loading: roomLoading,
    error: roomError,
    refetch: refetchRoom,
  } = useQuery(getRoom, { variables: { roomId }, skip: !roomId });

  const {
    data: reviewData,
    loading: reviewLoading,
    error: reviewError,
    refetch: refetchReviews,
  } = useQuery(getReviews, { variables: { roomId }, skip: !roomId });

  const room = roomData?.room;
  const reviews = reviewData?.getReviews || [];

  const loading = roomLoading || reviewLoading;
  const error = roomError || reviewError;

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1
      )
    : null;

  return {
    room,
    reviews,
    loading,
    error,
    refetchRoom,
    refetchReviews,
    avgRating,
  };
}
