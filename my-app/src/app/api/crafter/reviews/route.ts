import { NextRequest, NextResponse } from "next/server";
import { ReviewDetails } from "@/lib/types";
import { db } from "@/firebase";
import { addDoc, collection, doc, documentId, getDoc } from "firebase/firestore";

// Add Reviews Details
export async function POST(request: NextRequest) {
  try {
    const ReviewBody: ReviewDetails = await request.json();

    if (!ReviewBody.id || !ReviewBody.review) {
      return NextResponse.json({
        message: "Please fill this Review Section. 'id' and 'review' are required.",
        status: 400,
      });
    }

    const ReviewData: ReviewDetails = {
      ...ReviewBody,
    };

    const CReviewRef = collection(db, "Reviews");
    const storeReviewDetailsDocRef = await addDoc(CReviewRef, ReviewData);
    const documentId = storeReviewDetailsDocRef.id;

    console.log("Review added with ID:", documentId);

    return NextResponse.json({
      message: "ID and review added successfully.",
      status: 200,
      id: documentId, 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "An error occurred. Please check your request and try again.",
      error: error,
      status: 500,
    });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const id: string | null = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "No ID provided in the request", status: 400 });
    }

    const ReviewsDetailsDocRef = doc(db, "Reviews", id);
    const ReviewsDetailsData = await getDoc(ReviewsDetailsDocRef);

    if (ReviewsDetailsData.exists()) {
      const responseData = {
        id: ReviewsDetailsData.id,
        ...ReviewsDetailsData.data(),
      };

      return NextResponse.json(responseData);
    } else {
      return NextResponse.json({ message: "No Reviews Found", status: 404 });
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}



// import { NextRequest, NextResponse } from "next/server";
// import ReviewDetails from "@/app/(crafter)/Revdetails";
// import { db } from "@/firebase";
// import { addDoc, collection, doc, getDoc } from "firebase/firestore";

// // Add Reviews Details
// export async function POST(request: NextRequest) {
//   try {
//     const ReviewBody: ReviewDetails = await request.json();

//     // Check if 'id' and 'review' are present in the request body
//     if (!ReviewBody.id || !ReviewBody.review) {
//       return NextResponse.json({
//         message: "Please fill this Review Section. 'id' and 'review' are required.",
//         status: 400, // Bad Request
//       });
//     }

//     const ReviewData: ReviewDetails = {
//       ...ReviewBody,
//       // date: new Date().toISOString(),
//     };

//     const CReviewRef = collection(db, "Reviews");
//     const storeReviewDetailsDocRef = await addDoc(CReviewRef, ReviewData);

//     // Access the document ID from the reference
//     const documentId = storeReviewDetailsDocRef.id;

//     console.log("Review added with ID:", documentId);

//     return NextResponse.json({
//       message: "Review Added Successfully",
//       data: documentId,
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       message: "An error occurred. Please check your request and try again.",
//       error: error,
//       status: 500,
//     });
//   }
// }


// export async function GET(request: NextRequest, response: NextResponse) {
//   try {
//     const id: string | null = request.nextUrl.searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ message: "No ID provided in the request", status: 400 });
//     }

//     const ReviewsDetailsDocRef = doc(db, "Reviews", id);
//     const ReviewsDetailsData = await getDoc(ReviewsDetailsDocRef);

//     if (ReviewsDetailsData.exists()) {
//       const responseData = {
//         id: ReviewsDetailsData.id,
//         ...ReviewsDetailsData.data(),
//       };

//       return NextResponse.json(responseData);
//     } else {
//       return NextResponse.json({ message: "No Reviews Found", status: 404 });
//     }
//   } catch (error) {
//     console.error("Error in GET request:", error);
//     return NextResponse.json({ error: "Internal Server Error", status: 500 });
//   }
// }




// // http://localhost:3000/api/crafter/reviews
// import { NextRequest, NextResponse } from "next/server";
// import ReviewDetails from "@/app/(crafter)/Revdetails";
// import { db } from "@/firebase";
// import {
//   addDoc,
//   collection,
//   setDoc,
//   doc,
//   getDoc,
// } from "firebase/firestore";

