"use client";

import type React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetPolls, useSinglePoll, useVotePoll } from "@/actions/polls";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

export default function VotePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const mutation = useVotePoll();

  const { data, isLoading } = useSinglePoll(params.id);

  const formSchema = z.object({
    option: z.string().min(1, { message: "Required" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      option: "",
    },
  });

  const handleVote = async (data: z.infer<typeof formSchema>) => {
    mutation.mutate({ pollId: params.id, option: data.option });
    router.push(`/results/${params.id}`);
  };

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
          <CardTitle>{data?.question || ""}</CardTitle>
          <CardDescription>Select one option to cast your vote</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleVote)}
              className="space-y-6"
            >
              <FormField
                name="option"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {(data?.options || []).map((option: any) => (
                        <div
                          key={option.text}
                          className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent"
                        >
                          <RadioGroupItem
                            value={option.text}
                            id={option.text}
                          />
                          <Label
                            htmlFor={option.text}
                            className="flex-1 cursor-pointer"
                          >
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  );
                }}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.watch("option") === ""}
              >
                Submit Vote
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
