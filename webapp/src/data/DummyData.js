// Dummy data for CareConnect application

export const users = [
  {
    id: 1,
    email: "admin@careconnect.com",
    password: "admin123", // In real app, this would be hashed
    firstName: "Admin",
    lastName: "User",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    email: "john@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date("2024-01-15"),
  },
]

export const mentalHealthCases = [
  // 2024 cases
  {
    id: 1,
    type: "anxiety",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2024-12-15"),
    description: "Anxiety case",
    status: "active",
  },
  {
    id: 2,
    type: "depression",
    gender: "male",
    ageGroup: "millennial",
    reportedDate: new Date("2024-12-14"),
    description: "Depression case",
    status: "active",
  },
  {
    id: 3,
    type: "self_harm",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2024-12-13"),
    description: "Self harm case",
    status: "resolved",
  },
  {
    id: 4,
    type: "suicide",
    gender: "male",
    ageGroup: "gen_x",
    reportedDate: new Date("2024-12-12"),
    description: "Suicide case",
    status: "active",
  },
  {
    id: 5,
    type: "anxiety",
    gender: "other",
    ageGroup: "millennial",
    reportedDate: new Date("2024-12-11"),
    description: "Anxiety case",
    status: "pending",
  },
  {
    id: 6,
    type: "depression",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2024-12-10"),
    description: "Depression case",
    status: "active",
  },
  {
    id: 7,
    type: "anxiety",
    gender: "male",
    ageGroup: "boomer",
    reportedDate: new Date("2024-12-09"),
    description: "Anxiety case",
    status: "resolved",
  },
  {
    id: 8,
    type: "self_harm",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2024-12-08"),
    description: "Self harm case",
    status: "active",
  },
  {
    id: 9,
    type: "depression",
    gender: "male",
    ageGroup: "millennial",
    reportedDate: new Date("2024-12-07"),
    description: "Depression case",
    status: "active",
  },
  {
    id: 10,
    type: "anxiety",
    gender: "female",
    ageGroup: "gen_x",
    reportedDate: new Date("2024-12-06"),
    description: "Anxiety case",
    status: "active",
  },

  // 2023 cases
  {
    id: 11,
    type: "depression",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2023-06-15"),
    description: "Depression case",
    status: "resolved",
  },
  {
    id: 12,
    type: "anxiety",
    gender: "male",
    ageGroup: "millennial",
    reportedDate: new Date("2023-08-20"),
    description: "Anxiety case",
    status: "resolved",
  },
  {
    id: 13,
    type: "self_harm",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2023-09-10"),
    description: "Self harm case",
    status: "resolved",
  },
  {
    id: 14,
    type: "suicide",
    gender: "male",
    ageGroup: "gen_x",
    reportedDate: new Date("2023-11-05"),
    description: "Suicide case",
    status: "resolved",
  },
  {
    id: 15,
    type: "anxiety",
    gender: "other",
    ageGroup: "boomer",
    reportedDate: new Date("2023-12-01"),
    description: "Anxiety case",
    status: "resolved",
  },

  // 2022 cases
  {
    id: 16,
    type: "anxiety",
    gender: "male",
    ageGroup: "boomer",
    reportedDate: new Date("2022-03-10"),
    description: "Anxiety case",
    status: "resolved",
  },
  {
    id: 17,
    type: "depression",
    gender: "female",
    ageGroup: "millennial",
    reportedDate: new Date("2022-07-22"),
    description: "Depression case",
    status: "resolved",
  },
  {
    id: 18,
    type: "self_harm",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2022-10-15"),
    description: "Self harm case",
    status: "resolved",
  },

  // 2021 cases
  {
    id: 19,
    type: "self_harm",
    gender: "female",
    ageGroup: "gen_z",
    reportedDate: new Date("2021-09-22"),
    description: "Self harm case",
    status: "resolved",
  },
  {
    id: 20,
    type: "depression",
    gender: "male",
    ageGroup: "millennial",
    reportedDate: new Date("2021-11-30"),
    description: "Depression case",
    status: "resolved",
  },

  // 2020 cases
  {
    id: 21,
    type: "depression",
    gender: "male",
    ageGroup: "millennial",
    reportedDate: new Date("2020-12-05"),
    description: "Depression case",
    status: "resolved",
  },
  {
    id: 22,
    type: "anxiety",
    gender: "female",
    ageGroup: "gen_x",
    reportedDate: new Date("2020-08-18"),
    description: "Anxiety case",
    status: "resolved",
  },
]

