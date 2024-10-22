import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
    userFirstname: string;
}

export const WelcomeEmail = ({
    userFirstname,
}: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>
            Welcome to Ascentio - Your new favorite task management application!
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src="https://your-domain.com/taskmaster-logo.png"
                    width="170"
                    height="50"
                    alt="TaskMaster"
                    style={logo}
                />
                <Text style={paragraph}>Hi {userFirstname},</Text>
                <Text style={paragraph}>
                    Welcome to TaskMaster, the task management platform that helps you
                    organize your work, collaborate with your team, and boost your productivity.
                </Text>
                <Text style={paragraph}>
                    With TaskMaster, you can:
                </Text>
                <ul style={list}>
                    <li>Create and manage tasks with ease</li>
                    <li>Collaborate with your team in real-time</li>
                    <li>Track project progress with intuitive dashboards</li>
                    <li>Set priorities and deadlines to stay on top of your work</li>
                </ul>
                <Section style={btnContainer}>
                    <Button style={button} href="https://taskmaster-app.com/get-started">
                        Get started
                    </Button>
                </Section>
                <Text style={paragraph}>
                    If you have any questions or need assistance, our support team is always here to help.
                </Text>
                <Text style={paragraph}>
                    Best regards,
                    <br />
                    The TaskMaster Team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    TaskMaster Inc., 123 Productivity Lane, Efficiency City, EC 12345
                </Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
};

const logo = {
    margin: "0 auto 24px",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#333",
};

const list = {
    ...paragraph,
    paddingLeft: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
    marginTop: "32px",
    marginBottom: "32px",
};

const button = {
    backgroundColor: "#7c3aed",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
};