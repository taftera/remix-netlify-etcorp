import { assessmentCompleted } from '~/data/auth.server';

export default function AssessmentEnd() {
  return null;
}

export async function loader({ request }: { request: Request }) {
  return assessmentCompleted(request); // This will log the user out
}
