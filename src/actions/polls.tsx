"use client";
import axios from "axios";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface PollData {
  question: string;
  options: string[];
}

export function useCreatePoll() {
  const client = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: PollData) => {
      const response = await axios.post("/api/polls", data);
      return response.data;
    },
    onError: () => {
      toast.error("There was some error");
    },
    onSuccess: () => {
      toast.success("Poll created successfully");
      client.invalidateQueries({ queryKey: ["getPolls"] });
      router.push("/");
    },
  });
}

export const useGetPolls = () => {
  return useQuery({
    queryKey: ["getPolls"],
    queryFn: async () => {
      const response = await axios.get("/api/polls");
      return response.data;
    },
  });
};

export const useSinglePoll = (pollId: string) => {
  return useQuery({
    queryKey: ["poll", pollId],
    queryFn: async () => {
      const response = await axios.get(`/api/polls/${pollId}`);
      return response.data;
    },
    enabled: !!pollId,
    refetchInterval: 5000,
  });
};

export const useVotePoll = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      pollId,
      option,
    }: {
      pollId: string;
      option: string;
    }) => {
      const response = await axios.patch(`/api/polls/${pollId}`, {
        body: {
          id: pollId,
          option,
        },
      });
      return response.data;
    },
    onSuccess: (_, { pollId }) => {
      client.invalidateQueries({ queryKey: ["poll", pollId] });
      toast.success("You have voted");
    },
  });
};
