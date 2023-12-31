import { db } from "@/firebase";
import { Job, Proposal } from "@/lib/types";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/crafter/proposal

// Submit Job Proposal
export async function POST(request: NextRequest) {
  try {
    const proposalBody: Proposal = await request.json();
    const proposalData: Proposal = {
      ...proposalBody,
      date: new Date(),
    };
    console.log(proposalData);
    const proposalCollectionRef = collection(db, "proposals");
    const storeProposalData = await addDoc(proposalCollectionRef, proposalData);
    const proposalDocRef = doc(db, "proposals", storeProposalData.id);
    // updating submitted proposal id
    await updateDoc(proposalDocRef, {
      id: storeProposalData.id,
    });
    return NextResponse.json({
      message: "Proposal Submitted Successfully",
      data: storeProposalData.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

export async function GET(request: NextRequest) {
  try {
    const id: string | null = request.nextUrl.searchParams.get("id");
    if (id) {
      const proposalDocRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "proposals",
        id,
      );
      const proposalsData: DocumentSnapshot<DocumentData, DocumentData> =
        await getDoc(proposalDocRef);
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
