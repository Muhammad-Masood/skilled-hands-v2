import { db } from "@/firebase";
import { Job } from "@/lib/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/user/job

// Publish Job Details
export async function POST(request: NextRequest) {
  try {
    const jobDetailsBody: Job = await request.json();
    const jobDetailsData: Job = {
      ...jobDetailsBody,
      date: new Date(),
    };
    const jobCollectionRef = collection(db, "jobs");
    const storeJobDetailsDocRef = await addDoc(
      jobCollectionRef,
      jobDetailsData
    );
    const jobDocRef = doc(db, "jobs", storeJobDetailsDocRef.id);
    const updateJobId = await updateDoc(jobDocRef, {
      id: storeJobDetailsDocRef.id,
    });
    console.log(storeJobDetailsDocRef, updateJobId);
    return NextResponse.json({
      message: "Job Posted Successfully",
      data: storeJobDetailsDocRef.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

// View Single Job With Details
export async function GET(request: NextRequest) {
  try {
    const id: string | null = request.nextUrl.searchParams.get("id");
    if (id) {
      const jobDetailsDocRef = doc(db, "jobs", id);
      const jobDetailsData = await getDoc(jobDetailsDocRef);
      console.log(jobDetailsData.data());
      if (jobDetailsData.exists()) {
        return NextResponse.json(jobDetailsData.data());
      } else {
        return NextResponse.json({ message: "No Job Details Found" });
      }
    } else {
      return NextResponse.json({ error: "Job id not found :/" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
