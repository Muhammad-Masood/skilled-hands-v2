import { db } from "@/firebase";
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// /api/crafter/proposal/[jobId]

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;
    const q = query(collection(db, "proposals"), where("jobId", "==", jobId));
    const querySnapshot = await getDocs(q);
    const proposals = querySnapshot.docs.map((doc) => doc.data());
    if (!querySnapshot.empty) {
      return NextResponse.json(proposals);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
