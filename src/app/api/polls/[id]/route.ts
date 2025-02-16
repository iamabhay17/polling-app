import { NextResponse } from "next/server";
import { ObjectId, WriteConcern } from "mongodb";
import mongoPromise from "@/clients/mongo";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await mongoPromise;
    const db = client.db("main");
    const pollsCollection = db.collection("polls");

    const poll = await pollsCollection.findOne({
      _id: new ObjectId((await params).id),
    });

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    return NextResponse.json(poll, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch poll" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const client = await mongoPromise;
    const db = client.db("main");
    const pollsCollection = db.collection("polls");

    const poll = await pollsCollection.findOne({
      _id: new ObjectId((await params).id),
    });
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    const updatedOptions = poll.options.map((opt: any) => {
      return opt.text === body.body.option
        ? { ...opt, votes: (opt?.votes || 0) + 1 }
        : opt;
    });

    await pollsCollection.updateOne(
      { _id: new ObjectId((await params).id) },
      { $set: { options: updatedOptions } },
      { writeConcern: { w: 1 } }
    );

    return NextResponse.json(
      { message: "Vote recorded successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit vote" },
      { status: 500 }
    );
  }
}
