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

// /api/crafter/proposal/[crafterId]

export async function GET(
  request: NextRequest,
  { params }: { params: { crafterId: string } }
) {
  try {
    const { crafterId } = params;
    const q = query(collection(db, "proposals"), where("crafterId", "==", crafterId));
    const querySnapshot = await getDocs(q);
    // const proposals = querySnapshot.docs.map((doc) => doc.data());
    if (!querySnapshot.empty) {
      return NextResponse.json(true);
    } else {
      return NextResponse.json(false);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
