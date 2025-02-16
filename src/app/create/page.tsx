"use client";

import type React from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DynamicList } from "@/components/molecules/dynamic-list";
import {
  Header,
  HeaderDescription,
  HeaderTitle,
} from "@/components/molecules/header";
import { useCreatePoll } from "@/actions/polls";

const formSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  options: z
    .array(z.string().min(1, { message: "Enter option value" }))
    .min(2, { message: "Minimum 2 Options required" }),
});

export default function CreatePollPage() {
  const mutation = useCreatePoll();
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: [],
    },
  });
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  return (
    <main className="flex flex-col justify-center gap-8">
      <div className="my-8">
        <Button asChild variant="secondary">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Polls
          </Link>
        </Button>
      </div>
      <div className="flex p-4 border rounded-md flex-col items-center gap-8 ">
        <Header>
          <div>
            <HeaderTitle>Create new Poll</HeaderTitle>
            <HeaderDescription>
              Enter the details to create a new poll
            </HeaderDescription>
          </div>
        </Header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-4">
              <FormField
                name="question"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Label htmlFor="question">Question</Label>
                      <FormDescription>
                        Enter the question you want to ask
                      </FormDescription>
                      <FormControl>
                        <Input className="w-[302px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Separator />

              <div className=" flex flex-col gap-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Options</Label>
                    <span className="text-sm text-muted-foreground">
                      Minimum 2 options required
                    </span>
                  </div>
                  <DynamicList form={form} />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="w-[210px]">
                    Create Poll
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
