"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSinglePoll } from "@/actions/polls";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ResultsPage() {
  const params = useParams<{ id: string }>();

  const { data: results, isLoading } = useSinglePoll(params.id);
  const totalVotes = (results?.options || []).reduce(
    (acc: any, option: any) => {
      return acc + option.votes;
    },
    0
  );

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin text-3xl" />
      </div>
    );
  }

  return (
    <main className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>{results?.question}</CardTitle>
          <CardDescription>{totalVotes} total votes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(results?.options || []).map((option: any) => {
            const percentage = (option.votes / totalVotes) * 100;
            return (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{option.text}</span>
                  <span className="text-muted-foreground">
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </main>
  );
}