export const articles = [
  {
    id: 1,
    title: "Understanding Mental Health in the Digital Age",
    content:
      "Mental health awareness has become increasingly important in our digital world. With the rise of social media and constant connectivity, many people are experiencing new forms of anxiety and depression. This article explores the impact of technology on mental health and provides practical strategies for maintaining psychological well-being in the digital age. We discuss the importance of digital detox, setting boundaries with technology, and recognizing the signs of digital burnout. Additionally, we explore how technology can also be used as a tool for mental health support through apps, online therapy, and virtual support groups.",
    author: "Dr. Sarah Johnson",
    publishedAt: new Date("2024-11-15"),
    category: "mental_health",
    featured: true,
  },
  {
    id: 2,
    title: "Supporting Someone with Depression",
    content:
      "When someone you care about is struggling with depression, it can be challenging to know how to help. This comprehensive guide provides practical advice for friends and family members who want to support their loved ones through difficult times. We cover the importance of active listening, avoiding judgment, and encouraging professional help when needed. The article also discusses the signs to watch for, how to have difficult conversations about mental health, and ways to take care of yourself while supporting others. Remember that while your support is valuable, professional treatment is often necessary for recovery.",
    author: "Dr. Michael Chen",
    publishedAt: new Date("2024-10-22"),
    category: "support",
    featured: false,
  },
  {
    id: 3,
    title: "Anxiety Management Techniques for Students",
    content:
      "Student life can be overwhelming, with academic pressures, social challenges, and future uncertainties contributing to anxiety. This article provides evidence-based techniques specifically designed for students to manage anxiety effectively. We explore breathing exercises, time management strategies, study techniques that reduce stress, and the importance of maintaining a healthy work-life balance. The article also covers when to seek help from campus counseling services and how to build a support network among peers and faculty.",
    author: "Dr. Emily Rodriguez",
    publishedAt: new Date("2024-09-10"),
    category: "awareness",
    featured: true,
  },
  {
    id: 4,
    title: "The Science Behind Mental Health Recovery",
    content:
      "Recent research in neuroscience and psychology has provided new insights into how the brain heals from mental health conditions. This article examines the latest scientific findings about neuroplasticity, the role of therapy in rewiring neural pathways, and how lifestyle factors like exercise, nutrition, and sleep impact mental health recovery. We discuss various treatment modalities, from cognitive-behavioral therapy to newer approaches like EMDR and mindfulness-based interventions, explaining how each works at the neurological level.",
    author: "Dr. James Wilson",
    publishedAt: new Date("2024-08-05"),
    category: "research",
    featured: false,
  },
  {
    id: 5,
    title: "Building Resilience in Challenging Times",
    content:
      "Resilience is the ability to bounce back from adversity and adapt to challenging circumstances. This article explores the key components of psychological resilience and provides practical strategies for building mental strength. We discuss the importance of social connections, positive thinking patterns, problem-solving skills, and self-care practices. The article also covers how to help children and teenagers develop resilience, and how communities can foster collective resilience in the face of shared challenges.",
    author: "Dr. Lisa Thompson",
    publishedAt: new Date("2024-07-18"),
    category: "mental_health",
    featured: false,
  },
]

export const feedback = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    contactNo: "555-0123",
    message:
      "Thank you for providing such valuable mental health resources. The articles have been incredibly helpful for understanding anxiety management.",
    submittedAt: new Date("2024-12-10"),
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    contactNo: "",
    message:
      "The dashboard is very informative. It would be great to see more interactive features and perhaps a mobile app version.",
    submittedAt: new Date("2024-12-08"),
  },
  {
    id: 3,
    firstName: "Carol",
    lastName: "Williams",
    email: "carol@example.com",
    contactNo: "555-0456",
    message:
      "I appreciate the 24/7 crisis hotline information. It's reassuring to know help is always available. Could you add more local resource information?",
    submittedAt: new Date("2024-12-05"),
  },
]

// Helper functions to generate statistics
export const getDashboardStats = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayCases = mentalHealthCases.filter((case_) => {
    const caseDate = new Date(case_.reportedDate)
    caseDate.setHours(0, 0, 0, 0)
    return caseDate.getTime() === today.getTime()
  }).length

  const totalCases = mentalHealthCases.length

  const suicideCases = mentalHealthCases.filter(
    (case_) => case_.type === "suicide" || case_.type === "self_harm",
  ).length

  // Cases by gender
  const casesByGender = mentalHealthCases.reduce((acc, case_) => {
    const existing = acc.find((item) => item._id === case_.gender)
    if (existing) {
      existing.count++
    } else {
      acc.push({ _id: case_.gender, count: 1 })
    }
    return acc
  }, [])

  // Cases by type
  const casesByType = mentalHealthCases.reduce((acc, case_) => {
    const existing = acc.find((item) => item._id === case_.type)
    if (existing) {
      existing.count++
    } else {
      acc.push({ _id: case_.type, count: 1 })
    }
    return acc
  }, [])

  // Cases by age group
  const casesByAgeGroup = mentalHealthCases.reduce((acc, case_) => {
    const existing = acc.find((item) => item._id === case_.ageGroup)
    if (existing) {
      existing.count++
    } else {
      acc.push({ _id: case_.ageGroup, count: 1 })
    }
    return acc
  }, [])

  // Cases by year
  const casesByYear = mentalHealthCases
    .reduce((acc, case_) => {
      const year = new Date(case_.reportedDate).getFullYear()
      const existing = acc.find((item) => item._id === year)
      if (existing) {
        existing.count++
      } else {
        acc.push({ _id: year, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => a._id - b._id)

  return {
    todayCases,
    totalCases,
    suicideCases,
    casesByGender,
    casesByType,
    casesByAgeGroup,
    casesByYear,
  }
}

// Authentication helper
export const authenticateUser = (email, password) => {
  return users.find((user) => user.email === email && user.password === password)
}

// Create user helper
export const createUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData,
    createdAt: new Date(),
  }
  users.push(newUser)
  return newUser
}

// Add feedback helper
export const addFeedback = (feedbackData) => {
  const newFeedback = {
    id: feedback.length + 1,
    ...feedbackData,
    submittedAt: new Date(),
  }
  feedback.push(newFeedback)
  return newFeedback
}
