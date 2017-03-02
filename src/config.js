export default function() {
  return {
    site: {
      name: "App Name Here",
      schoolName: "School Name Here",
      teacherDomain: "schoolteachers.org",
      studentDomain: "schoolstudents.org",
      cycleDays: ["A","B","C","D","E","F"],
      timeZone: "America/Los_Angeles"
    },
    googleApi: {
      clientId: "your-client-id",
      clientSecret: "your-client-secret",
      scopes: "calendar",
      rotationCalendar: "your-rotation-calendar"
    }
  }
}