// // Add Reviews Details
// export async function POST(request: NextRequest) {
//   try {
//     const ReviewBody: ReviewDetails = await request.json();

//     // Check if 'id' and 'review' are present in the request body
//     if (!ReviewBody.id || !ReviewBody.review) {
//       return NextResponse.json({
//         message: "Please fill this Review Section. 'id' and 'review' are required.",
//         status: 400, // Bad Request
//       });
//     }

//     const ReviewData: ReviewDetails = {
//       ...ReviewBody,
//     //   date: new Date().toISOString().split("T")[0],
//     };

//     const CReviewRef = collection(db, "Reviews");
//     const storeReviewDetailsDocRef = await addDoc(CReviewRef, ReviewData);

//     console.log("Review added:", storeReviewDetailsDocRef.id);
//     console.log(ReviewData.review, ReviewData.id);
//     return NextResponse.json({
//       // console.log(ReviewData.review, ReviewData.id),
//       message: "Review Added Successfully",
//       data: storeReviewDetailsDocRef.id,
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       message: "An error occurred. Please check your request and try again.",
//       error: error,
//       status: 500,
//     });
//   }
// }

// Display Review Details
// export async function GET(request: NextRequest, response: NextResponse) {
//   try {
//     const id: string | null = request.nextUrl.searchParams.get("id");
//     // const review: string | null = request.nextUrl.searchParams.get("review");
//     if (id) {
//       const ReviewsDetailsDocRef = doc(db, "Reviews", id,);
//       const ReviewsDetailsData = await getDoc(ReviewsDetailsDocRef);
//       return NextResponse.json(ReviewsDetailsData.data());

//       // if (ReviewsDetailsData.exists()) {
//       //   return NextResponse.json(ReviewsDetailsData.data());
//         // Include 'id' and 'review' in the response data
//         // const responseData = {
//         //   id: ReviewsDetailsData.data().id,
//         //   review: ReviewsDetailsData.data().review,
//         //   name: ReviewsDetailsData.data().name,
//         // };

//         // return NextResponse.json(responseData.id, responseData.review);
//       // } 
//       // else {
//       //   return NextResponse.json({ message: "No Reviews Found", status: 404 });
//       // }
//     } 
//     else {
//       return NextResponse.json({ message: "No Data", status: 404 });
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: JSON.stringify(error), status: 500 });
//   }
// }



// // http://localhost:3000/api/crafter/reviews
// import { NextRequest, NextResponse } from "next/server";
// import ReviewDetails from "@/app/(crafter)/Revdetails";
// import { db } from "@/firebase";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";

// // Add Reviews Details
// export async function POST(request: NextRequest) {
//     try {
//       const ReviewBody: ReviewDetails = await request.json();
  
//       // Check if 'id' and 'review' are present in the request body
//       if (!ReviewBody.id || !ReviewBody.review) {
//         return NextResponse.json({
//           message: "Please fill this Review Section. 'id' and 'review' are required.",
//           status: 400, // Bad Request
//         });
//       }
  
//       const ReviewData: ReviewDetails = {
//         ...ReviewBody,
//         date: new Date().toISOString().split("T")[0],
//       };
  
//       const CReviewRef = collection(db, "Reviews");
//       const storeReviewDetailsDocRef = await addDoc(CReviewRef, ReviewData);
  
//       console.log(storeReviewDetailsDocRef);
  
//       return NextResponse.json({
//         message: "Review Added Successfully",
//         data: storeReviewDetailsDocRef.id,
//         status: 200,
//       });
//     } catch (error) {
//       console.log(error);
//       return NextResponse.json({
//         message: "An error occurred. Please check your request and try again.",
//         error: error,
//         status: 500,
//       });
//     }
//   }
    

// // Display Review Details
// // Display Review Details
// export async function GET(request: NextRequest) {
//     try {
//       const id: string | null = request.nextUrl.searchParams.get("id");
//       if (id) {
//         const ReviewsDetailsDocRef = doc(db, "Reviews", id);
//         const ReviewsDetailsData = await getDoc(ReviewsDetailsDocRef);
  
