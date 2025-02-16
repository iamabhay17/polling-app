import mongoPromise from "@/clients/mongo";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const dbClient = await mongoPromise;
    const db = dbClient.db("main");
    const pollsCollection = db.collection("polls");

    // Define validation schema
    const pollSchema = z.object({
      question: z.string().min(1, { message: "Question is required" }),
      options: z
        .array(z.string().min(1, { message: "Option cannot be empty" }))
        .min(2, { message: "At least 2 options are required" }),
    });

    const body = await req.json();
    const parsedData = pollSchema.parse(body);

    const newPoll = {
      question: parsedData.question,
      options: parsedData.options.map((option) => ({
        text: option,
        votes: 0,
      })),
      createdAt: new Date(),
    };

    const result = await pollsCollection.insertOne(newPoll, {
      writeConcern: { w: "majority" },
    });

    return NextResponse.json(
      { message: "Poll created successfully", pollId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create poll",
        error: "There was some error creating the poll",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    // Connect to the database
    const client = await mongoPromise;
    const db = client.db("main");
    const pollsCollection = db.collection("polls");

    // Fetch all polls
    const polls = await pollsCollection.find({}).toArray();

    return NextResponse.json({ polls }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}
