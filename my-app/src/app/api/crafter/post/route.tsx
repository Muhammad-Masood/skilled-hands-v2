import { db } from "@/firebase";
import { Crafter, post } from "@/lib/types";
import { doc ,getDocs ,getDoc,setDoc ,updateDoc, collection  } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
      try {  
        const data: post = await request.json();
        console.log(data);
        const dataDocumentReference = doc(db, 'images', data.id);
        await setDoc(dataDocumentReference, data);
  
        return NextResponse.json({ message: 'Image uploaded successfully' });
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    }
   

export async function PATCH(request: NextRequest) {
      try {
        const data: post = await request.json();
        console.log(data);
  
        const { id, ...updateimage } = data;
        const dataDocumentReference = doc(db, 'images', id);
        const existingDataSnapshot = await getDoc(dataDocumentReference);

        if (existingDataSnapshot.exists()){
          await updateDoc(dataDocumentReference, { updateimage });
          return NextResponse.json({ message: 'Image updated successfully' });

        } else {
          return NextResponse.json({message : 'Image Not Found'})
        }
      } catch (error) {
        console.error('Error updating image:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
  }

export async function GET(request: NextRequest) {
      try {
        const imagesCollection = collection(db, 'images');
        const imagesSnapshot = await getDocs(imagesCollection);
  
        const images = imagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
        return NextResponse.json(images);
      } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
  
  }