//         if (ReviewsDetailsData.exists()) {
//           // Include 'id' and 'review' in the response data
//           const responseData = {
//             id: ReviewsDetailsData.id,
//             review: ReviewsDetailsData.data().review,

//             name: ReviewsDetailsData.data().name,
//           };
  
//           return NextResponse.json(responseData);
//         } else {
//           return NextResponse.json({ message: "No Reviews Found", status: 404 });
//         }
//       } else {
//         return NextResponse.json({ error: "Reviewer id not found :/", status: 404 });
//       }
//     } catch (error) {
//       console.log(error);
//       return NextResponse.json({ error: JSON.stringify(error) });
//     }
//   }  



// // http://localhost:3000/api/crafter/reviews
// import { NextRequest, NextResponse } from "next/server";
// import ReviewDetails from "@/app/(crafter)/Revdetails";
// import { db } from "@/firebase";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";

// // Add Reviews Details
// export async function POST(request: NextRequest) {
//   try {
//     const ReviewBody: ReviewDetails = await request.json();
//     const ReviewData: ReviewDetails = {
//       ...ReviewBody,
//     //   date: new Date(),
//     date: new Date().toISOString().split("T")[0],
//     };
//     const CReviewRef = collection(db, "Reviews");
//     const storeReviewDetailsDocRef = await addDoc(
//       CReviewRef,
//       ReviewData
//     );
//     const ReviewsDocRef = doc(db, "Reviews", storeReviewDetailsDocRef.id);
//     const updateReviewId = await updateDoc(ReviewsDocRef, {
//       id: storeReviewDetailsDocRef.id,
//     });
//     console.log(storeReviewDetailsDocRef, updateReviewId);
//     return NextResponse.json({
//       message: "Review Added Successfully",
//       data: storeReviewDetailsDocRef.id,
//       status: 200
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Please fill this Review Section", error: error });
//   }
// }

// Display Review Details
// export async function GET(request: NextRequest) {
//   try {
//     const id: string | null = request.nextUrl.searchParams.get("id");
//     if (id) {
//       const ReviewsDetailsDocRef = doc(db, "Reviews", id);
//       const ReviewsDetailsData = await getDoc(ReviewsDetailsDocRef);
//       console.log(ReviewsDetailsData.data());
//       if (ReviewsDetailsData.exists()) {
//         return NextResponse.json(ReviewsDetailsData.data());
//       } else {
//         return NextResponse.json({ message: "No Reviews Found", status: 404});
//       }
//     } else {
//       return NextResponse.json({ error: "Reviewer id not found :/", status: 404 });
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: JSON.stringify(error) });
//   }
// }





// import ReviewDetails from "@/app/(crafter)/Revdetails";
// import { db } from "@/firebase";
// import { collection, doc, setDoc } from "firebase/firestore";
// import { NextRequest, NextResponse } from "next/server";
// import { Job } from "@/lib/types";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// export async function POST(request: NextRequest) {
//     try {
//       const jobReviewsBody: ReviewDetails = await request.json();
  
//       // Check if the review rating is within the range of 1 to 5
//       // const isValidRating = jobReviewsBody.rating >= 1 && jobReviewsBody.rating <= 5;
  
//       // if (!isValidRating) {
//       //   return NextResponse.json({
//       //     error: "Invalid review rating. Please provide a rating between 1 and 5.",
//       //     status: 400,
//       //   });
//       // }
  
//       const jobReviewsData: ReviewDetails = {
//         ...jobReviewsBody,
//       };
  
//       const jobReviewsDocRef = doc(collection(db, "Crafter"), "REVIEWS");
  
//       const storeJobReviewsDocRef = await setDoc(jobReviewsDocRef, jobReviewsBody);
  
//       console.log(storeJobReviewsDocRef);
  
//       return NextResponse.json({
//         message: "Reviews Details Stored",
//         data: storeJobReviewsDocRef,
//         status: 200,
//       });
//     } catch (error) {
//       console.log(error);
//       return NextResponse.json({ message: "Please fill this Review Section", error: error, status: 404 });
//     }
//   }



