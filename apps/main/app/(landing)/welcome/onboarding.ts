export const onboarding = {
    questions: [
        {
            type: "input",
            question: "What's your name?",
            label: "Name"
        },
        {
            type: "avatar",
            question: "Select your avatar",
            choices: [
                "👤",
                "👩🏽‍🦱",
                "👨🏽‍🦱"
            ],
            label: "Avatar"
        },
        {
            type: "single_choice",
            question: "Which role describes you best?",
            choices: [
                "Founder",
                "Executive",
                "Investor",
                "Sales",
                "Marketing",
                "Customer Support",
                "Software Engineer",
                "Other",
            ],
            label: "Role"
        },
        {
            type: "single_choice",
            question: "What is the size of your company?",
            choices: [
                "Only me",
                "2-10 people",
                "11-100 people",
                "101-1000 people",
                "1000+ people",
            ],
            label: "CompanySize"
        }
    ]
}