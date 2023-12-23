import { db } from "@/firebase";
import { Job, Proposal } from "@/lib/types";
import {
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
        date: new Date()
    }
    console.log(proposalData);
    const proposalCollectionRef = collection(db, "proposals");
    const storeProposalData = await addDoc(proposalCollectionRef, proposalData);
    const proposalDocRef = doc(db, "proposals", storeProposalData.id);
    // updating submitted proposal id
    await updateDoc(proposalDocRef, {
        id: storeProposalData.id
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