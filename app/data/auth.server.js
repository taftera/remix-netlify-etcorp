import { prisma } from "./database.server";
// import bcryptjs from "bcryptjs";
import argon2 from "argon2";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: true, // Defaults to true in production
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  // console.log("createUserSession: ", userId, redirectPath);
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function subscribe(email, first_name, last_name, company) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    let validationErrors = {};
    validationErrors.email =
      "User already with the provided email already exists";
    validationErrors.existingUser = true;
    throw validationErrors;
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: "",
        first_name: first_name,
        last_name: last_name,
        company: company,
        admin: false,
      },
    });
    console.log("test", user);
    return createUserSession(user.id, "/instructions");
    // return null;
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error("An error occurred while creating the user");
  }
}

export async function signup({ email, password }) {
  // console.log("auth.server signup: ", email, password);
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    const error = new Error(
      "User already with the provided email already exists"
    );
    error.status = 422;
    throw error;
  }
  // console.log("existingUser: ", existingUser);
  // TODO:
  // const { hash } = bcryptjs;
  // const passwordHash = await hash(password, 12);
  const passwordHash = await argon2.hash(password);
  console.log("passwordHash: ", passwordHash);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: passwordHash,
      first_name: "",
      last_name: "",
      company: "",
      admin: false,
    },
  });

  return createUserSession(user.id, "/admin/dataReview");
}

export async function login({ email, password }) {
  // console.log("auth.server login: ", email, password);
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    const error = new Error(
      "Couldn not log you in, with the provided credentials (em)"
    );
    error.status = 401;
    throw error;
  }
  // console.log("eu: ", existingUser);

  // TODO:
  // const { compare } = bcryptjs;
  // const passwordMatch = await compare(password, existingUser.password);

  // const passwordHash = await argon2.hash(password);
  // console.log("--> ", existingUser.password, " | ", passwordHash);
  const passwordMatch = await argon2.verify(existingUser.password, password);
  // const passwordMatch = existingUser.password === passwordHash;
  // console.log("argon2:hp: ", hashedPassword);
  // console.log("passwordMatch: ", passwordMatch);

  if (!passwordMatch) {
    const error = new Error(
      "Couldn not log you in, with the provided credentials (pw)"
    );
    error.status = 401;
    throw error;
  }
  // console.log("existingUser: ", existingUser);
  return createUserSession(existingUser.id, "/admin/dataReview");
}

export async function getUserFromSession(request) {
  // console.log("getUserFromSession: ");
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  // console.log('session: ', session);
  const userId = session.get("userId");
  // console.log("userId: ", userId);
  if (!userId) return null;
  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function assessmentCompleted(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  // console.log("requireUserSession: ");
  const userId = await getUserFromSession(request);
  // console.log("userId: ", userId);
  if (!userId) {
    throw redirect("/subscribe");
  }
  return userId;
}

export async function requireAdminSession(request) {
  // console.log("requireUserSession: ");
  const userId = await getUserFromSession(request);
  // console.log("userId: ", userId);
  if (!userId) {
    throw redirect("/auth?mode=login");
  }
  return { userId: userId, admin: true };
}

export async function adminProfileReview(userId) {
  const profileData = await prisma.user.findFirst({ where: { id: userId } });
  // console.log("aPR: ", profileData.admin);
  if (!profileData.admin) {
    // console.log("Current credentials, doesn't have access to this page.");
    throw redirect("/auth?mode=login");
  }
  return profileData.admin;
}

export async function queryAssessments() {
  try {
    const assessments = await prisma.assessment.findMany({
      include: {
        User: true, // Include related User data
      },
      orderBy: {
        dateAdded: "desc", // Sort by dateAdded in descending order
      },
    });
    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw error;
  }
}
