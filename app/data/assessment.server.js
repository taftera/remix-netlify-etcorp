import { prisma } from "./database.server";
import { redirect } from "@remix-run/react";

export async function addAssessment(
  resultsA,
  resultsB,
  totalsA,
  totalsB,
  userId
) {
  // console.log('--> addAssessment:r: ', resultsA, resultsB);
  // console.log('--> addAssessment:t: ', totalsA, totalsB);
  // console.log('--> addAssessment:id: ', userId);

  // Ensure resultsA and resultsB are JSON objects
  const parsedResultsA =
    typeof resultsA === "string" ? JSON.parse(resultsA) : resultsA;
  const parsedResultsB =
    typeof resultsB === "string" ? JSON.parse(resultsB) : resultsB;
  // console.log('--> addAssessment:parseA: ', parsedResultsA);
  // console.log('--> addAssessment:parseB: ', parsedResultsB);
  // Ensure listA and listB are numbers
  const listA = parseFloat(totalsA);
  const listB = parseFloat(totalsB);

  try {
    const assessmentResults = await prisma.assessment.create({
      data: {
        resultsA: parsedResultsA,
        resultsB: parsedResultsB,
        listA,
        listB,
        User: { connect: { id: userId } },
      },
    });
    return redirect("/assessmentEnd");
  } catch (error) {
    console.error("f:addAssessment: ", error);
    throw new Error("Failed to add assessment");
  }
}

export async function getUserAssessment(userId) {
  // console.log('--> getUserAssessment', userId);
  if (!userId) {
    return new Error("Invalid user id");
  }
  try {
    return await prisma.assessment.findFirst({
      where: { userId: userId },
      include: {
        User: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
            company: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("User doesn't have an assessment yet.");
  }
}
export async function getAssessment(assessmentId) {
  // console.log('--> getAssessment', assessmentId);
  if (!assessmentId) {
    return new Error("Invalid assessment id");
  }
  try {
    return await prisma.assessment.findFirst({
      where: { id: assessmentId },
      include: {
        User: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
            company: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("User doesn't have an assessment yet.");
  }
}
